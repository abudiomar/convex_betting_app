import BetSection from "@/components/BetSection";
import GamePlay from "@/components/GamePlay";
import HistorySection from "@/components/HistorySection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-1 ">
      <div className="sm:p-3 w-full h-full">
        <GamePlay />
      </div>
      <div className="flex gap-1 sm:gap-2 sm:flex-row flex-col flex-1 w-full p-2">
        <BetSection />
        <HistorySection />
      </div>
    </main>
  );
}
