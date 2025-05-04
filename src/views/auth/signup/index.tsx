import React, { useState } from "react";
import { PreRequisites } from "./PreRequisites";
import Registration from "./Registration";
import { TermsAndConditions } from "./TermsAndConditions";

const Signup = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const preRequisitesSteps = [
    {
      id: 1,
      title: "Pre-requisites",
    },
    {
      id: 2,
      title: "Terms & Conditions",
    },
    {
      id: 3,
      title: "Registration",
    },
  ];

  const handleNextStep = (step: number) => {
    if (step < preRequisitesSteps.length) {
      setActiveStep(step + 1);
      setCompletedSteps([...new Set([...completedSteps, activeStep])]);
    }
  };

  const isStepCompleted = (step: number) => {
    return completedSteps.includes(step);
  };

  console.log(completedSteps, "completedSteps");

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-gray-600 text-sm mb-2">Signup &gt;</h2>
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Primary User (HOD) / Verifying Authority Registration
      </h1>

      <div className="w-full max-w-5xl mx-auto bg-white rounded shadow p-4 sm:p-6">
        {/* Stepper */}
        {/* Stepper container */}
        <div className="w-full">
          <div className="block sm:flex items-center justify-between overflow-x-auto px-4 py-2">
            {preRequisitesSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center gap-2 sm:gap-4 cursor-pointer mb-4 sm:mb-0 ${
                    index >= 1 && !isStepCompleted(step.id - 1)
                      ? "pointer-events-none cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  onClick={() => setActiveStep(index + 1)}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                      activeStep === index + 1
                        ? "bg-blue-600 text-white"
                        : isStepCompleted(step.id)
                        ? "bg-green-600 text-white"
                        : "border border-gray-400 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`text-sm sm:text-base whitespace-nowrap ${
                      activeStep === index + 1
                        ? "font-semibold text-blue-600"
                        : isStepCompleted(step.id)
                        ? "font-semibold text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Connecting line between steps */}
                {index < preRequisitesSteps.length - 1 && (
                  <div
                    className={`hidden sm:block flex-1 h-px ${
                      isStepCompleted(step.id) ? "bg-green-600" : "bg-gray-300"
                    } mx-2 sm:mx-4`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Separation line between stepper and content */}
          <div className="w-full h-px bg-gray-300 my-4"></div>

          {/* Step content area */}
          <div className="px-4 sm:px-6">
            {/* Render your content here based on `activeStep` */}
          </div>
        </div>

        <div className="w-full">
          {activeStep === 1 && (
            <PreRequisites
              handleNextStep={(step: number) => handleNextStep(step)}
            />
          )}
          {activeStep === 2 && (
            <TermsAndConditions
              handleNextStep={(step: number) => handleNextStep(step)}
            />
          )}
          {activeStep === 3 && <Registration />}
        </div>
      </div>
    </div>
  );
};

export default Signup;
