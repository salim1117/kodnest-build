import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bookmark, BookmarkCheck, ExternalLink, Eye, MapPin, Clock, Building2 } from "lucide-react";
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
    <div className="group bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      {/* Accent top bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
        job.matchScore >= 80 ? "from-success to-accent" :
        job.matchScore >= 60 ? "from-warning to-warning/60" :
        job.matchScore >= 40 ? "from-primary to-secondary" :
        "from-muted to-muted"
      }`} />

      {/* Top: Title + Badges */}
      <div className="flex items-start justify-between gap-4 mt-1">
        <h4 className="font-serif text-foreground text-lg font-bold leading-tight">{job.title}</h4>
        <div className="flex items-center gap-2 shrink-0">
          <Badge className={`${getScoreBadgeColor(job.matchScore)} text-xs font-bold`}>
            {job.matchScore}%
          </Badge>
          <Badge className={`${getStatusBadgeColor(status)} text-xs`}>
            {status}
          </Badge>
        </div>
      </div>

      {/* Middle: Details */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5 text-primary/70" />
          <p className="text-sm text-foreground font-medium">{job.company}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{job.location} · {job.mode}</p>
        </div>
        <p className="text-sm text-muted-foreground pl-5">{job.experience} · {job.salaryRange}</p>
        <div className="flex items-center gap-3 pl-5">
          <span className="text-xs text-muted-foreground/70 bg-muted/50 px-2 py-0.5 rounded-full">{job.source}</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground/50" />
            <span className="text-xs text-muted-foreground/70">
              {job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago`}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom: Actions */}
      <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-border/50 flex-wrap">
        <Button variant="outline" size="sm" onClick={onView} className="rounded-lg text-xs h-8">
          <Eye className="h-3.5 w-3.5 mr-1" /> View
        </Button>
        <Button
          variant={isSaved ? "default" : "outline"}
          size="sm"
          onClick={onSave}
          className={`rounded-lg text-xs h-8 ${isSaved ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20" : ""}`}
        >
          {isSaved ? <BookmarkCheck className="h-3.5 w-3.5 mr-1" /> : <Bookmark className="h-3.5 w-3.5 mr-1" />}
          {isSaved ? "Saved" : "Save"}
        </Button>
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">
            <ExternalLink className="h-3.5 w-3.5 mr-1" /> Apply
          </Button>
        </a>
        <Select value={status} onValueChange={(val) => onStatusChange(val as JobStatus)}>
          <SelectTrigger className="w-[130px] h-8 text-xs rounded-lg">
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
