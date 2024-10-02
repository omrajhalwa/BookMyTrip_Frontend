import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  curFlightDetails: Array<any>
}

const initialState: CounterState = {
  curFlightDetails: []
}

export const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setFlightDetails:(state , action) => {
        state.curFlightDetails = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFlightDetails } = flightSlice.actions;

export default flightSlice.reducer;