import { takeLatest, put, call, fork, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { auth } from '../../../firebase/firebaseConfig';
import { setUser, setLoading, setError } from '../reducers/authReducer';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

// Login saga
function* handleLogin(action) {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    const { email, password } = action.payload;
    const userCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    );
    yield put(setUser(userCredential.user));
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

// Signup saga
function* handleSignup(action) {
  try {
    yield put(setLoading(true));
    yield put(setError(null));
    const { email, password } = action.payload;
    const userCredential = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password
    );
    yield put(setUser(userCredential.user));
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
      yield put(setUser(user));
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

function* authSaga() {
  yield takeLatest('LOGIN_REQUEST', handleLogin);
  yield takeLatest('SIGNUP_REQUEST', handleSignup);
  yield takeLatest('LOGOUT_REQUEST', handleLogout);
  yield fork(watchAuthState);
}

export default authSaga;