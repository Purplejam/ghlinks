export interface IRepo {
    id: number;
    user_id: number;
    owner: string;
    project_url: string;
    project_name: string;
    stars: number;
    open_issues: string;
    forks: number;
    created_at: string;
}

export interface IRootState {
    isLoading: boolean;
    repos: IRepo[];
    name: string;
    isError: boolean;
    open: boolean;
}