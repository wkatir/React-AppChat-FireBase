import { Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  text: string;
  createdAt: Timestamp;
  user: string;
  room: string;
}
