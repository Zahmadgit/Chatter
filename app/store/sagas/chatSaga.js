import { eventChannel } from 'redux-saga';
import { take, call, put, fork, takeLatest } from 'redux-saga/effects';
import { collection, query, orderBy, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebaseConfig';
import { setMessages, addMessage, setChatLoading, setChatError } from '../reducers/chatReducer';

function createChatChannel() {
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));

  return eventChannel((emit) => {
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      emit({ messages });
    }, (error) => {
      emit({ error });
    });

    return unsubscribe;
  });
}


function* watchChatMessages() {
  const channel = yield call(createChatChannel);
  try {
    while (true) {
      const { messages, error } = yield take(channel);
      if (error) {
        yield put(setChatError(error.message));
      } else {
        yield put(setMessages(messages));
      }
    }
  } finally {
    channel.close();
  }
}

function* sendMessage({ payload }) {
  try {
    const messagesRef = collection(firestore, 'messages');
    yield call(addDoc, messagesRef, {
      ...payload,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    yield put(setChatError(error.message));
  }
}

function* chatSaga() {
  yield fork(watchChatMessages);
  yield takeLatest('SEND_MESSAGE', sendMessage);
}

export default chatSaga;