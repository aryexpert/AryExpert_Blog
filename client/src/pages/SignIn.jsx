import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInSuccess, signInStart } from "../redux/user/userSlice";
import { OAuth } from "../components";

export default function SignIn() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); 
    // la methode trim() permet de supprimer les espaces inutiles au début et à la 
    // fin de la chaine de caractères lors de la saisie dans le formulaire  
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // evite un rafraichissement de la page qui fera perdre les données du formulaire 

    if(!formData.email || !formData.password) {
      // return  setErrorMessage("Please fill in all the fields!");
      return dispatch(signInFailure("Please fill in all the fields!")); // redux à la place
    }

    try {
      // setLoading(true); // on désactive le bouton pendant le chargement
      // setErrorMessage(null); // on efface le message d'erreur
      dispatch(signInStart()); // on utilise redux à la place de setLoading(true) et setErrorMessage(null)

      // res est la promesse retournée par fetch pour savoir si la requête va bien se passer ou non
      // on va se servir d'un proxy pour éviter de mettre des URL complètes
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // on transforme l'objet JSON(formData) en une chaine JSON
      });
      const data = await res.json(); // on récupère les données de la promesse res sous forme de JSON
      if(data.success === false) {
        // setErrorMessage(data.message); // erreur liée au user
        dispatch(signInFailure(data.message)); // redux à la place de setErrorMessage(data.message)
      }
      // setLoading(false); // le bouton est d'ja désactivé dans le signInFailure
      if(res.ok) {
        dispatch(signInSuccess(data)); // redux à la place de setLoading(false) et setErrorMessage(null)
        navigate("/"); // on redirige l'utilisateur vers la page de connexion
      }
    } catch (error) {
    //  setErrorMessage(error.message); // erreur liée au serveur
    //  setLoading(false);
      dispatch(signInFailure(error.message)); // redux à la place de setErrorMessage(error.message) et setLoading(false)
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">

        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500
                      via-purple-500 to-pink-500 rounded-lg text-white"
            >
              AryExpert
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Vous pouvez vous connecter avec votre email et
            mot de passe ou avec votre compte Google.
          </p>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="">
              <Label value="your email" />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>
            <div className="">
              <Label value="your password" />
              <TextInput type="password" placeholder="*************" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Lecture...</span>
                  </>
                )
                 : "Connexion"
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
              <span>Vous n'avez pas de compte ?</span>
              <Link to="/sign-up" className="text-blue-500">
                S'inscrire
              </Link>
        </div>
        {
          errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )
        }
      </div>
    </div>
  </div>
  );
}
