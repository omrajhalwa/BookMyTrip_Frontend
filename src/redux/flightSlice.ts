import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  curFlightDetails: Array<any>,
  selectedFlight: Number,
  Airports:Array<any>

}

const initialState: CounterState = {
  curFlightDetails: [],
  selectedFlight: 0,
  Airports:[]
}

export const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setFlightDetails: (state, action) => {
      state.curFlightDetails = action.payload;
    },
    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    setAirports: (state, action) => {
      state.Airports = action.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { setFlightDetails, setSelectedFlight,setAirports } = flightSlice.actions;

export default flightSlice.reducer;