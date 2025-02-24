import { takeLatest, put, call, fork, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { auth } from '../../../firebase/firebaseConfig';
import { setUser, setLoading, setError } from '../reducers/authReducer';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { Alert } from 'react-native';

function* handleLogin(action) {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    const { email, password } = action.payload;
    const userCredential = yield call(signInWithEmailAndPassword, auth, email, password);
    
    // Extract only serializable data
    const user = userCredential.user;
    const serializedUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };

    yield put(setUser(serializedUser));
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleSignup(action) {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    const { email, password } = action.payload;
    const userCredential = yield call(createUserWithEmailAndPassword, auth, email, password);
    
    // Extract only serializable data
    const user = userCredential.user;
    const serializedUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };

    yield put(setUser(serializedUser));
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}


// Auth state listener
function createAuthChannel() {
  return eventChannel((emit) => {
    return onAuthStateChanged(auth, (user) => {
      emit({ user });
    });
  });
}

function* watchAuthState() {
  const channel = yield call(createAuthChannel);
  try {
    while (true) {
      const { user } = yield take(channel);
      if (user) {
        const serializedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        yield put(setUser(serializedUser));
      } else {
        yield put(setUser(null));
      }
    }
  } finally {
    channel.close();
  }
}

// Logout saga
function* handleLogout() {
  try {
    yield put(setLoading(true));
    yield call(signOut, auth);
    yield put(setUser(null));
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}


//we frogot bruh
function* handleForgotPassword(action){
  try{
    yield put(setLoading(true));
    yield put(setError(null));

    const {email} = action.payload;
    yield call(sendPasswordResetEmail, auth, email);
    Alert.alert("Success", "A password reset link was sent to the registered email, go reset it :D")
  } catch (error){
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false))
  }
}

function* authSaga() {
  yield takeLatest('LOGIN_REQUEST', handleLogin);
  yield takeLatest('SIGNUP_REQUEST', handleSignup);
  yield takeLatest('LOGOUT_REQUEST', handleLogout);
  yield takeLatest('FORGOT_PASSWORD_REQUEST', handleForgotPassword)
  yield fork(watchAuthState);
}

export default authSaga;