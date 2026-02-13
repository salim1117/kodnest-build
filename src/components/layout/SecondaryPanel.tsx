import { Button } from "@/components/ui/button";
import { Copy, Rocket, Check, AlertCircle, ImagePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SecondaryPanelProps {
  stepTitle?: string;
  stepDescription?: string;
  prompt?: string;
}

const SecondaryPanel = ({
  stepTitle = "Current Step",
  stepDescription = "Follow the instructions to complete this step of the build process.",
  prompt = "Create a responsive landing page with a hero section, features grid, and footer.",
}: SecondaryPanelProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast.success("Prompt copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="border-l border-border p-6 flex flex-col gap-6">
      <div>
        <h4 className="font-serif text-foreground">{stepTitle}</h4>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {stepDescription}
        </p>
      </div>

      <div className="rounded-md border border-border bg-muted p-4">
        <p className="text-sm text-foreground font-mono leading-relaxed">
          {prompt}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={handleCopy} variant="outline" className="justify-start gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy Prompt"}
        </Button>
        <Button className="justify-start gap-2">
          <Rocket className="h-4 w-4" />
          Build in Lovable
        </Button>
        <Button variant="outline" className="justify-start gap-2 text-success border-success/30 hover:bg-success/10 hover:text-success">
          <Check className="h-4 w-4" />
          It Worked
        </Button>
        <Button variant="outline" className="justify-start gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive">
          <AlertCircle className="h-4 w-4" />
          Error
        </Button>
        <Button variant="outline" className="justify-start gap-2">
          <ImagePlus className="h-4 w-4" />
          Add Screenshot
        </Button>
      </div>
    </aside>
  );
};

export default SecondaryPanel;
