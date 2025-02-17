import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState= {
    isLoading : false,
    details : null
}

const backendDomain = 'https://longopito-api.vercel.app'

export const makeStkPush = createAsyncThunk('stk-push',async(formData)=>{
    const response = await axios.post(`${backendDomain}/api/stk-push`,formData)    
    return response.data
})

export const stkCallback = createAsyncThunk('stk-callBack', async({merchantRequestId})=>{
    const response = await axios.post(`${backendDomain}/api/mpesa-callback92dhvd`,{merchantRequestId})
    return response.data
})

const donationSlice = createSlice({
   name : 'danatonSlice',
   initialState,
   reducers : {},
   extraReducers : ((builder)=>{
    builder
    .addCase(makeStkPush.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeStkPush.fulfilled, (state, action) => {
        state.isLoading = false;
        state.details = action.payload;
      })
      .addCase(makeStkPush.rejected, (state) => {
        state.isLoading = false;
      })
    .addCase(stkCallback.pending,(state)=>{
        state.isLoading = true
    })
    .addCase(stkCallback.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.details = action.payload.transaction
    })
    .addCase(stkCallback.rejected, (state)=>{
        state.isLoading = false,
        state.details = null
    })
    
   })
})

export default donationSlice.reducer
