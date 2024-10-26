import Auth from "./components/Auth/Auth";
import Chat from "./components/Chat/Chat";
import { ChatContainer } from "./components/ChatContainer/ChatContainer";
import { RoomEntry } from "./components/RoomEntry/RoomEntry";
import { SignOutButton } from "./components/SignOutButton/SingOutButton";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const {
    isAuth,
    setIsAuth,
    room,
    roomInput,
    setRoomInput,
    handleEnterRoom,
    signUserOut,
  } = useAuth();

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      <ChatContainer>
        {room ? (
          <Chat room={room} />
        ) : (
          <RoomEntry
            roomInput={roomInput}
            setRoomInput={setRoomInput}
            handleEnterRoom={handleEnterRoom}
          />
        )}
      </ChatContainer>
      <SignOutButton onSignOut={signUserOut} />
    </>
  );
};

export default App;
