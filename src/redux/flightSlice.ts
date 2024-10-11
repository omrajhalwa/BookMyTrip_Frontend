import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  curFlightDetails: Array<any>,
  selectedFlight: number,
  Airports:Array<any>
  noOfSeats: number
  

}

const initialState: CounterState = {
  curFlightDetails: [],
  selectedFlight: 0,
  Airports:[],
  noOfSeats:1
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
    },
    setNoOfSeats: (state, action) => {
      state.noOfSeats = action.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { setFlightDetails, setSelectedFlight,setAirports ,setNoOfSeats} = flightSlice.actions;

export default flightSlice.reducer;