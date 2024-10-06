import React from 'react'
import styles from "./Auth.module.css"
import {auth, provider} from "../fireBaseConfig/fireBaseConfig"
import {signInWithPopup} from "firebase/auth"
import Cookies from "universal-cookie"

const cookies = new Cookies();

interface AuthProps {
  setIsAuth: (isAuth: boolean) => void;
}


const Auth: React.FC<AuthProps> = (props) => {
  
  const {setIsAuth} = props;

  const signInWithGoogle = async () => { 
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className={styles.auth}>
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

export default Auth