import { useState, useEffect } from "react";
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

const SettingsPage = () => {
  const [prefs, setPrefs] = useState<JobTrackerPreferences>(defaultPreferences);

  useEffect(() => {
    const saved = getPreferences();
    if (saved) setPrefs(saved);
  }, []);

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

      <div className="space-y-8">
        {/* Role Keywords */}
        <div className="space-y-2">
          <Label>Role Keywords</Label>
          <Input
            placeholder="e.g. Frontend Developer, React, SDE"
            value={prefs.roleKeywords.join(", ")}
            onChange={(e) =>
              setPrefs((p) => ({
                ...p,
                roleKeywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              }))
            }
          />
          <p className="text-sm text-muted-foreground">Comma-separated keywords to match against job titles and descriptions.</p>
        </div>

        {/* Preferred Locations */}
        <div className="space-y-2">
          <Label>Preferred Locations</Label>
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
          <Label>Preferred Mode</Label>
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
          <Label>Experience Level</Label>
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
          <Label>Skills</Label>
          <Input
            placeholder="e.g. React, TypeScript, Node.js"
            value={prefs.skills.join(", ")}
            onChange={(e) =>
              setPrefs((p) => ({
                ...p,
                skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              }))
            }
          />
          <p className="text-sm text-muted-foreground">Comma-separated skills to match against job requirements.</p>
        </div>

        {/* Min Match Score */}
        <div className="space-y-2">
          <Label>Minimum Match Score: {prefs.minMatchScore}</Label>
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

        <Button onClick={handleSave} size="lg">Save Preferences</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
