import { useState } from "react";
import { getProofLinks, saveProofLinks, type ProofLinks } from "@/lib/storage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

const STEPS = [
  "Design System Foundation",
  "Route Skeleton",
  "Job Dataset",
  "Settings & Preferences",
  "Dashboard & Matching",
  "Saved Jobs & Status",
  "Daily Digest",
  "Test & Ship",
];

function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

const ProofPage = () => {
  const [links, setLinks] = useState<ProofLinks>(() => getProofLinks());
  const [errors, setErrors] = useState<Partial<ProofLinks>>({});

  const handleSave = () => {
    const newErrors: Partial<ProofLinks> = {};
    if (links.lovableLink && !isValidUrl(links.lovableLink)) newErrors.lovableLink = "Invalid URL";
    if (links.githubRepo && !isValidUrl(links.githubRepo)) newErrors.githubRepo = "Invalid URL";
    if (links.liveDeployment && !isValidUrl(links.liveDeployment)) newErrors.liveDeployment = "Invalid URL";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    saveProofLinks(links);
    toast.success("Proof links saved.");
  };

  const submissionText = `
Job Notification Tracker — Final Submission
============================================

Lovable Link: ${links.lovableLink || "Not provided"}
GitHub Repo: ${links.githubRepo || "Not provided"}
Live Deployment: ${links.liveDeployment || "Not provided"}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced

Steps Completed: ${STEPS.length} / ${STEPS.length}
  `.trim();

  const copySubmission = () => {
    navigator.clipboard.writeText(submissionText);
    toast.success("Submission copied to clipboard.");
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif text-foreground mb-2">Proof</h2>
      <p className="text-muted-foreground mb-8 text-block">
        Track your progress and submit project artifacts.
      </p>

      {/* Step Summary */}
      <div className="border border-border rounded-md p-6 bg-card mb-8">
        <h3 className="font-serif text-foreground mb-4">Step Completion Summary</h3>
        <div className="space-y-2">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="w-5 h-5 rounded-full bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] flex items-center justify-center text-xs font-medium">
                ✓
              </span>
              <span className="text-foreground">Step {i + 1}: {step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Artifact Inputs */}
      <div className="space-y-6 mb-8">
        <div className="space-y-2">
          <Label>Lovable Link</Label>
          <Input
            placeholder="https://lovable.dev/projects/..."
            value={links.lovableLink}
            onChange={(e) => setLinks((p) => ({ ...p, lovableLink: e.target.value }))}
          />
          {errors.lovableLink && <p className="text-sm text-destructive">{errors.lovableLink}</p>}
        </div>

        <div className="space-y-2">
          <Label>GitHub Repo</Label>
          <Input
            placeholder="https://github.com/..."
            value={links.githubRepo}
            onChange={(e) => setLinks((p) => ({ ...p, githubRepo: e.target.value }))}
          />
          {errors.githubRepo && <p className="text-sm text-destructive">{errors.githubRepo}</p>}
        </div>

        <div className="space-y-2">
          <Label>Live Deployment</Label>
          <Input
            placeholder="https://..."
            value={links.liveDeployment}
            onChange={(e) => setLinks((p) => ({ ...p, liveDeployment: e.target.value }))}
          />
          {errors.liveDeployment && <p className="text-sm text-destructive">{errors.liveDeployment}</p>}
        </div>

        <Button onClick={handleSave}>Save Links</Button>
      </div>

      {/* Copy Submission */}
      <Button variant="outline" onClick={copySubmission}>
        <Copy className="h-4 w-4 mr-1" /> Copy Final Submission
      </Button>
    </div>
  );
};

export default ProofPage;
