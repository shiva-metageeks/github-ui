import { Project } from "./project";
import { User } from "./User";

export interface ICommon{
    _id:string
    gitlab_id: number
    name: string
    description: string
    likes: {
        count: number;
        users: Array<User['_id']>;
      };
    user: User
    created_at: Date
    license: string
    visibility: string
    repository:Project
}