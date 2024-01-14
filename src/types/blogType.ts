export interface IBlogData {
    _id?: string;
    admin_id?: string;
    author?: {
        fullname: string;
        authorEmail: string;
        _id: string;
    };
    category?: number;
    title?: string;
    summary?: string;
    thumbnail?: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
}
