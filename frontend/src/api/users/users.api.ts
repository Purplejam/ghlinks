import { apiClient } from "../api.instance";

/**
 * Register new user
 */
export const createUser = async (params: any): Promise<any> => {
    try {
        const response = await apiClient.post("/users/create", params);
        return response.data;
    } catch (error) {

        console.error("Error fetching users:", error);
        return null;
    }
}

/**
 * Login user
 */
export const loginUser = async (params: any): Promise<any> => {
    try {
        const response = await apiClient.post("/users/login", params);
        return response.data;
    } catch (error) {

        console.error("Error fetching users:", error);
        return null;
    }
}

/**
 * Get current user credentials
 */
export const getMySelf = async (): Promise<any> => {
    try {
        const response = await apiClient.post("users/get-myself");
        return response.data;
    } catch (error) {

        console.error("Error fetching users:", error);
        return null;
    }
}