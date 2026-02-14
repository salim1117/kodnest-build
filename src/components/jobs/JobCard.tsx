import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bookmark, BookmarkCheck, ExternalLink, Eye } from "lucide-react";
import { getScoreBadgeColor, getStatusBadgeColor, type ScoredJob } from "@/lib/matchEngine";
import type { JobStatus } from "@/lib/storage";

interface JobCardProps {
  job: ScoredJob;
  isSaved: boolean;
  status: JobStatus;
  onView: () => void;
  onSave: () => void;
  onStatusChange: (status: JobStatus) => void;
}

const STATUSES: JobStatus[] = ["Not Applied", "Applied", "Rejected", "Selected"];

const JobCard = ({ job, isSaved, status, onView, onSave, onStatusChange }: JobCardProps) => {
  return (
    <div className="border border-border rounded-md p-6 bg-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h4 className="font-serif text-foreground">{job.title}</h4>
            <Badge className={getScoreBadgeColor(job.matchScore)}>
              {job.matchScore}%
            </Badge>
            <Badge className={getStatusBadgeColor(status)}>
              {status}
            </Badge>
          </div>
          <p className="text-sm text-foreground font-medium">{job.company}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {job.location} · {job.mode} · {job.experience} · {job.salaryRange}
          </p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="text-xs text-muted-foreground">{job.source}</span>
            <span className="text-xs text-muted-foreground">
              {job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago`}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <Button variant="outline" size="sm" onClick={onView}>
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
        <Button variant="outline" size="sm" onClick={onSave}>
          {isSaved ? <BookmarkCheck className="h-4 w-4 mr-1" /> : <Bookmark className="h-4 w-4 mr-1" />}
          {isSaved ? "Saved" : "Save"}
        </Button>
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-1" /> Apply
          </Button>
        </a>
        <Select value={status} onValueChange={(val) => onStatusChange(val as JobStatus)}>
          <SelectTrigger className="w-[140px] h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobCard;
