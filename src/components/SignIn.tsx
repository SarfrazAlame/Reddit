import React from "react";
import { FaReddit } from "react-icons/fa6";

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <FaReddit className="mx-auto h-8 w-8" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Reddit account and agree to our User Agreement and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignIn;
