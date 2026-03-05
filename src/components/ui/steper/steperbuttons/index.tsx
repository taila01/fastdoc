import Button from "@/components/ui/button/Button";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

interface StepperButtonsProps {
  currentStep: number;
  totalSteps: number;
  isStepValid: boolean;
  endContent?: React.ReactNode;
  successMessage?: string;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCancel?: () => void;
}

export default function StepperButtons({
  currentStep,
  totalSteps,
  isStepValid,
  successMessage = 'Concluído',
  onPrev,
  onNext,
  onSubmit,
  onCancel,
  endContent,
}: StepperButtonsProps) {
  
  const handlePrev = (): void => {
    if (currentStep > 0) onPrev();
  };

  const handleNext = (): void => {
    if (isStepValid && currentStep < totalSteps - 1) onNext();
  };

  const handleSubmit = (): void => {
    if (isStepValid) onSubmit();
  };

  const buttonStyle = "px-4 py-2 rounded-lg bg-indigo-800 text-white hover:bg-indigo-900 transition flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed border-none shadow-none";

  return (
    <div className="mt-6 flex justify-between items-center pt-4">
      <div>
        {onCancel && (
          <Button 
            onPress={onCancel} 
            variant="light" 
            className="text-gray-500 hover:text-gray-800 px-2"
            startContent={<FaTimes />}
          >
            Cancelar
          </Button>
        )}
      </div>

      <div className="flex gap-4">
        <Button 
          onPress={handlePrev} 
          disabled={currentStep === 0} 
          className={buttonStyle}
          startContent={<BiChevronLeft />}
        >
          Anterior
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button 
            onPress={handleNext} 
            disabled={!isStepValid} 
            className={buttonStyle}
            endContent={<BiChevronRight />}
          >
            Próximo
          </Button>
        ) : (
          <Button 
            onPress={handleSubmit} 
            disabled={!isStepValid}
            className={buttonStyle}
            endContent={endContent ?? ''}
          >
            {successMessage}
          </Button>
        )}
      </div>
    </div>
  );
}