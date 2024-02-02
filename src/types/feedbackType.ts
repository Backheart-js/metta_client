enum FeedbackStatus {
    Confirmation = 'confirmation',
    Resolved = 'Resolved',
    Rejected = 'Rejected',
}

export interface IFeedback {
    email: string;
    subject: string;
    content: string;
    status?: FeedbackStatus;
}
