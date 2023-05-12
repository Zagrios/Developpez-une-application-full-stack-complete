export interface CreatePostRequest {
    readonly title: string;
    readonly content: string;
    readonly topicId: number;
}