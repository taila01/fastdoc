'use client';

import React from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

interface StepperProps {
  steps: Array<{ stepName?: string; }>;
  currentStep: number;
}

export default function Steps({ steps, currentStep }: StepperProps) {
  // Calcular a porcentagem geral de progresso
  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full mb-4">
      {/* Barra de progresso principal */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-brand-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 12
          }}
        />
      </div>

      <div className="flex items-center justify-between ">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const stepName = step.stepName || `Passo ${index + 1}`; // Nome padrão se não houver stepName

          return (
            <div
              key={index}
              className="flex items-center group relative"
              aria-current={isCurrent ? 'step' : undefined}
            >
              {/* Step circle with progress or check */}
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full 
                  transition-all duration-300 ease-in-out
                  ${isCompleted
                    ? 'bg-success-600 text-white dark:text-gray-900'
                    : isCurrent
                      ? 'bg-brand-100 dark:bg-gray-900 text-brand-600 ring-2 ring-brand-500/30 shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                  }
                `}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <FaCheck className="w-4 h-4" />
                  </motion.div>
                ) : isCurrent ? (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-xs font-semibold">{index + 1}</span>
                  </motion.div>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}

                {/* Mobile tooltip for step name */}
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity md:hidden">
                  {stepName}
                </span>
              </div>

              {/* Step label - hidden on mobile, visible on md+ */}
              <span
                className={`
                  ml-2 text-sm font-medium transition-colors duration-300 hidden md:block mr-2
                  ${isCompleted
                    ? 'text-success-600'
                    : isCurrent
                      ? 'text-brand-600 font-semibold'
                      : 'text-gray-500'
                  }
                `}
              >
                {stepName}
              </span>

              {/* Connector between steps - now hidden as we have the progress bar */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 md:mx-6 hidden">
                  <HiChevronDoubleRight
                    className={`
                      w-4 h-4 transition-colors duration-300 
                      ${isCompleted ? 'text-success-500' : 'text-gray-300'}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}