import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
            {children}
        </main>
    );
};

export default AuthLayout;