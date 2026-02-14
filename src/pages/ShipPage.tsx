import { useState } from "react";
import { getTestResults, getProofLinks } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ShipPage = () => {
  const testResults = getTestResults();
  const proofLinks = getProofLinks();

  const allTestsPassed = testResults.every(Boolean);
  const allLinksProvided =
    proofLinks.lovableLink.trim() !== "" &&
    proofLinks.githubRepo.trim() !== "" &&
    proofLinks.liveDeployment.trim() !== "";
  const canShip = allTestsPassed && allLinksProvided;

  const [shipped, setShipped] = useState(false);

  const getStatus = () => {
    if (shipped) return "Shipped";
    if (allTestsPassed || allLinksProvided) return "In Progress";
    return "Not Started";
  };

  const statusColor = () => {
    const s = getStatus();
    if (s === "Shipped") return "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]";
    if (s === "In Progress") return "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="font-serif text-foreground">Ship</h2>
        <Badge className={statusColor()}>{getStatus()}</Badge>
      </div>
      <p className="text-muted-foreground mb-10 text-block">
        Final deployment gate. All tests must pass and all proof links must be provided.
      </p>

      <div className="border border-border rounded-md p-6 bg-card space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">All 10 tests passed</span>
          <span className={`text-sm font-medium ${allTestsPassed ? "text-[hsl(var(--success))]" : "text-destructive"}`}>
            {allTestsPassed ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">All 3 proof links provided</span>
          <span className={`text-sm font-medium ${allLinksProvided ? "text-[hsl(var(--success))]" : "text-destructive"}`}>
            {allLinksProvided ? "Yes" : "No"}
          </span>
        </div>
      </div>

      {shipped ? (
        <div className="mt-10 border border-border rounded-md p-8 bg-card text-center">
          <h3 className="font-serif text-foreground">Project 1 Shipped Successfully.</h3>
        </div>
      ) : (
        <Button
          className="mt-8"
          size="lg"
          disabled={!canShip}
          onClick={() => setShipped(true)}
        >
          Ship Project
        </Button>
      )}
    </div>
  );
};

export default ShipPage;
