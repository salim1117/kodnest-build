import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const proofItems = [
  { id: "ui-built", label: "UI Built" },
  { id: "logic-working", label: "Logic Working" },
  { id: "test-passed", label: "Test Passed" },
  { id: "deployed", label: "Deployed" },
];

const ProofFooter = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <footer className="border-t border-border px-10 py-6">
      <div className="flex items-center gap-10">
        <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
          Proof
        </span>
        {proofItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <Checkbox
              id={item.id}
              checked={!!checked[item.id]}
              onCheckedChange={() => toggle(item.id)}
            />
            <Label
              htmlFor={item.id}
              className="text-sm text-foreground cursor-pointer"
            >
              {item.label}
            </Label>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;
