"use client";
import { EmailForm } from "../components/EmailForm";
import { useFormState } from "../components/FormContext";
import { PasswordForm } from "../components/PasswordForm";
import { UserNameForm } from "../components/UserNameFrom";

function ActiveStepFormComponent() {
  const { step } = useFormState();
  switch (step) {
    case 1:
      return <UserNameForm />;
    case 2:
      return <EmailForm />;
    case 3:
      return <PasswordForm />;
    default:
      return null;
  }
}

export default function Home() {
  return (
    <main>
      <div>
        <h1 className="text-center text-2xl font-semibold py-4">
          Sign Up Form
        </h1>
        <div className="space-y-6">
          <ActiveStepFormComponent />
        </div>
      </div>
    </main>
  );
}
