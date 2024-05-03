"use client";
import { AppDispatch } from "@/store/store";
import { randomNumberGenerator } from "@/store/thunks/numberThunk";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BetSection = () => {
  const [betAmount, setBetAmount] = useState(0);
  const [targetMultiplier, setTargetMultiplier] = useState(0);
  const profit = useSelector((state: any) => state.number.profit);
  const hasWon = useSelector((state: any) => state.number.hasWon);
  const winChance = useSelector((state: any) => state.number.winChance);

  const dispatch = useDispatch<AppDispatch>();

  const bet = () => {
    dispatch(
      randomNumberGenerator({ bet: betAmount, target: targetMultiplier })
    ).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {}, [bet]);

  return (
    <div className="bg-[#FFFFFF0A] w-full gap-3 rounded-2xl flex flex-col items-center p-3">
      <div className="flex gap-3 justify-between w-full">
        <Input
          color="primary"
          labelPlacement="outside"
          className="w-[100%]"
          onChange={(e) => setBetAmount(parseInt(e.target.value))}
          classNames={{
            label: "text-white/90 font-semibold",
          }}
          type="number"
          placeholder="Enter amount"
          label="Bet Amount"
        />
        <Input
          color="primary"
          isReadOnly
          value={hasWon ? profit : 0}
          labelPlacement="outside"
          className="w-[100%]"
          classNames={{
            label: "text-white/90 font-semibold",
          }}
          type="number"
          placeholder="0.000000000"
          label="Profit on win"
        />
      </div>
      <Input
        color="primary"
        labelPlacement="outside"
        onChange={(e) => setTargetMultiplier(parseInt(e.target.value))}
        className="w-[100%]"
        classNames={{
          label: "text-white/90 font-semibold",
        }}
        type="number"
        placeholder="0.000000000"
        label="Target Multiplier"
      />
      <Input
        color="primary"
        labelPlacement="outside"
        isReadOnly
        value={winChance ? winChance : null}
        className="w-[100%]"
        classNames={{
          label: "text-white/90 font-semibold",
        }}
        type="number"
        placeholder="0.000000000"
        label="Win chance"
      />

      <Button
        // isDisabled={targetMultiplier === 0}
        color="primary"
        onPress={bet}
        className="w-full font-semibold p-0"
      >
        Bet
      </Button>
    </div>
  );
};

export default BetSection;
