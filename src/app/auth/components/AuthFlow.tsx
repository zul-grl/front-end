"use client";
import React, { useState } from "react";
import Email from "./Email";
import CreatePassword from "./CreatePass";
import ResetPassword from "./ResetPassword";
import ChangePassword from "./ChangePassword";
import Login from "./Login"; // Import the Login component

type AuthStep =
  | "email" // Sign-up: Email step
  | "createPassword" // Sign-up: Create password step
  | "resetPassword" // Forgot password: Reset password step
  | "changePassword" // Forgot password: Change password step
  | "login"; // Login step

const AuthFlow = ({ initialStep }: { initialStep: AuthStep }) => {
  const [step, setStep] = useState<AuthStep>(initialStep);

  const handleNext = (nextStep: AuthStep) => {
    setStep(nextStep);
  };

  const handleBack = (previousStep: AuthStep) => {
    setStep(previousStep);
  };

  const renderStep = () => {
    switch (step) {
      case "email":
        return (
          <Email
            onNext={() => handleNext("createPassword")}
            onBack={() => handleBack("login")}
          />
        );
      case "createPassword":
        return (
          <CreatePassword
            onNext={() => handleNext("login")}
            onBack={() => handleBack("email")}
          />
        );
      case "resetPassword":
        return (
          <ResetPassword
            onNext={() => handleNext("changePassword")}
            onBack={() => handleBack("login")}
          />
        );
      case "changePassword":
        return <ChangePassword onBack={() => handleBack("resetPassword")} />;
      case "login":
        return (
          <Login
            onNext={() => handleNext("email")}
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
