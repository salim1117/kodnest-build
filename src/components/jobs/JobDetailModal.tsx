import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { getScoreBadgeColor, type ScoredJob } from "@/lib/matchEngine";

interface JobDetailModalProps {
  job: ScoredJob;
  open: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, open, onClose }: JobDetailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-foreground text-xl">{job.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-foreground">{job.company}</span>
            <Badge className={getScoreBadgeColor(job.matchScore)}>{job.matchScore}%</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {job.location} · {job.mode} · {job.experience} · {job.salaryRange}
          </p>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
            ))}
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm text-foreground leading-relaxed">{job.description}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Source: {job.source} · Posted {job.postedDaysAgo === 0 ? "today" : `${job.postedDaysAgo}d ago`}
          </p>
        </div>
        <DialogFooter className="pt-2 gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
            <Button>
              <ExternalLink className="h-4 w-4 mr-1" /> Apply Now
            </Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
