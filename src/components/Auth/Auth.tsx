import React from "react";
import { auth, provider } from "../fireBaseConfig/fireBaseConfig";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface AuthProps {
  setIsAuth: (isAuth: boolean) => void;
}

const Auth: React.FC<AuthProps> = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-800 via-violet-900 to-purple-800 p-4">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 transform hover:scale-105 transition duration-300">
        <p className="mb-8 sm:mb-8 text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 text-center">
          Sign In With Google
        </p>
        <button
          className="group w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-semibold text-white text-sm sm:text-base hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-1 transition duration-300 ease-in-out flex items-center justify-center space-x-3"
          onClick={signInWithGoogle}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
          </svg>
          <span className="group-hover:underline">Sign In With Google</span>
        </button>
      </div>
    </div>
  );
};

export default Auth;
