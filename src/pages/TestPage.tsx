import { useState } from "react";
import { getTestResults, setTestResult, resetTestResults } from "@/lib/storage";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const TEST_ITEMS = [
  "Preferences persist after page reload",
  "Match score calculates correctly based on preferences",
  "Threshold toggle filters jobs properly",
  "Saved jobs persist after page reload",
  "Apply button opens job URL in new tab",
  "Job status persists after page reload",
  "Status filter works correctly on dashboard",
  "Digest shows top 10 jobs by match score",
  "Digest persists for today after reload",
  "No console errors during normal usage",
];

const TestPage = () => {
  const [results, setResults] = useState(() => getTestResults());

  const passedCount = results.filter(Boolean).length;

  const toggle = (index: number) => {
    const newVal = !results[index];
    setTestResult(index, newVal);
    setResults((prev) => {
      const copy = [...prev];
      copy[index] = newVal;
      return copy;
    });
  };

  const handleReset = () => {
    resetTestResults();
    setResults(new Array(10).fill(false));
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif text-foreground mb-2">Test Checklist</h2>
      <p className="text-muted-foreground mb-6 text-block">
        Verify each feature works correctly before shipping.
      </p>

      <div className="border border-border rounded-md p-6 bg-card mb-6">
        <p className="font-medium text-foreground mb-1">
          Tests Passed: {passedCount} / 10
        </p>
        {passedCount < 10 && (
          <p className="text-sm text-[hsl(var(--warning))]">
            Resolve all issues before shipping.
          </p>
        )}
      </div>

      <div className="space-y-4 mb-8">
        {TEST_ITEMS.map((item, i) => (
          <label key={i} className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={results[i]}
              onCheckedChange={() => toggle(i)}
              className="mt-0.5"
            />
            <span className="text-sm text-foreground">{item}</span>
          </label>
        ))}
      </div>

      <Button variant="outline" onClick={handleReset}>
        Reset Test Status
      </Button>
    </div>
  );
};

export default TestPage;
