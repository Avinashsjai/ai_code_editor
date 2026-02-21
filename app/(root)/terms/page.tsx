import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for AiCode Editor - AI-powered code editor",
};

export default function TermsPage() {
  const lastUpdated = "February 21, 2025";

  return (
    <div className="container max-w-3xl mx-auto px-4 py-16">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {lastUpdated}
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            By accessing and using AiCode Editor (&quot;the Service&quot;), you accept and agree to be
            bound by the terms and provisions of this agreement. If you do not agree
            to abide by these terms, please do not use this Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Permission is granted to temporarily access the materials on AiCode Editor
            for personal, non-commercial transitory viewing only. This is the grant of
            a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or other proprietary notations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When you create an account with us, you must provide accurate and complete
            information. You are responsible for safeguarding your account credentials
            and for all activities that occur under your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Acceptable Use</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You agree not to use the Service to violate any applicable laws, infringe
            on intellectual property rights, transmit malware, or engage in any
            activity that could harm the Service or other users.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            AiCode Editor shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of or inability
            to use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about these Terms of Service, please contact us.
          </p>
        </section>
      </article>
    </div>
  );
}
