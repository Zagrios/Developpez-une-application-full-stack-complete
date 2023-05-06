export interface Topic {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    subscribed: boolean;
}