import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  title = "Nothing here yet",
  description = "Get started by completing the first step. Your progress will appear here.",
  actionLabel = "Get Started",
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted mb-6">
        <Inbox className="w-5 h-5 text-muted-foreground" />
      </div>
      <h3 className="font-serif text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground text-block mx-auto">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
