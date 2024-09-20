import { apiClient } from "../api.instance";

/**
 * Create new repo record
 */
export const createRepo = async (params: any): Promise<any> => {
    try {
        const response = await apiClient.post("/repos/create", params);
        return response.data;
    } catch (error) {

        console.error("Error fetching repos:", error);
        return null;
    }
}

/**
 * Find all repos by user_id
 */
export const findAllRepos = async (params: any): Promise<any> => {
    try {
        const response = await apiClient.post("/repos/all", params);
        return response.data;
    } catch (error) {

        console.error("Error fetching repos:", error);
        return null;
    }
}

/**
 * Delete repo by id
 */
export const deleteRepo = async (params: any): Promise<any> => {
    try {
        const response = await apiClient.post("/repos/delete", params);
        return response.data;
    } catch (error) {

        console.error("Error deleting repos:", error);
        return null;
    }
}