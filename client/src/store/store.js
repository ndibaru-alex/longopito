import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './auth-slice'
import BannerSlice from './banner-slice'
import DonatioSlice from './skt-slice'
import TeamSlice from './team-slice'
import MessageSlice from './message-slice'

const store = configureStore({
   reducer : {
    auth : AuthSlice,
    bannerSlice: BannerSlice,
    donationSlice : DonatioSlice,
    teamSlice : TeamSlice,
    messageSlice : MessageSlice
   }
})

export default store