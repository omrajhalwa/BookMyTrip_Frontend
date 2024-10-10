import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  user: any
  , bookingTransaction: any,
  firebase : boolean
}

const initialState: CounterState = {
  user: {},
  bookingTransaction: {},
  firebase:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },

    setBookingTransaction: (state, action) => {
      state.bookingTransaction = action.payload
    },
    setFirebase : (state, action) => {
      state.firebase = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setBookingTransaction ,setFirebase} = userSlice.actions;

export default userSlice.reducer;