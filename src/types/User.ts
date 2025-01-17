interface Socials {
    homepage?: string
    ai_ml_interests?: string
    github_username?: string
    twitter_username?: string
    linkedin_profile?: string
}

export interface User {
    _id:string
    name: string
    firebase_uid: string
    username: string
    email: string
    socials: Socials
    display_photo?: string
    gitlab_id?: number
    gitlab_impersonation_token?:string
}