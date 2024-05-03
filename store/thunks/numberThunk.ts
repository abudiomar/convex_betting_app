import { createAsyncThunk } from "@reduxjs/toolkit";



export const randomNumberGenerator = createAsyncThunk(
  'user/randomNumberGenerator',
  async ({ bet, target }:any) => {
    console.log(target,bet)
    const randomNumber = parseFloat((Math.random() * (100 - 1)).toFixed(2));
    
    const threshold = bet * target;
     const winningRange = 100 - threshold + 1; 
    
    const winChance = (winningRange / 100) * 100;
    
    const hasWon = randomNumber >= threshold;
    const profit = bet * target
    const history = {profit, hasWon,  bet,
  target,randomNumber}

    return { randomNumber, hasWon,profit, history ,winChance};
  }
);