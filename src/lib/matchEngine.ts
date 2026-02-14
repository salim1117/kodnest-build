import type { Job } from "@/data/jobs";
import type { JobTrackerPreferences } from "@/lib/preferences";

export function calculateMatchScore(job: Job, prefs: JobTrackerPreferences): number {
  let score = 0;

  const titleLower = job.title.toLowerCase();
  const descLower = job.description.toLowerCase();

  // +25 if roleKeyword in title, +15 if in description (only best match counts per keyword)
  let roleBonus = 0;
  for (const kw of prefs.roleKeywords) {
    const kwLower = kw.toLowerCase().trim();
    if (!kwLower) continue;
    if (titleLower.includes(kwLower)) {
      roleBonus = Math.max(roleBonus, 25);
    } else if (descLower.includes(kwLower)) {
      roleBonus = Math.max(roleBonus, 15);
    }
  }
  score += roleBonus;

  // +15 location match
  if (prefs.preferredLocations.some((loc) => loc.toLowerCase() === job.location.toLowerCase())) {
    score += 15;
  }

  // +10 mode match
  if (prefs.preferredMode.some((m) => m.toLowerCase() === job.mode.toLowerCase())) {
    score += 10;
  }

  // +10 experience match
  if (prefs.experienceLevel && prefs.experienceLevel === job.experience) {
    score += 10;
  }

  // +15 skills overlap (any overlap)
  const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
  const hasSkillOverlap = prefs.skills.some((s) => jobSkillsLower.includes(s.toLowerCase().trim()));
  if (hasSkillOverlap) {
    score += 15;
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source = LinkedIn
  if (job.source === "LinkedIn") {
    score += 5;
  }

  return Math.min(score, 100);
}

export function getScoreBadgeColor(score: number): string {
  if (score >= 80) return "text-[hsl(var(--success))] bg-[hsl(var(--success))]/10";
  if (score >= 60) return "text-[hsl(var(--warning))] bg-[hsl(var(--warning))]/10";
  if (score >= 40) return "text-muted-foreground bg-muted";
  return "text-muted-foreground/60 bg-muted/50";
}

export function getStatusBadgeColor(status: string): string {
  switch (status) {
    case "Applied": return "text-blue-700 bg-blue-50";
    case "Rejected": return "text-red-700 bg-red-50";
    case "Selected": return "text-[hsl(var(--success))] bg-[hsl(var(--success))]/10";
    default: return "text-muted-foreground bg-muted";
  }
}

export interface ScoredJob extends Job {
  matchScore: number;
}

export function filterAndScoreJobs(
  allJobs: Job[],
  prefs: JobTrackerPreferences | null,
  filters: {
    keyword?: string;
    location?: string;
    mode?: string;
    experience?: string;
    source?: string;
    status?: string;
    sort?: string;
    showOnlyAboveThreshold?: boolean;
  },
  statusMap: Record<string, string>
): ScoredJob[] {
  let scored: ScoredJob[] = allJobs.map((job) => ({
    ...job,
    matchScore: prefs ? calculateMatchScore(job, prefs) : 0,
  }));

  // Filter: keyword
  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase();
    scored = scored.filter(
      (j) => j.title.toLowerCase().includes(kw) || j.company.toLowerCase().includes(kw)
    );
  }

  // Filter: location
  if (filters.location) {
    scored = scored.filter((j) => j.location === filters.location);
  }

  // Filter: mode
  if (filters.mode) {
    scored = scored.filter((j) => j.mode === filters.mode);
  }

  // Filter: experience
  if (filters.experience) {
    scored = scored.filter((j) => j.experience === filters.experience);
  }

  // Filter: source
  if (filters.source) {
    scored = scored.filter((j) => j.source === filters.source);
  }

  // Filter: status
  if (filters.status) {
    scored = scored.filter((j) => (statusMap[j.id] || "Not Applied") === filters.status);
  }

  // Threshold
  if (filters.showOnlyAboveThreshold && prefs) {
    scored = scored.filter((j) => j.matchScore >= prefs.minMatchScore);
  }

  // Sort
  switch (filters.sort) {
    case "Match Score":
      scored.sort((a, b) => b.matchScore - a.matchScore);
      break;
    case "Salary":
      scored.sort((a, b) => a.salaryRange.localeCompare(b.salaryRange));
      break;
    case "Latest":
    default:
      scored.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
      break;
  }

  return scored;
}
