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
  endContent,
  totalSteps,
  isStepValid,
  successMessage = 'Concluído',
  onPrev,
  onNext,
  onSubmit,
  onCancel,
}: StepperButtonsProps) {
  console.log('isStepValid', isStepValid);
  const handlePrev = (): void => {
    if (currentStep > 0) {
      onPrev();
    }
  };
  const handleNext = (): void => {
    if (isStepValid && currentStep < totalSteps - 1) {
      onNext();
    }
  };

  const handleSubmit = (): void => {
    if (isStepValid) {
      onSubmit();
    }
  };

  return (
    <div className="mt-6 flex justify-between pt-2">
      <div className="flex gap-2">
        {onCancel && (
          <Button 
            onPress={onCancel} 
            variant="light" 
            startContent={<FaTimes />}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Cancelar
          </Button>
        )}
        <Button 
          onPress={handlePrev} 
          disabled={currentStep === 0} 
          variant="faded" 
          startContent={<BiChevronLeft />}
        >
          Anterior
        </Button>
      </div>
      {currentStep < totalSteps - 1 ? (
        <Button onPress={handleNext} disabled={!isStepValid} endContent={<BiChevronRight />}>
          Próximo
        </Button>
      ) : (
        <Button onPress={handleSubmit} variant="primary" endContent={endContent ?? ''}>{successMessage}</Button>
      )}
    </div>
  );
}
