export interface GitlabProject {
    id: number;
    description: string;
    name: string;
    name_with_namespace: string;
    path: string;
    path_with_namespace: string;
    created_at: string;
    default_branch: string;
    tag_list: string[];
    topics: string[];
    ssh_url_to_repo: string;
    http_url_to_repo: string;
    web_url: string;
    readme_url: string;
    forks_count: number;
    avatar_url: string | null;
    star_count: number;
    last_activity_at: string;
    namespace: {
        id: number;
        name: string;
        path: string;
        kind: string;
        full_path: string;
        parent_id: number | null;
        avatar_url: string;
        web_url: string;
    };
    repository_storage: string;
    container_registry_image_prefix: string;
    _links: {
        self: string;
        issues: string;
        merge_requests: string;
        repo_branches: string;
        labels: string;
        events: string;
        members: string;
        cluster_agents: string;
    };
    packages_enabled: boolean;
    empty_repo: boolean;
    archived: boolean;
    visibility: string;
    owner: {
        id: number;
        username: string;
        name: string;
        state: string;
        locked: boolean;
        avatar_url: string;
        web_url: string;
    };
}