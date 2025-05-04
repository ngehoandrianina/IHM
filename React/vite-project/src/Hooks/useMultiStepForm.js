import { useState } from "react";

const useMultiStepForm = (steps) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const next = () => {
        setCurrentStepIndex((prev) =>
            prev >= steps.length - 1 ? prev : prev + 1,
        );
    };

    const back = () => {
        setCurrentStepIndex((prev) => (prev <= 0 ? prev : prev - 1));
    };

    const goTo = (index) => {
        setCurrentStepIndex(index);
    };

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps: steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        next,
        back,
        goTo,
        isBeforeVerificationStep: currentStepIndex === steps.length - 1,
    };
};

export default useMultiStepForm;
