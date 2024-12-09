import { DateCalculator } from "@/components/date-calculator";
import { CalendarDays, Calculator } from "lucide-react";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
        CALCUDATE
        <Calculator className="mr-2 w-8 h-8" />
        <CalendarDays className="mr-2 w-8 h-8" />
      </h1>
      <DateCalculator />
    </main>
  );
}