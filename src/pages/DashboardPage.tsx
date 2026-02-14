import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { jobs } from "@/data/jobs";
import { getPreferences } from "@/lib/preferences";
import { filterAndScoreJobs } from "@/lib/matchEngine";
import { getSavedJobs, saveJob, unsaveJob, isJobSaved, getJobStatus, setJobStatus, getAllJobStatuses, type JobStatus } from "@/lib/storage";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import FilterBar from "@/components/jobs/FilterBar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { ScoredJob } from "@/lib/matchEngine";

const DashboardPage = () => {
  const [prefs] = useState(() => getPreferences());
  const [savedJobs, setSavedJobs] = useState(() => getSavedJobs());
  const [statuses, setStatuses] = useState(() => getAllJobStatuses());
  const [selectedJob, setSelectedJob] = useState<ScoredJob | null>(null);
  const [showAboveThreshold, setShowAboveThreshold] = useState(false);

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    mode: "",
    experience: "",
    source: "",
    status: "",
    sort: "Latest",
  });

  const filteredJobs = useMemo(
    () => filterAndScoreJobs(jobs, prefs, { ...filters, showOnlyAboveThreshold: showAboveThreshold }, statuses),
    [prefs, filters, showAboveThreshold, statuses]
  );

  const handleSave = useCallback((id: string) => {
    if (isJobSaved(id)) {
      unsaveJob(id);
      setSavedJobs((prev) => prev.filter((s) => s !== id));
    } else {
      saveJob(id);
      setSavedJobs((prev) => [...prev, id]);
    }
  }, []);

  const handleStatusChange = useCallback((id: string, status: JobStatus) => {
    setJobStatus(id, status);
    setStatuses((prev) => ({ ...prev, [id]: status }));
    toast.success(`Status updated: ${status}`);
  }, []);

  return (
    <div className="bg-accent/30 min-h-screen -mx-6 -my-8 px-6 py-8">
      <div className="max-w-7xl mx-auto">
      <h2 className="font-serif text-foreground mb-2">Dashboard</h2>
      <p className="text-muted-foreground mb-8 text-block">
        Browse and filter jobs matched to your preferences.
      </p>

      {!prefs && (
        <div className="border border-border rounded-md p-6 mb-6 bg-card">
          <p className="text-foreground font-medium">Set your preferences to activate intelligent matching.</p>
          <Link to="/settings" className="text-sm text-primary underline mt-2 inline-block">
            Go to Settings →
          </Link>
        </div>
      )}

      <FilterBar filters={filters} onChange={setFilters} />

      {prefs && (
        <div className="flex items-center gap-3 mb-6">
          <Switch
            checked={showAboveThreshold}
            onCheckedChange={setShowAboveThreshold}
            id="threshold-toggle"
          />
          <Label htmlFor="threshold-toggle" className="text-sm text-muted-foreground cursor-pointer">
            Show only jobs above my threshold ({prefs.minMatchScore}+)
          </Label>
        </div>
      )}

      <p className="text-sm text-muted-foreground mb-6">{filteredJobs.length} jobs found</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={savedJobs.includes(job.id)}
            status={(statuses[job.id] as JobStatus) || "Not Applied"}
            onView={() => setSelectedJob(job)}
            onSave={() => handleSave(job.id)}
            onStatusChange={(status) => handleStatusChange(job.id, status)}
          />
        ))}
      </div>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          open={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
    </div>
  );
};

export default DashboardPage;
