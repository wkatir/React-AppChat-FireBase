import React, { useState, useRef } from "react";
import Auth from "./components/Auth/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat/Chat";
const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(cookies.get("auth-token") ? true : false);
  const [room, setRoom] = useState<string | null>(null);
  const roomInputRef = useRef<HTMLInputElement | null>(null);

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth}></Auth>
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <Chat room={room}></Chat>
      ) : (
        <div className="room">
          <label>Enter Room Name: </label> <input ref={roomInputRef} />{" "}
          <button onClick={() => setRoom(roomInputRef.current!.value)}>
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
