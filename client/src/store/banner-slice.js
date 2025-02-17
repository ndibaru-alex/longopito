import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState= {
    bannerList: [],
    isloading : false
}

const backendDomain = 'https://longopito-api.vercel.app'

export const createBanner = createAsyncThunk('createBanner',async(formData)=>{
    const response = await axios.post(`${backendDomain}/api/addBanner`,formData)
    return response.data
})

export const fetchBanners = createAsyncThunk('fetchBanners',async()=>{
    const response = await axios.get(`${backendDomain}/api/banners`)
    return response.data
})

export const deleteBanner = createAsyncThunk('delete', async(bannerId)=>{
    const response = await axios.delete(`${backendDomain}/api/deleteBanner/${bannerId}`)
    return response.data 
})

export const editBanner = createAsyncThunk('editBanner', async({id,formData})=>{
   const response = await axios.put(`${backendDomain}/api/updateBanner/${id}`,formData)
   return response.data
})

const bannerSlice = createSlice({
    name : 'bannerSlice',
    initialState,
    reducers : {},
    extraReducers : ((builder)=>{
    builder
    .addCase(fetchBanners.pending, (state)=>{
        state.isloading = true
      })
      .addCase(fetchBanners.fulfilled, (state,action)=>{
          state.isloading = false
          state.bannerList = action.payload.data
      })
      .addCase(fetchBanners.rejected, (state)=>{
          state.isloading = false
          state.bannerList = []
      })

    })
})

export default bannerSlice.reducer
