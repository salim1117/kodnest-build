import { format } from "date-fns";

// --- Saved Jobs ---
const SAVED_KEY = "jobTrackerSavedJobs";

export function getSavedJobs(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveJob(id: string): void {
  const saved = getSavedJobs();
  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }
}

export function unsaveJob(id: string): void {
  const saved = getSavedJobs().filter((s) => s !== id);
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
}

export function isJobSaved(id: string): boolean {
  return getSavedJobs().includes(id);
}

// --- Job Status ---
export type JobStatus = "Not Applied" | "Applied" | "Rejected" | "Selected";
const STATUS_KEY = "jobTrackerStatus";

function getStatusMap(): Record<string, JobStatus> {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getJobStatus(id: string): JobStatus {
  return getStatusMap()[id] || "Not Applied";
}

export function setJobStatus(id: string, status: JobStatus): void {
  const map = getStatusMap();
  map[id] = status;
  localStorage.setItem(STATUS_KEY, JSON.stringify(map));
}

export function getAllJobStatuses(): Record<string, JobStatus> {
  return getStatusMap();
}

// --- Digest ---
export function getDigest(date: Date): string[] | null {
  try {
    const key = `jobTrackerDigest_${format(date, "yyyy-MM-dd")}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDigest(date: Date, jobIds: string[]): void {
  const key = `jobTrackerDigest_${format(date, "yyyy-MM-dd")}`;
  localStorage.setItem(key, JSON.stringify(jobIds));
}

// --- Test Results ---
const TEST_KEY = "jobTrackerTestResults";

export function getTestResults(): boolean[] {
  try {
    const raw = localStorage.getItem(TEST_KEY);
    return raw ? JSON.parse(raw) : new Array(10).fill(false);
  } catch {
    return new Array(10).fill(false);
  }
}

export function setTestResult(index: number, passed: boolean): void {
  const results = getTestResults();
  results[index] = passed;
  localStorage.setItem(TEST_KEY, JSON.stringify(results));
}

export function resetTestResults(): void {
  localStorage.setItem(TEST_KEY, JSON.stringify(new Array(10).fill(false)));
}

// --- Proof Links ---
const PROOF_KEY = "jobTrackerProofLinks";

export interface ProofLinks {
  lovableLink: string;
  githubRepo: string;
  liveDeployment: string;
}

export function getProofLinks(): ProofLinks {
  try {
    const raw = localStorage.getItem(PROOF_KEY);
    return raw ? JSON.parse(raw) : { lovableLink: "", githubRepo: "", liveDeployment: "" };
  } catch {
    return { lovableLink: "", githubRepo: "", liveDeployment: "" };
  }
}

export function saveProofLinks(links: ProofLinks): void {
  localStorage.setItem(PROOF_KEY, JSON.stringify(links));
}
