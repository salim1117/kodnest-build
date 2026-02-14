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
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Top: Title + Badges */}
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-serif text-foreground text-lg font-bold">{job.title}</h4>
        <div className="flex items-center gap-2 shrink-0">
          <Badge className={getScoreBadgeColor(job.matchScore)}>
            {job.matchScore}%
          </Badge>
          <Badge className={getStatusBadgeColor(status)}>
            {status}
          </Badge>
        </div>
      </div>

      {/* Middle: Details */}
      <div className="mt-3 space-y-1">
        <p className="text-sm text-foreground font-medium">{job.company}</p>
        <p className="text-sm text-muted-foreground">{job.location} · {job.mode}</p>
        <p className="text-sm text-muted-foreground">{job.experience} · {job.salaryRange}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-muted-foreground">{job.source}</span>
          <span className="text-xs text-muted-foreground">
            {job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago`}
          </span>
        </div>
      </div>

      {/* Bottom: Actions */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border flex-wrap">
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
