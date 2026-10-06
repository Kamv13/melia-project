export interface LeaderboardEntry {
  name: string;
  teamName: string;
  jobId: number;
  jobName: string;  
  level: number;
}

export interface LeaderboardResponse {
  result: number;
  entries: LeaderboardEntry[];
}