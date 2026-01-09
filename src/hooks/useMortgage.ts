import { useState } from "react";
import { calculateMortgage } from "@/lib/mortgageMath";
import type { MortgageData } from "@/components/Form.tsx";

export type MortgageResult = {
  monthly: string;
  total: string;
};

export function useMortgage() {
  const [result, setResult] = useState<MortgageResult | null>(null);

  const performCalculation = (data: MortgageData) => {
    const calculations = calculateMortgage(data);
    setResult(calculations);
  };

  const clearAll = () => {
    setResult(null);
  };

  return { result, performCalculation, clearAll };
}
