//PayloadAction is an action type alias
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//auth is for defining the user type
interface User{
  uid: string;
  email: string | null;
  displayName: string | null;
}


interface AuthState{
  user: User | null;
  loading: boolean;
  error: string| null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null> ) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => { 
      state.error = null;
    }
  },
});

export const { setUser, setLoading, setError, clearError } = authSlice.actions;
export default authSlice.reducer;