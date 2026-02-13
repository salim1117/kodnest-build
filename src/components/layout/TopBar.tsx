import { Badge } from "@/components/ui/badge";

type Status = "not-started" | "in-progress" | "shipped";

interface TopBarProps {
  projectName?: string;
  currentStep?: number;
  totalSteps?: number;
  status?: Status;
}

const statusLabels: Record<Status, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "shipped": "Shipped",
};

const statusClasses: Record<Status, string> = {
  "not-started": "bg-muted text-muted-foreground border-border",
  "in-progress": "bg-warning/15 text-warning-foreground border-warning/30",
  "shipped": "bg-success/15 text-success border-success/30",
};

const TopBar = ({
  projectName = "KodNest",
  currentStep = 1,
  totalSteps = 7,
  status = "not-started",
}: TopBarProps) => {
  return (
    <header className="flex items-center justify-between border-b border-border px-10 py-4">
      <span className="font-serif text-lg font-semibold text-foreground">
        {projectName}
      </span>
      <span className="text-sm text-muted-foreground tracking-wide">
        Step {currentStep} / {totalSteps}
      </span>
      <Badge
        variant="outline"
        className={`text-xs font-medium px-4 py-1 ${statusClasses[status]}`}
      >
        {statusLabels[status]}
      </Badge>
    </header>
  );
};

export default TopBar;
