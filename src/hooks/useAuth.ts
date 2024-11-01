import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/fireBaseConfig";
import Cookies from "universal-cookie";
import { AuthState } from "../interfaces/auth/auth";

const cookies = new Cookies();

export const useAuth = (): AuthState => {
  const [isAuth, setIsAuth] = useState<boolean>(
    cookies.get("auth-token") ? true : false
  );
  const [room, setRoom] = useState<string | null>(null);
  const [roomInput, setRoomInput] = useState<string>("");

  const signUserOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleEnterRoom = (): void => {
    if (roomInput.trim()) {
      setRoom(roomInput);
    }
  };

  return {
    isAuth,
    setIsAuth,
    room,
    setRoom,
    roomInput,
    setRoomInput,
    handleEnterRoom,
    signUserOut,
  };
};
