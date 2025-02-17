import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    isAuthenticated : false,
    isLoading : false,
    user : null    
}

const backendDomain = 'https://longopito-api.vercel.app'

export const registerUser =  createAsyncThunk('register', async(formData)=>{
   const response = await axios.post(`${backendDomain}/api/register`,formData,{withCredentials : true})
    return response.data 
}) 

export const logInUser = createAsyncThunk('loginUser',
    async (formData)=>{
      const response = await axios.post(`${backendDomain}/api/login`,formData,{withCredentials : true})
  
      return response.data
    }
  
  )

  export const checkAuth = createAsyncThunk('checkAuth',
    async()=>{
     const response = await axios.get(`${backendDomain}/api/check-auth`,
      {withCredentials : true,
       headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    )
    return response.data 
    })  

    export const logOut = createAsyncThunk('logout',async()=>{
        const response = await axios.post(`${backendDomain}/api/logout`,{},{withCredentials:true})
        return response.data
    })

const authSlice = createSlice({
    name : "auth-slice",
    initialState,
    reducers : {
        setUser : () =>{}
    },
    extraReducers : (builder)=>{
    builder
    .addCase(registerUser.pending,(state)=>{
        state.isLoading = true
    })
    .addCase(registerUser.fulfilled, (state)=>{
        state.isLoading = false,
        state.user = null,
        state.isAuthenticated = false;
    })
    .addCase(registerUser.rejected, (state)=>{
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;   
    })
    .addCase(logInUser.pending, (state)=>{
        state.isLoading = true;   
    })
    .addCase(logInUser.fulfilled, (state,action)=>{
       
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null
        state.isAuthenticated = action.payload.success  
    })
    .addCase(logInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logOut.fulfilled,(state)=>{
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
    }
})

export const {setUser} = authSlice.actions
export default authSlice.reducer
