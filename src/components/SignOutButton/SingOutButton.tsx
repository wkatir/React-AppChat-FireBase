interface SignOutButtonProps {
    onSignOut: () => void;
  }
  
  export const SignOutButton: React.FC<SignOutButtonProps> = ({ onSignOut }) => {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
        <button
          onClick={onSignOut}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full font-semibold hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-400 transform hover:-translate-y-1 hover:shadow-lg transition duration-300 ease-in-out text-sm sm:text-base"
        >
          Sign out
        </button>
      </div>
    );
  };