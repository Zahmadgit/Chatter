import { DocumentData } from "firebase/firestore";

export interface FirestoreMessage extends DocumentData{
    id: string;
    text: string;
    userId: string;
    userEmail: string;
    timestamp?: { toMillis: () => number };
}