import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  curFlightDetails: Array<any>,
  selectedFlight : Number
}

const initialState: CounterState = {
  curFlightDetails: [],
  selectedFlight : 0
}

export const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setFlightDetails:(state , action) => {
        state.curFlightDetails = action.payload
    },
    setSelectedFlight:(state , action) => {
      state.selectedFlight = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFlightDetails , setSelectedFlight} = flightSlice.actions;

export default flightSlice.reducer;