"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { RecordModel } from "@/models/feed.model";

const HistorySection = () => {
  const history = useSelector((state: any) => state.number.history);
  useEffect(() => {}, [history]);

  return (
    <div className="w-full sm:border border-[#007EC5]/50 rounded-2xl flex flex-col items-center p-3">
      <p className="font-semibold">Recent History</p>
      <div className="w-full flex flex-col gap-1">
        <AnimatePresence>
          {history
            .slice(-5)
            .reverse()
            .map((record: RecordModel, index: number) => (
              <motion.div
                key={index}
                animate={{ y: 5, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between font-semibold items-center text-xs text-[#FFFFFF] bg-[#FFFFFF14] p-2 rounded-2xl"
              >
                <div className="flex gap-1 sm:gap-5 text-gray-400 italic">
                  <div className="flex flex-col items-center justify-center">
                    <p>Bet Amount</p>
                    <p className="text-white text-md">ETB{record.bet}</p>
                  </div>

                  {record.hasWon && (
                    <>
                      <div>.</div>
                      <div className="flex flex-col items-center">
                        <p>Won Amount</p>
                        <p className="text-white text-md">ETB{record.profit}</p>
                      </div>
                    </>
                  )}
                  <div>.</div>

                  <div className="flex flex-col items-center">
                    <p>Target Multiplier</p>
                    <p className="text-white text-md">
                      ETB{record.targetMultiplier}
                    </p>
                  </div>
                </div>
                <div>
                  <p
                    className={`font-bold italic text-lg ${
                      record.hasWon ? "text-[#007EC5]" : "text-[#FF165C]"
                    }`}
                  >
                    {record.hasWon ? "WIN" : "LOSE"}
                  </p>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HistorySection;
