import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Filters {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  status: string;
  sort: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const LOCATIONS = ["", "Bangalore", "Hyderabad", "Mumbai", "Pune", "Chennai", "Delhi", "Remote", "Noida"];
const MODES = ["", "Remote", "Hybrid", "On-site"];
const EXPERIENCE = ["", "Fresher", "1-3 years", "3-5 years", "5-8 years", "8+ years"];
const SOURCES = ["", "LinkedIn", "Naukri", "Company Website"];
const STATUSES = ["", "Not Applied", "Applied", "Rejected", "Selected"];
const SORTS = ["Latest", "Match Score", "Salary"];

const FilterBar = ({ filters, onChange }: FilterBarProps) => {
  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <Input
        placeholder="Search keyword..."
        value={filters.keyword}
        onChange={(e) => update("keyword", e.target.value)}
        className="w-48"
      />
      <Select value={filters.location} onValueChange={(v) => update("location", v === "all" ? "" : v)}>
        <SelectTrigger className="w-36"><SelectValue placeholder="Location" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {LOCATIONS.filter(Boolean).map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={filters.mode} onValueChange={(v) => update("mode", v === "all" ? "" : v)}>
        <SelectTrigger className="w-32"><SelectValue placeholder="Mode" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Modes</SelectItem>
          {MODES.filter(Boolean).map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={filters.experience} onValueChange={(v) => update("experience", v === "all" ? "" : v)}>
        <SelectTrigger className="w-36"><SelectValue placeholder="Experience" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Experience</SelectItem>
          {EXPERIENCE.filter(Boolean).map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={filters.source} onValueChange={(v) => update("source", v === "all" ? "" : v)}>
        <SelectTrigger className="w-36"><SelectValue placeholder="Source" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          {SOURCES.filter(Boolean).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={filters.status} onValueChange={(v) => update("status", v === "all" ? "" : v)}>
        <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {STATUSES.filter(Boolean).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={filters.sort} onValueChange={(v) => update("sort", v)}>
        <SelectTrigger className="w-36"><SelectValue placeholder="Sort" /></SelectTrigger>
        <SelectContent>
          {SORTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
