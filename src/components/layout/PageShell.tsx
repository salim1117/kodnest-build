import TopBar from "./TopBar";
import ContextHeader from "./ContextHeader";
import ProofFooter from "./ProofFooter";
import SecondaryPanel from "./SecondaryPanel";

interface PageShellProps {
  headline: string;
  subtext: string;
  projectName?: string;
  currentStep?: number;
  totalSteps?: number;
  status?: "not-started" | "in-progress" | "shipped";
  children: React.ReactNode;
}

const PageShell = ({
  headline,
  subtext,
  projectName,
  currentStep,
  totalSteps,
  status,
  children,
}: PageShellProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar
        projectName={projectName}
        currentStep={currentStep}
        totalSteps={totalSteps}
        status={status}
      />
      <ContextHeader headline={headline} subtext={subtext} />
      <div className="flex flex-1">
        <main className="w-[70%] p-10">{children}</main>
        <div className="w-[30%]">
          <SecondaryPanel />
        </div>
      </div>
      <ProofFooter />
    </div>
  );
};

export default PageShell;
