import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const backendDomain = 'http://localhost:8000'

const initialState = {
    isLoading : false,
    teams : []  
}

export const addTeam = createAsyncThunk('addTeam',async(formData)=>{
    const response = await axios.post(`${backendDomain}/api/addTeam`,formData)
    return response.data
})

export const fetchTeams = createAsyncThunk('fetchTeams',async()=>{
    const response = await axios.get(`${backendDomain}/api/teams`)
    return response.data
})

export const updateTeam = createAsyncThunk('updateTeam',async({id,formData})=>{
    const response = await axios.put(`${backendDomain}/api/updateTeam/${id}`,formData)
    return response.data
})

export const deleteTeam = createAsyncThunk('deleteTeam',async(teamId)=>{
    const response = await axios.delete(`${backendDomain}/api/deleteTeam/${teamId}`)
    return response.data
})

const teamSlice = createSlice({
    name : 'teamSlice',
    initialState,
    reducers : {},
    extraReducers :((builder)=>{
        builder
        .addCase(fetchTeams.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchTeams.fulfilled, (state,action)=>{
            state.isLoading = false,
            state.teams = action.payload.data
        })
    })
})

export default teamSlice.reducer