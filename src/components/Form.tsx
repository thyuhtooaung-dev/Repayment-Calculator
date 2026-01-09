import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface MortgageData {
  amount: number;
  term: number;
  rate: number;
  type: string;
}

interface FormInputProps {
  onCalculate: (data: MortgageData) => void;
  onClear: () => void;
}

export default function FormInput({ onCalculate, onClear }: FormInputProps) {
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    rate: "",
    type: "",
  });

  const [errors, setErrors] = useState({
    amount: false,
    term: false,
    rate: false,
    type: false,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const newErrors = {
      amount: formData.amount === "",
      term: formData.term === "",
      rate: formData.rate === "",
      type: formData.type === "",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      const numericAmount = parseFloat(formData.amount.replace(/,/g, ""));
      const numericTerm = parseFloat(formData.term);
      const numericRate = parseFloat(formData.rate);

      onCalculate({
        amount: numericAmount,
        term: numericTerm,
        rate: numericRate,
        type: formData.type,
      });
      window.scrollTo({ top: 800, behavior: "smooth" });
    }
  };
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleClearAll = () => {
    setFormData({ amount: "", term: "", rate: "", type: "" });
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={"flex flex-col gap-5"}>
        <header className={"md:flex pt-6 items-center justify-between"}>
          <div>
            <h1 className={"text-slate-900 font-bold text-2xl"}>
              Mortgage Calculator
            </h1>
          </div>
          <span
            className={
              "underline text-slate-300 cursor-pointer hover:text-slate-500 duration-300"
            }
            onClick={handleClearAll}
          >
            Clear All
          </span>
        </header>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="mortgage amount"
                className={"text-slate-500"}
              >
                Mortgage Amount
              </FieldLabel>
              <div
                className={`w-full flex items-center border-2 rounded-lg overflow-hidden transition-colors duration-300 group 
      ${errors.amount ? "border-red-500" : "focus-within:border-lime"}`}
              >
                <span
                  className={`py-2 px-4 transition-colors duration-300 
        ${errors.amount ? "bg-red-500 text-white" : "bg-slate-100 text-slate-700 group-focus-within:bg-lime group-focus-within:text-slate-900"}`}
                >
                  ₤
                </span>
                <input
                  className={"w-full mx-4 font-bold cursor-pointer"}
                  inputMode={"numeric"}
                  value={formData.amount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    handleChange("amount", value);
                  }}
                  //Format with commas when the user finishes
                  onBlur={() => {
                    if (formData.amount) {
                      const formatted = Number(
                        formData.amount,
                      ).toLocaleString();
                      handleChange("amount", formatted);
                    }
                  }}
                  // Remove commas when the user starts editing again so they can type
                  onFocus={() => {
                    const unformatted = formData.amount.replace(/,/g, "");
                    handleChange("amount", unformatted);
                  }}
                />
              </div>
              {errors.amount && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </Field>
            <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
              <Field>
                <FieldLabel
                  htmlFor="mortgage term"
                  className={"text-slate-500"}
                >
                  Mortgage Term
                </FieldLabel>
                <div
                  className={`w-full flex items-center border-2 rounded-lg overflow-hidden transition-colors duration-300 group ${errors.term ? "border-red-500" : "focus-within:border-lime"}`}
                >
                  <input
                    className={"w-full mx-4 font-bold cursor-pointer"}
                    inputMode={"numeric"}
                    value={formData.term}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      handleChange("term", value);
                      e.target.value = value;
                    }}
                  />
                  <span
                    className={`py-2 px-4 ${errors.term ? "bg-red-500 text-white" : "bg-slate-100 text-slate-700 group-focus-within:bg-lime group-focus-within:text-slate-900"} transition-colors duration-300`}
                  >
                    years
                  </span>
                </div>
                {errors.term && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="interest rate"
                  className={"text-slate-500"}
                >
                  Interest Rate
                </FieldLabel>
                <div
                  className={`w-full flex items-center border-2 rounded-lg overflow-hidden transition-colors duration-300 group  ${errors.rate ? "border-red-500" : "focus-within:border-lime"}`}
                >
                  <input
                    className={"w-full mx-4 font-bold cursor-pointer"}
                    inputMode={"decimal"}
                    pattern={"[0-9]*[.,]?[0-9]*"}
                    value={formData.rate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9.]/g, "");
                      const parts = value.split(".");
                      if (parts.length > 2) {
                        value = parts[0] + "." + parts.slice(1).join("");
                      }
                      handleChange("rate", value);
                    }}
                  />
                  <span
                    className={`py-2 px-4 ${errors.rate ? "bg-red-500 text-white" : "bg-slate-100 text-slate-700 group-focus-within:bg-lime group-focus-within:text-slate-900"} transition-colors duration-300`}
                  >
                    %
                  </span>
                </div>
                {errors.rate && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </Field>
            </div>
            <FieldGroup>
              <FieldLabel htmlFor="mortgage type" className={"text-slate-500"}>
                Mortgage Type
              </FieldLabel>
              <RadioGroup
                value={formData.type}
                onValueChange={(val) => handleChange("type", val)}
                className={
                  "grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-1 cursor-pointer"
                }
              >
                <Field
                  orientation="horizontal"
                  className={`
    px-3 py-3 rounded-md border-2 flex gap-4 transition-colors duration-300 hover:border-lime
    has-data-[state="checked"]:bg-lime/30 
    has-data-[state="checked"]:border-lime/50
  `}
                >
                  <RadioGroupItem value="Repayment" id="repayment" />
                  <FieldLabel
                    htmlFor={"repayment"}
                    className={"font-bold text-base"}
                  >
                    Repayment
                  </FieldLabel>
                </Field>
                <Field
                  orientation="horizontal"
                  className={`
                   px-3 py-3 rounded-md border-2 flex gap-4 transition-colors duration-300 hover:border-lime
                  has-data-[state="checked"]:bg-lime/30 
                  has-data-[state="checked"]:border-lime/50
              `}
                >
                  <RadioGroupItem value="Interest Only" id="interestOnly" />
                  <FieldLabel
                    htmlFor={"interestOnly"}
                    className={"font-bold text-base"}
                  >
                    Interest Only
                  </FieldLabel>
                </Field>
              </RadioGroup>
              {errors.type && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </FieldGroup>
            <Field orientation="horizontal">
              <Button
                type="submit"
                className={"w-full rounded-3xl bg-lime py-6"}
              >
                <img src="/icon-calculator.svg" alt="calculator icon" />
                <span className={"font-bold text-slate-900"}>
                  Calculate Repayments
                </span>
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </form>
  );
}
