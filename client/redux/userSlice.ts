import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import storage from "@/app/(onboarding)/storage";


interface User {
    id:string;
    username:string;
    password:string;
    createdAt:string;
 
}
interface AuthState {
    isLoading: boolean ;
    token: string | null;
    user: User | null
}

const initialState : AuthState = {
    token: null,
    user: null,
    isLoading: false
}


// Thunk to load user from the expo secure store

export const loadUserFromStorage = createAsyncThunk(
  "user/loadUserFromStorage",
  async () => {
    const token = await storage.getToken();
    const userJson = await storage.getUser();
    let user = null;

    if (userJson) {
      try {
        user = JSON.parse(userJson);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }

    return { token, user };
  }
);


export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ token, user }: { token: string; user: User }) => {
    await storage.storeToken(token);
    await storage.storeUser(user);
    return { token, user };
  }
);



const userSlice= createSlice({
  name:"user",
  initialState,
  reducers: {

    loginSuccess:(state,action)=>{
        state.token= action.payload.token;
        state.user= action.payload.user;
    },
    logout: (state)=>{
        state.token = null,
        state.user= null;
        storage.removeToken();
    }

  },
  extraReducers: (builder)=>{
    builder.addCase(loginUser.pending,(state,action)=>{
        state.isLoading=true;
    })
    builder.addCase(loginUser.fulfilled, (state,action)=>{
        state.token= action.payload.token;
        state.user=action.payload.user
        state.isLoading=false;
    })
    builder.addCase(loginUser.rejected,(state)=>{
        state.isLoading=false
    })

      builder.addCase(loadUserFromStorage.pending,(state,action)=>{
        state.isLoading=true;
    })
    builder.addCase(loadUserFromStorage.fulfilled, (state,action)=>{
        state.token= action.payload.token;
        state.user=action.payload.user
        state.isLoading=false;
    })
    builder.addCase(loadUserFromStorage.rejected,(state)=>{
        state.isLoading=false
    })
  }
})


export default userSlice.reducer;


export const  {loginSuccess,logout} = userSlice.actions


