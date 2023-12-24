export interface IIssue {
    id: number;
    title: string;
    content: string; // Nội dung của bài viết, sau này sẽ trả ra từ file
    backgroundUrl: string;
    slug: string;
}

export interface IIssueCategory {
    categoryId: number;
    title: string;
    listData: IIssue[];
    type: string;
}
