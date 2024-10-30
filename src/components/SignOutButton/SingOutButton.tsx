import React from "react";
import { LogOut } from "lucide-react";

interface SignOutButtonProps {
  onSignOut: () => void;
}

export const SignOutButton: React.FC<SignOutButtonProps> = ({ onSignOut }) => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
      <button
        onClick={onSignOut}
        className="group relative overflow-hidden rounded-full p-px focus:outline-none"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-blue-500 to-purple-600" />
        <span className="inline-flex h-full w-full cursor-pointer items-center rounded-full bg-gray-900 px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium backdrop-blur-3xl transition-all duration-300 group-hover:bg-opacity-80">
          <span className="relative text-gray-100 flex items-center gap-2 font-semibold">
            Salir
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </span>
      </button>
    </div>
  );
};

export default SignOutButton;
