import Link from "next/link";
import React from "react";
import { FaReddit } from "react-icons/fa6";
import UserAuthForm from "./UserAuthForm";

const SignUp = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <FaReddit className="mx-auto h-8 w-8 text-orange-500" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Reddit account and agree to our
          User Agreement and Privacy Policy
        </p>

        {/* sign in form */}
        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          Already have an account?{""}
          <Link
            href={"/sign-in"}
            className="hover:text-zinc-800 text-sm underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;