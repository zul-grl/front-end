"use client";
import React, { useState } from "react";
import Email from "./Email";
import CreatePassword from "./CreatePass";
import ResetPassword from "./ResetPassword";
import ChangePassword from "./ChangePassword";
import Login from "./Login";

type AuthStep =
  | "email"
  | "createPassword"
  | "login"
  | "resetPassword"
  | "changePassword";

const AuthFlow = ({ initialStep }: { initialStep: AuthStep }) => {
  const [step, setStep] = useState<AuthStep>(initialStep);

  const handleNext = (nextStep: AuthStep) => {
    setStep(nextStep); // Only update the internal step state
  };

  const handleBack = (previousStep: AuthStep) => {
    setStep(previousStep); // Only update the internal step state
  };

  const renderStep = () => {
    switch (step) {
      case "email":
        return <Email onNext={() => handleNext("createPassword")} />;
      case "createPassword":
        return (
          <CreatePassword
            onNext={() => handleNext("login")}
            onBack={() => handleBack("email")}
          />
        );
      case "login":
        return <Login onBack={() => handleBack("createPassword")} />;
      case "resetPassword":
        return (
          <ResetPassword
            onNext={() => handleNext("changePassword")}
            onBack={() => handleBack("login")}
          />
        );
      case "changePassword":
        return (
          <ChangePassword
            onNext={() => handleNext("login")}
            onBack={() => handleBack("resetPassword")}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

export default AuthFlow;
