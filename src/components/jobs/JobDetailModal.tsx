import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getScoreBadgeColor, type ScoredJob } from "@/lib/matchEngine";

interface JobDetailModalProps {
  job: ScoredJob;
  open: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, open, onClose }: JobDetailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-foreground">{job.title}</DialogTitle>
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
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
