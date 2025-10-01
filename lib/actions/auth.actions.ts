"use server";

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";

export const SignUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email, password, name: fullName },
    });
    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }
    return {
      success: true,
      message: "User created successfully",
      data: response,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to sign up" };
  }
};

export const SingOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to sign out" };
  }
};

export const SignInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
    });

    return {
      success: true,
      message: "User signed in successfully",
      data: response,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to sign in" };
  }
};
