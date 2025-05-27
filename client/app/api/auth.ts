import { User } from "@/types";
import { apiClient } from "./apiClient";

const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.get<User[]>(`/users?username=${email}`);

    const users = response.data;

    if (users.length === 0) {
      return {
        statusText: "error",
        error: "User not found",
      };
    }

    const user = users[0];

    if (user.password !== password) {
      return {
        statusText: "error",
        error: "Invalid password",
      };
    }

    return {
      statusText: "success",
      data: {
        user,
        token: "mock-token-123", 
      },
    };
  } catch (error: any) {
    return {
      statusText: "error",
      error: error?.message || "Login failed",
    };
  }
};

export default {
  login,
};
