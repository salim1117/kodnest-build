import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { jobs } from "@/data/jobs";
import { getPreferences } from "@/lib/preferences";
import { calculateMatchScore } from "@/lib/matchEngine";
import { getDigest, saveDigest } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Mail } from "lucide-react";

const DigestPage = () => {
  const prefs = getPreferences();
  const today = new Date();
  const [digestIds, setDigestIds] = useState<string[] | null>(() => getDigest(today));

  const generateDigest = () => {
    if (!prefs) return;
    const scored = jobs
      .map((j) => ({ ...j, matchScore: calculateMatchScore(j, prefs) }))
      .sort((a, b) => b.matchScore - a.matchScore || a.postedDaysAgo - b.postedDaysAgo)
      .slice(0, 10);
    const ids = scored.map((j) => j.id);
    saveDigest(today, ids);
    setDigestIds(ids);
  };

  const digestJobs = useMemo(() => {
    if (!digestIds || !prefs) return [];
    return digestIds
      .map((id) => jobs.find((j) => j.id === id))
      .filter(Boolean)
      .map((j) => ({ ...j!, matchScore: calculateMatchScore(j!, prefs) }));
  }, [digestIds, prefs]);

  const digestText = useMemo(() => {
    if (!digestJobs.length) return "";
    const lines = digestJobs.map(
      (j, i) => `${i + 1}. ${j.title} at ${j.company} — ${j.location} (${j.mode}) — Match: ${j.matchScore}%\n   ${j.salaryRange} | ${j.experience} | Posted ${j.postedDaysAgo}d ago`
    );
    return `Job Digest — ${format(today, "dd MMM yyyy")}\n\n${lines.join("\n\n")}`;
  }, [digestJobs, today]);

  const copyDigest = () => {
    navigator.clipboard.writeText(digestText);
    toast.success("Digest copied to clipboard.");
  };

  const mailtoLink = `mailto:?subject=Job Digest — ${format(today, "dd MMM yyyy")}&body=${encodeURIComponent(digestText)}`;

  if (!prefs) {
    return (
      <div>
        <h2 className="font-serif text-foreground mb-2">Daily Digest</h2>
        <p className="text-muted-foreground mb-10 text-block">Your personalized daily job digest.</p>
        <div className="border border-border rounded-md p-6 bg-card">
          <p className="text-foreground font-medium">Set your preferences first to generate a digest.</p>
          <Link to="/settings" className="text-sm text-primary underline mt-2 inline-block">
            Go to Settings →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-foreground mb-2">Daily Digest</h2>
      <p className="text-muted-foreground mb-6 text-block">Your top 10 matched jobs for today.</p>

      {!digestIds && (
        <Button onClick={generateDigest} size="lg">
          Generate Today's 9AM Digest (Simulated)
        </Button>
      )}

      {digestJobs.length > 0 && (
        <div className="mt-6">
          <div className="flex gap-3 mb-6">
            <Button variant="outline" size="sm" onClick={copyDigest}>
              <Copy className="h-4 w-4 mr-1" /> Copy Digest to Clipboard
            </Button>
            <a href={mailtoLink}>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-1" /> Create Email Draft
              </Button>
            </a>
          </div>

          <div className="bg-card border border-border rounded-md p-8 space-y-4">
            <h3 className="font-serif text-foreground">
              Job Digest — {format(today, "dd MMM yyyy")}
            </h3>
            {digestJobs.map((job, i) => (
              <div key={job.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                <p className="font-medium text-foreground">
                  {i + 1}. {job.title} at {job.company}
                </p>
                <p className="text-sm text-muted-foreground">
                  {job.location} · {job.mode} · {job.experience} · {job.salaryRange}
                </p>
                <p className="text-sm text-muted-foreground">
                  Match Score: {job.matchScore}% · Posted {job.postedDaysAgo}d ago · {job.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DigestPage;
