import FormInput from "@/components/Form.tsx";
import Results from "@/components/Results.tsx";
import { useMortgage } from "@/hooks/useMortgage.ts";

export default function App() {
  const { result, performCalculation, clearAll } = useMortgage();

  const handleReset = () => {
    clearAll();
  };
  return (
    <main
      className={
        "w-full flex flex-col lg:justify-center lg:items-center min-h-screen bg-slate-300"
      }
    >
      <section
        className={
          "w-full grid grid-cols-1 lg:gap-3 lg:grid-cols-2 lg:rounded-xl bg-white max-w-[1000px]"
        }
      >
        <div className={"px-4 pb-6"}>
          <FormInput onCalculate={performCalculation} onClear={handleReset} />
        </div>
        <aside
          className={
            "w-full bg-slate-900/95 lg:rounded-bl-[70px] lg:rounded-tr-xl lg:rounded-br-xl overflow-hidden "
          }
        >
          <Results result={result} />
        </aside>
      </section>
    </main>
  );
}
