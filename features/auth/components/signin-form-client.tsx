"use client"; // Add this at the top

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Chrome, Github } from "lucide-react";
import { signIn } from "next-auth/react";

const SignInFormClient = () => {
    // Remove async and "use server" - these are client-side handlers
    const handleGoogleSignIn = () => {
        signIn("google");
    };

    const handleGitHubSignIn = () => {
        signIn("github");
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Sign In</CardTitle>     
                <CardDescription className="text-center">
                    Choose one of the following sign-in methods
                </CardDescription>       
            </CardHeader>

            <CardContent className="grid gap-4">
                {/* Remove forms, use onClick handlers directly */}
                <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
                    <Chrome className="mr-2 h-4 w-4" />
                    <span>Sign in with Google</span>
                </Button>
                <Button onClick={handleGitHubSignIn} variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    <span>Sign in with GitHub</span>
                </Button>
            </CardContent>

            <CardFooter>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400 w-full">
                    By signing in, you agree to our {" "}
                    <Link href="/terms" className="underline hover:text-primary">
                        Terms of Service
                    </Link>
                    {" "} and {" "}
                    <Link href="/privacy" className="underline hover:text-primary">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </CardFooter>
        </Card>
    );
};

export default SignInFormClient;