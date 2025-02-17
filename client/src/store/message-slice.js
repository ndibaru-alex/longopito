import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const backendDomain = 'https://longopito-api.onrender.com'

const initialState = {
    isLoading : false,
    messages : []
}

export const createMessage = createAsyncThunk('createMessage',async(formData)=>{
    const response = await axios.post(`${backendDomain}/api/addMessage`,formData)
    return response.data
})

export const fetchMessages = createAsyncThunk('fetchMessages',async()=>{
    const response = await axios.get(`${backendDomain}/api/messages`)
    return response.data
})

export const deleteMessage = createAsyncThunk('deleteMessage',async(id)=>{
    const response = await axios.delete(`${backendDomain}/api/deleteMessage/${id}`)
    return response.data
})

const messageSlice = createSlice({
    name : 'messageSlice',
    initialState,
    reducers : {},
    extraReducers : ((builder)=>{
     builder 
     .addCase(fetchMessages.pending, (state)=>{
        state.isLoading = true
     })
     .addCase(fetchMessages.fulfilled, (state,action)=>{
        state.isLoading = false,
        state.messages = action.payload.data
     })
     .addCase(fetchMessages.rejected, (state)=>{
        state.isLoading = false
        state.messages = []
     })
    })
})

export default messageSlice.reducer
