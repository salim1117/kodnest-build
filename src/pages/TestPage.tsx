import { useState } from "react";
import { getTestResults, setTestResult, resetTestResults } from "@/lib/storage";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, RotateCcw, Shield, Sparkles } from "lucide-react";

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
  const allPassed = passedCount === 10;
  const progressPercent = (passedCount / 10) * 100;

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
      <div className="flex items-center gap-3 mb-2">
        <Shield className="h-7 w-7 text-primary" />
        <h2 className="font-serif text-foreground">Test Checklist</h2>
      </div>
      <p className="text-muted-foreground mb-8 text-block">
        Verify each feature works correctly before shipping.
      </p>

      {/* Progress Card */}
      <div className={`rounded-xl p-6 mb-8 border-2 transition-all duration-500 ${
        allPassed 
          ? "bg-success/5 border-success/30" 
          : "bg-card border-border"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {allPassed ? (
              <Sparkles className="h-6 w-6 text-success animate-pulse" />
            ) : (
              <div className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{passedCount}</span>
              </div>
            )}
            <div>
              <p className="font-semibold text-foreground text-lg">
                {passedCount} / 10 Passed
              </p>
              {allPassed ? (
                <p className="text-sm text-success font-medium">All tests passed! Ready to ship 🚀</p>
              ) : (
                <p className="text-sm text-warning font-medium">
                  {10 - passedCount} remaining — resolve before shipping
                </p>
              )}
            </div>
          </div>
          <span className="text-2xl font-bold text-primary">{Math.round(progressPercent)}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              allPassed
                ? "bg-gradient-to-r from-success to-accent"
                : "bg-gradient-to-r from-primary to-secondary"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Test Items */}
      <div className="space-y-2 mb-8">
        {TEST_ITEMS.map((item, i) => (
          <label
            key={i}
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
              results[i]
                ? "bg-success/5 border-success/20 hover:bg-success/10"
                : "bg-card border-border hover:border-primary/30 hover:shadow-sm"
            }`}
          >
            <Checkbox
              checked={results[i]}
              onCheckedChange={() => toggle(i)}
              className="h-5 w-5"
            />
            <span className="flex-1 text-sm text-foreground font-medium">{item}</span>
            {results[i] ? (
              <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground/30 shrink-0" />
            )}
          </label>
        ))}
      </div>

      <Button variant="outline" onClick={handleReset} className="gap-2">
        <RotateCcw className="h-4 w-4" />
        Reset Test Status
      </Button>
    </div>
  );
};

export default TestPage;
