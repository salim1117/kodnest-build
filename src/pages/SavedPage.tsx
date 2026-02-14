import { useState, useMemo } from "react";
import { jobs } from "@/data/jobs";
import { getSavedJobs, unsaveJob, getJobStatus, setJobStatus, getAllJobStatuses, type JobStatus } from "@/lib/storage";
import { getPreferences } from "@/lib/preferences";
import { calculateMatchScore, type ScoredJob } from "@/lib/matchEngine";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import EmptyState from "@/components/states/EmptyState";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SavedPage = () => {
  const navigate = useNavigate();
  const prefs = getPreferences();
  const [savedIds, setSavedIds] = useState(() => getSavedJobs());
  const [statuses, setStatuses] = useState(() => getAllJobStatuses());
  const [selectedJob, setSelectedJob] = useState<ScoredJob | null>(null);

  const savedJobs: ScoredJob[] = useMemo(() => {
    return savedIds
      .map((id) => jobs.find((j) => j.id === id))
      .filter(Boolean)
      .map((job) => ({
        ...job!,
        matchScore: prefs ? calculateMatchScore(job!, prefs) : 0,
      }));
  }, [savedIds, prefs]);

  const handleUnsave = (id: string) => {
    unsaveJob(id);
    setSavedIds((prev) => prev.filter((s) => s !== id));
  };

  const handleStatusChange = (id: string, status: JobStatus) => {
    setJobStatus(id, status);
    setStatuses((prev) => ({ ...prev, [id]: status }));
    toast.success(`Status updated: ${status}`);
  };

  if (savedJobs.length === 0) {
    return (
      <div>
        <h2 className="font-serif text-foreground mb-2">Saved Jobs</h2>
        <p className="text-muted-foreground mb-10 text-block">Jobs you've bookmarked for later.</p>
        <EmptyState
          title="No saved jobs"
          description="Browse the dashboard and save jobs that interest you."
          actionLabel="Go to Dashboard"
          onAction={() => navigate("/dashboard")}
        />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-foreground mb-2">Saved Jobs</h2>
      <p className="text-muted-foreground mb-6 text-block">Jobs you've bookmarked for later.</p>
      <p className="text-sm text-muted-foreground mb-4">{savedJobs.length} saved</p>

      <div className="grid gap-4">
        {savedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={true}
            status={(statuses[job.id] as JobStatus) || "Not Applied"}
            onView={() => setSelectedJob(job)}
            onSave={() => handleUnsave(job.id)}
            onStatusChange={(status) => handleStatusChange(job.id, status)}
          />
        ))}
      </div>

      {selectedJob && (
        <JobDetailModal job={selectedJob} open={!!selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default SavedPage;
