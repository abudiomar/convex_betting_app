"use client";
import { Button, Tooltip } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animate, motion } from "framer-motion";
import { RecordModel } from "@/models/feed.model";
import { AppDispatch } from "@/store/store";
import { resetGame } from "@/store/reducers/numberReducer";
import { IoMdRefresh } from "react-icons/io";

const GamePlay = () => {
  const randomNumber = useSelector((state: any) => state.number.randomNumber);
  const hasWon = useSelector((state: any) => state.number.hasWon);
  const history = useSelector((state: any) => state.number.history);
  const nodeRef: any = useRef();
  const dispatch = useDispatch<AppDispatch>();

  const refresh = () => {
    dispatch(resetGame());
  };

  useEffect(() => {
    const node: any = nodeRef.current;

    const controls = animate(0, randomNumber, {
      duration: 1,
      onUpdate(value) {
        node.textContent = value.toFixed(2) + "x";
      },
    });

    return () => controls.stop();
  }, [randomNumber]);

  return (
    <div className="bg-[#FFFFFF0A] w-ful h-[200px] sm:h-[250px] rounded-md relative">
      <p className="flex absolute top-1 left-1 gap-2">
        <Tooltip content={<p className="text-base">Reset Game</p>}>
          <Button
            isIconOnly
            className="bg-transparent"
            onPress={refresh}
            startContent={
              <span className="text-primary text-base sm:text-2xl">
                {<IoMdRefresh />}
              </span>
            }
          ></Button>
        </Tooltip>
      </p>
      <p className="flex absolute top-1 right-1 gap-1 sm:gap-2">
        {history.slice(-5).map((record: RecordModel, index: number) => (
          <motion.div key={index} layout className="text-xs sm:text-base">
            <p
              className={`${
                record.hasWon ? "text-[#007EC5]" : "text-[#FF165C]"
              } font-semibold bg-[#007EC529] rounded-full px-4`}
            >
              {record.randomNumber}x
            </p>
          </motion.div>
        ))}
      </p>
      <div className="flex justify-center items-center h-full">
        <p
          ref={nodeRef}
          className={`font-semibold text-2xl ${
            hasWon ? "text-[#007EC5]" : "text-[#FF165C]"
          }`}
        ></p>
      </div>
    </div>
  );
};

export default GamePlay;
