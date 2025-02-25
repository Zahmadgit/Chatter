import { eventChannel } from 'redux-saga';
import { take, call, put, fork, takeLatest } from 'redux-saga/effects';
import { collection, query, orderBy, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebaseConfig';
import { setMessages, addMessage, setChatLoading, setChatError } from '../reducers/chatReducer';
import {Message} from '../../types/message'
import {FirestoreMessage} from '../../types/fireStoreMessage'
import { useEffect } from 'react';





function createChatChannel() {
 
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));

  return eventChannel<{ messages?: FirestoreMessage[]; error?: Error}>((emit) => {
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messages: FirestoreMessage[] = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() } as FirestoreMessage);
      });
      emit({ messages });
    }, (error) => {
      emit({ error });
    });
    return unsubscribe; 
    
  });
}

//needed to define as a generator to fix
function* watchChatMessages(): Generator {
  //error at yield 'yield' expression 
  // implicitly results in an 'any' type because its containing 
  // generator lacks a return-type annotation.
  const channel = yield call(createChatChannel);
  try {
    while (true) {
      //need to define messages before mapping
      const payload:{messages? : FirestoreMessage[]; error?: Error}= yield take(channel);
      if (payload.error) {
        yield put(setChatError(payload.error.message));
      } else if(payload.messages){
        // Convert Firestore timestamps to milliseconds
        const serializedMessages: Message[] = payload.messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp ? msg.timestamp.toMillis() : undefined, 
        }));
        yield put(setMessages(serializedMessages));
      }
    }
  } finally {
    channel.close();
  }
}

function* sendMessage(action: { type: string; payload: Omit<Message, 'id' | 'timestamp'>}) {
  try {
    const messagesRef = collection(firestore, 'messages');
    yield call(addDoc, messagesRef, {
      ...action.payload,
      timestamp: serverTimestamp(),
    });
  } catch (error: any) {
    yield put(setChatError(error.message));
  }
}

function* chatSaga() {
  yield fork(watchChatMessages);
  yield takeLatest('SEND_MESSAGE', sendMessage);
}

export default chatSaga;