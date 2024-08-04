import { signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { addUserData, removeUserData } from '../redux/authSlice'
import { toggleLogin } from '../redux/toggleSlice'

function SignInBtn() {

    const userData = useSelector((state) => state.authSlice.userData )

    const dispatch = useDispatch()
    async function handleAuth(){
        let data = await signInWithPopup(auth, provider)
        const userData = {
            name : data.user.displayName,
            photo : data.user.photoURL
        }
        dispatch(addUserData(userData))
        dispatch(toggleLogin())
    }

    async function handleLogout(){
        await signOut(auth)
        dispatch(removeUserData())
        dispatch(toggleLogin())
    }

  return (
    <div>
      {
        userData ?
        <button onClick={handleLogout} className="ml-1 bg-orange-500 w-full p-3 text-white font-semibold mt-5 ">Logout</button> 
        : 
        <button onClick={handleAuth} className="ml-1 bg-orange-500 w-full p-3 text-white font-semibold mt-5 ">Login with Google</button>
      }
    </div>
  )
}

export default SignInBtn
