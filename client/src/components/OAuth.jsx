import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInFailure, signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate() 
    const handleGoogleClick = async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' }); // on force la question de sélection du compte Google à utiliser

      try {
        const resultsFromGoogle = await signInWithPopup(auth, provider);
        const rest = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
            googlePhotoUrl: resultsFromGoogle.user.photoURL, 
          }),
        });

        const data = await rest.json();
        if(data.success === false) {
          dispatch(signInFailure(data.message));
        }

        if(rest.ok) {
          dispatch(signInSuccess(data));
          navigate('/');
        }

      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    }

  return (
   <Button type="button" gradientDuoTone="pinkToOrange" outline 
        onClick={handleGoogleClick}
   >
        <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        Continuer avec Google
   </Button>
  )
}
