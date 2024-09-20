/**
 * Repo entity from github API request
 */
export interface IGitHubRepo {
    id: number;
    user_id: number;
    html_url: string;
    full_name: string;
    stargazers_count: number;
    open_issues: string;
    forks_count: number;
    created_at: string;
    owner: {
        login: string;
    }
}

export interface ICreateParams {
    repo: IGitHubRepo;
    user_id: number;
}

export interface IAllParams {
    user_id: number;
}

export interface IDeleteParams {
    id: number;
    user_id: number;
}