import { AnimatePresence, motion } from "motion/react";
import type { MortgageResult } from "@/hooks/useMortgage.ts";

interface ResultsProps {
  result: MortgageResult | null;
}

export default function Results({ result }: ResultsProps) {
  return (
    <div className="h-full bg-slate-800 lg:rounded-bl-[50px] overflow-hidden">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center items-center text-center px-4 py-6 gap-2 max-w-sm mx-auto h-full"
          >
            <img src="/illustration-empty.svg" alt="" />
            <h3 className="text-white font-bold text-2xl">
              Results shown here
            </h3>
            <span className="text-slate-400">
              Complete the form and click "calculate repayments" to see what
              your monthly repayments would be.
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 px-4 py-6 gap-6 lg:py-6 lg:px-8 h-full"
          >
            <header className="flex flex-col gap-4">
              <h3 className="text-white font-bold text-2xl">Your results</h3>
              <p className="text-slate-400">
                Your results are shown based on the information you provided. To
                adjust the result, edit the form and click "calculate
                repayments" again.
              </p>
            </header>

            <div className="border-t-4 border-lime rounded-lg lg:rounded-bl-4xl bg-black/20 p-6 lg:p-8">
              <div className="flex flex-col gap-6 divide-y divide-slate-700/50">
                <div className="flex flex-col gap-2 pb-6">
                  <span className="text-slate-400 ">
                    Your monthly repayments
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl lg:text-6xl text-lime font-bold"
                  >
                    ₤{result.monthly.toLocaleString()}
                  </motion.span>
                </div>

                <div className="flex flex-col gap-2 pt-6">
                  <span className="text-slate-400">
                    Total you'll repay over the term
                  </span>
                  <span className="text-white font-bold text-2xl">
                    ₤{result.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
