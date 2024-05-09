import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import { 
  updateStart, 
  updateSuccess, 
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess
 } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  
  const handleImageChange = (e)=> {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
   /*  service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read;
          allow write: if
          request.resource.size < 2 * 1024 * 1024 &&
          request.resource.contentType.matches('image/.*')
        }
      }
    } */
   setImageFileUploading(true);
   setImageFileUploadError(null);
   const storage = getStorage(app);
   const fileName = new Date().getTime() + imageFile.name;
   const storageRef = ref(storage, fileName);
   const uploadTask = uploadBytesResumable(storageRef, imageFile);
   uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("could not upload image (File must be less than 2MB)");
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL }); // charger l'image dans la variable formData 
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if(Object.keys(formData).length === 0) {
      setUpdateUserError("No changes were made to the form...")
      return;
    }

    if(imageFileUploading) {
      setUpdateUserError("Please wait for the image to finish uploading...")
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  }

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      }else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST"
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center fond-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" accept="image/*" onChange={handleImageChange} hidden ref={filePickerRef} />
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={()=>filePickerRef.current.click()}
        >
          {
            imageFileUploadProgress && (
              <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} 
                strokeWidth={2}
                styles={{
                  root: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    strokeWidth: 4,
                  },
                  path: {
                    stroke: `#rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                    strokeWidth: 3,
                  },
                }}
              />
            )
          }
          <img src={imageFileUrl || currentUser.profilePicture} alt="user"
            className={`object-cover rounded-full w-full h-full border-4 border-[lightgray] 
            ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"}`} 
          />
        </div>
        {
          imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>
        }
        <TextInput 
          type="text" id="username" placeholder="Username" 
          defaultValue={currentUser.username} 
          onChange={handleChange}
        />
        <TextInput 
          type="email" id="email" placeholder="email" 
          defaultValue={currentUser.email} 
          onChange={handleChange}
        />
        <TextInput 
          type="password" id="password" placeholder="password" onChange={handleChange} 
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline
          disabled={loading || imageFileUploading} 
        >
          {
            loading || imageFileUploading ? "Chargement..." : "Modifier Profil"
          }
        </Button>
        {
          currentUser.isAdmin && (
            <Link to={"/create-post"}>
              <Button type="button" gradientDuoTone="purpleToPink" 
                className='w-full'
              >
                Créer un Post
              </Button>
            </Link>
          )
        }
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=> setShowModal(true)} className="cursor-pointer">Supprimer le compte</span>
        <span onClick={handleSignOut} className="cursor-pointer">Déconnexion</span>
      </div>
      {
        updateUserSuccess && (<Alert className='mt-5' color="success">{updateUserSuccess}</Alert>)
      }
      {
        updateUserError && (<Alert className='mt-5' color="failure">{updateUserError}</Alert>)
      }
      {
        error && (<Alert className='mt-5' color="failure">{error}</Alert>)
      }

      <Modal show={showModal} onClose={()=> setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle 
              className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' 
            />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Êtes-vous sûr de vouloir supprimer ce commentaire? Cette action sera définitive !
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Oui, je suis sure!
              </Button>
              <Button color="gray" onClick={()=> setShowModal(false)}>
                Non, annuler.
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}
