"use client";
import React, { useState } from "react";
import Email from "../LoginStep/Email";
import CreatePassword from "../SignUpSteps/CreatePass";
import ResetPassword from "../PasswordSteps/ResetPassword";
import ChangePassword from "../PasswordSteps/ChangePassword";
import Login from "../LoginStep/Login";
import { useRouter } from "next/navigation";
type AuthStep =
  | "email"
  | "createPassword"
  | "login"
  | "resetPassword"
  | "changePassword";

const AuthFlow = ({ initialStep }: { initialStep: AuthStep }) => {
  const [step, setStep] = useState<AuthStep>(initialStep);
  const router = useRouter();
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
            onNext={() => router.push("/auth/login")}
            onBack={() => handleBack("email")}
          />
        );
      case "login":
        return (
          <Login
            onNext={() => router.push("/")}
            onBack={() => router.push("/auth/signup")}
          />
        );
      case "resetPassword":
        return (
          <ResetPassword
            onNext={() => handleNext("changePassword")}
            onBack={() => router.push("/auth/login")}
          />
        );
      case "changePassword":
        return (
          <ChangePassword
            onNext={() => router.push("/auth/login")}
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
