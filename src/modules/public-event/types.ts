export interface PublicOption {
    id: number;
    label: string;
    img_id?: number;
}

export interface PublicStep {
    id: number;
    title: string;
    description: string;
    step_order: number;
    options: PublicOption[];
}

export interface PublicEvent {
    event_date: string;
    public_token: string | null;
    status: string; // 'published' | 'accepted' | 'rejected' ...
    title: string;
    description: string;
    published_at: string | null;
    simp_target_id: number;
    steps: PublicStep[];
}

export interface AnswerPayload {
    answers: {
        id: number; // Step ID
        options: number[]; // Array of Option IDs
    }[];
}
