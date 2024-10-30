import React from "react";
import { auth, provider } from "../../utils/fireBaseConfig";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { AuthProps } from "../../interfaces/auth/authprops";
import { Sparkles } from "lucide-react";

const cookies = new Cookies();

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6">
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>

        <div className="relative px-6 py-8 sm:px-8 bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700">
          <div className="flex items-center justify-center space-x-2 mb-8 px-2">
            <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 pb-1">
              Kodigo Chat
            </h1>
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>

          <div className="w-full sm:max-w-md mx-auto">
            <button
              onClick={signInWithGoogle}
              className="group relative w-full overflow-hidden rounded-lg p-px mt-8 focus:outline-none"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-blue-500 to-purple-600" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-base font-medium backdrop-blur-3xl transition-all duration-300 group-hover:bg-opacity-80">
                <span className="relative text-gray-100 flex items-center gap-3 font-semibold">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                  </svg>
                  Iniciar sesión con Google
                </span>
              </span>
            </button>
          </div>

          <div className="absolute top-20 left-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
