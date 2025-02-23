//Action is a type defined inside of redux
import { Action } from 'redux';
import { takeLatest, put, call, fork, take, all } from 'redux-saga/effects';
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

/*😍😍😍
  by using the action type from redux and extending it with custom payloads,
  typescript can correctly infer the shape of the action parameter in the sage
*/
// Defining the shape of the action payloads
interface LoginAction extends Action {
  payload: {
    email: string;
    password: string;
  };
}

interface SignupAction extends Action {
  payload: {
    email: string;
    password: string;
  };
}

interface ForgotPasswordAction extends Action {
  payload: {
    email: string;
  };
}


function* handleLogin(action:LoginAction): Generator<any, void, any> {
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
  } catch (error: any) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* handleSignup(action: SignupAction): Generator<any, void, any> {
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
  } catch (error: any) {
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

function* watchAuthState(): Generator<any, void, any> {
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
  } catch (error:any) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}


//we frogot bruh
function* handleForgotPassword(action:ForgotPasswordAction): Generator<any, void, any>{
  try{
    yield put(setLoading(true));
    yield put(setError(null));

    const {email} = action.payload;
    yield call(sendPasswordResetEmail, auth, email);
    Alert.alert("Success", "A password reset link was sent to the registered email, go reset it :D")
  } catch (error:any){
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false))
  }
}




 // Define action types as string literals
 const LOGIN_REQUEST = 'LOGIN_REQUEST';
 const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
 const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
 const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
 

 //😍takeLatest function is correctly typed to accetpt actions with a payload property😍
 export function* authSaga(): Generator {
   yield all([
     takeLatest<LoginAction>(LOGIN_REQUEST, handleLogin),
     takeLatest<SignupAction>(SIGNUP_REQUEST, handleSignup),
     takeLatest(LOGOUT_REQUEST, handleLogout),
     takeLatest<ForgotPasswordAction>(FORGOT_PASSWORD_REQUEST, handleForgotPassword),
     fork(watchAuthState),
   ]);
 }

export default authSaga;