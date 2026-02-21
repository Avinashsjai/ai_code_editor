import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for AiCode Editor - AI-powered code editor",
};

export default function PrivacyPage() {
  const lastUpdated = "February 21, 2025";

  return (
    <div className="container max-w-3xl mx-auto px-4 py-16">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {lastUpdated}
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We collect information you provide directly, including account
            information (name, email, profile picture) when you sign in via OAuth
            providers, and the code and projects you create within the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use the information we collect to provide, maintain, and improve the
            Service, to process AI-powered code suggestions, and to communicate with
            you about updates and support.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Data Storage and Security</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Your data is stored securely. We implement appropriate technical and
            organizational measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use third-party services for authentication (e.g., GitHub, Google) and
            AI features. These services have their own privacy policies governing the
            use of your information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You may access, correct, or delete your personal information. You may
            also request a copy of your data or withdraw consent for data processing.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about this Privacy Policy, please contact us.
          </p>
        </section>
      </article>
    </div>
  );
}
