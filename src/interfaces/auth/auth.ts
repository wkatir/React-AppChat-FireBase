export interface AuthState {
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
    room: string | null;
    setRoom: (value: string | null) => void;
    roomInput: string;
    setRoomInput: (value: string) => void;
    handleEnterRoom: () => void;
    signUserOut: () => Promise<void>;
  }