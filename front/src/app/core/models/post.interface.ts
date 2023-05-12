import { Topic } from "./topic.interface"
import { User } from "./user.interface"

export interface Post{
    readonly id: number,
    readonly title: string
    readonly content: string,
    readonly date: string,
    readonly author: User,
    readonly topic: Topic,
}