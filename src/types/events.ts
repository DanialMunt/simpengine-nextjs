export interface Event {
  id: number;
  event_date: string;        // ISO string
  title: string;
  description: string;
  published_at: string;      // ISO string (or empty)
  public_token: string;      // can be used for sharing
  simp_target_id: number;
  steps: Step[] | null;  
  status: string    // nullable if no steps yet
}
export interface Step {
  id: number;
  event_id: number;
  type: StepType;
  title: string;
  options: Option[] | null;
}

export type StepType =
  | "ENTERTAINMENT"
  | "FOOD"
  | "DRINKS"
  | "CUSTOM";


export interface Option {
  id: number;
  step_id: number;
  title: string;
  description?: string;
  created_by_user: boolean;  // true if custom, false if predefined
}

// For creating an event



