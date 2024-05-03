import { createSlice } from "@reduxjs/toolkit";
import { Status } from "@/models/status.enum";
import { randomNumberGenerator } from "../thunks/numberThunk";
import { RecordModel } from "@/models/feed.model";



interface UserType {

  randomNumber: number ;
  hasWon:boolean
  profit:number
  winChance:number
  history: RecordModel[];
  status: Status;
  error: null | string | any;


}
const initialState: UserType = {
randomNumber: 0,
hasWon:false,
  winChance:0,

history:[],
status: Status.IDLE, 
profit:0,
error: null

};

export const numberSlice = createSlice({
  name: "number",
  initialState,
  reducers: {
    resetGame: (state) => {
            Object.assign(state, initialState);
            state.status = Status.SUCCEEDED

    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(randomNumberGenerator.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(randomNumberGenerator.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        state.randomNumber = action.payload.randomNumber
        state.hasWon = action.payload.hasWon; 
        state.profit = action.payload.profit
        state.winChance = action.payload.winChance
        state.history.push({
          randomNumber: action.payload.history.randomNumber, hasWon: action.payload.hasWon,
          bet: action.payload.history.bet,
          targetMultiplier: action.payload.history.target,
          profit: action.payload.history.profit
        });
      })
      .addCase(randomNumberGenerator.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
  },
});
export const { resetGame } = numberSlice.actions;

export default numberSlice.reducer;
