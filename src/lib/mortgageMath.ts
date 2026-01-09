import { type MortgageData } from "@/components/Form.tsx";

export const calculateMortgage = (data: MortgageData) => {
  const { amount, rate, term, type } = data;

  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = term * 12;

  if (type === "Interest Only") {
    const monthlyRaw = Number((amount * monthlyRate).toFixed(2));
    const monthly = Number(monthlyRaw.toFixed(2)).toLocaleString();
    const total = Number(
      (monthlyRaw * numberOfPayments).toFixed(2),
    ).toLocaleString();

    return { monthly, total };
  }

  const power = Math.pow(1 + monthlyRate, numberOfPayments);
  const monthlyRaw = (amount * (monthlyRate * power)) / (power - 1);

  const monthly = Number(monthlyRaw.toFixed(2)).toLocaleString();
  const total = Number(
    (monthlyRaw * numberOfPayments).toFixed(2),
  ).toLocaleString();

  return { monthly, total };
};
