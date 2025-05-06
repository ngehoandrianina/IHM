import React from "react";
import "./index.css";
import { TiTick } from "react-icons/ti";

const Stepper = ({ steps, currentStep }) => {
    return (
        <div className="flex justify-between">
            {steps.map((step, i) => (
                <div
                    key={i}
                    className={`step-item  ${currentStep === i && "active"} ${currentStep > i && "complete"}`}
                >
                    <div className="step">
                        {currentStep > i ? <TiTick size={24} /> : i + 1}
                    </div>
                    <p className="dark:text-gray-400 text-white md:mx-0 mx-2">
                        {step}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Stepper;
