import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const ErrorState = ({
  title = "Something went wrong",
  description = "This step could not be completed. Try again, or check the error details for a fix.",
  actionLabel = "Try Again",
  onAction,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-destructive/10 mb-6">
        <AlertCircle className="w-5 h-5 text-destructive" />
      </div>
      <h3 className="font-serif text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground text-block mx-auto">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction} variant="outline" className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
