export interface JobTrackerPreferences {
  roleKeywords: string[];
  preferredLocations: string[];
  preferredMode: string[];
  experienceLevel: string;
  skills: string[];
  minMatchScore: number;
}

const STORAGE_KEY = "jobTrackerPreferences";

export const defaultPreferences: JobTrackerPreferences = {
  roleKeywords: [],
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: "",
  skills: [],
  minMatchScore: 40,
};

export function getPreferences(): JobTrackerPreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as JobTrackerPreferences;
  } catch {
    return null;
  }
}

export function savePreferences(prefs: JobTrackerPreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}
