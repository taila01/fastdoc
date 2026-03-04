"use client";
import { ReactNode } from "react";
import classNames from "classnames";

interface StepperBodyProps {
  children?: ReactNode;
  currentStep: number;
  stepKey: number;
}

export default function StepperBody({
  children,
  currentStep,
  stepKey,
}: StepperBodyProps) {
  return (
    <div
      className={classNames(
        "p-4 w-full  overflow-y-auto",
        { hidden: currentStep !== stepKey, grid: currentStep === stepKey }
      )}
    >
      <div className="flex flex-col gap-4 w-full">
        {children}
      </div>
    </div>
  );
}
