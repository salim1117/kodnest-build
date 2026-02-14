import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { getPreferences, savePreferences, type JobTrackerPreferences, defaultPreferences } from "@/lib/preferences";

const LOCATIONS = ["Bangalore", "Hyderabad", "Mumbai", "Pune", "Chennai", "Delhi", "Remote", "Noida"];
const MODES = ["Remote", "Hybrid", "On-site"];
const EXPERIENCE_LEVELS = ["Fresher", "1-3 years", "3-5 years", "5-8 years", "8+ years"];

const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
};

const SettingsPage = () => {
  const [prefs, setPrefs] = useState<JobTrackerPreferences>(() => {
    const saved = getPreferences();
    return saved || defaultPreferences;
  });
  const [roleKeywordsInput, setRoleKeywordsInput] = useState(() => prefs.roleKeywords.join(", "));
  const [skillsInput, setSkillsInput] = useState(() => prefs.skills.join(", "));

  const handleSave = () => {
    savePreferences(prefs);
    toast.success("Preferences saved.");
  };

  const toggleLocation = (loc: string) => {
    setPrefs((p) => ({
      ...p,
      preferredLocations: p.preferredLocations.includes(loc)
        ? p.preferredLocations.filter((l) => l !== loc)
        : [...p.preferredLocations, loc],
    }));
  };

  const toggleMode = (mode: string) => {
    setPrefs((p) => ({
      ...p,
      preferredMode: p.preferredMode.includes(mode)
        ? p.preferredMode.filter((m) => m !== mode)
        : [...p.preferredMode, mode],
    }));
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif text-foreground mb-2">Settings</h2>
      <p className="text-muted-foreground mb-10">Configure your job matching preferences.</p>

      <div className="bg-card p-8 rounded-xl shadow-sm border border-border space-y-10">
        {/* Role Keywords */}
        <div className="space-y-2">
          <Label className="font-semibold">Role Keywords</Label>
          <Input
            placeholder="e.g. Frontend Developer, React, SDE"
            value={roleKeywordsInput}
            onChange={(e) => setRoleKeywordsInput(e.target.value)}
            onBlur={() => {
              const parsed = roleKeywordsInput.split(",").map((s) => s.trim()).filter(Boolean);
              if (!arraysEqual(parsed, prefs.roleKeywords)) {
                setPrefs((p) => ({ ...p, roleKeywords: parsed }));
              }
            }}
          />
          <p className="text-sm text-muted-foreground">Comma-separated keywords to match against job titles and descriptions.</p>
        </div>

        {/* Preferred Locations */}
        <div className="space-y-2">
          <Label className="font-semibold">Preferred Locations</Label>
          <div className="flex flex-wrap gap-3">
            {LOCATIONS.map((loc) => (
              <label key={loc} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={prefs.preferredLocations.includes(loc)}
                  onCheckedChange={() => toggleLocation(loc)}
                />
                {loc}
              </label>
            ))}
          </div>
        </div>

        {/* Preferred Mode */}
        <div className="space-y-2">
          <Label className="font-semibold">Preferred Mode</Label>
          <div className="flex flex-wrap gap-4">
            {MODES.map((mode) => (
              <label key={mode} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={prefs.preferredMode.includes(mode)}
                  onCheckedChange={() => toggleMode(mode)}
                />
                {mode}
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label className="font-semibold">Experience Level</Label>
          <Select
            value={prefs.experienceLevel}
            onValueChange={(val) => setPrefs((p) => ({ ...p, experienceLevel: val }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <Label className="font-semibold">Skills</Label>
          <Input
            placeholder="e.g. React, TypeScript, Node.js"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            onBlur={() => {
              const parsed = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);
              if (!arraysEqual(parsed, prefs.skills)) {
                setPrefs((p) => ({ ...p, skills: parsed }));
              }
            }}
          />
          <p className="text-sm text-muted-foreground">Comma-separated skills to match against job requirements.</p>
        </div>

        {/* Min Match Score */}
        <div className="space-y-2">
          <Label className="font-semibold">Minimum Match Score: {prefs.minMatchScore}</Label>
          <Slider
            value={[prefs.minMatchScore]}
            onValueChange={([val]) => setPrefs((p) => ({ ...p, minMatchScore: val }))}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">Jobs below this score can be hidden with the dashboard toggle.</p>
        </div>

        <Button onClick={handleSave} size="lg" className="text-base px-10 py-5 h-14">Save Preferences</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
