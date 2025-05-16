import { fetcherPost } from "../utils/axios";

// API endpoints related to authentication
export const endpoints = {
  key: "auth",
  registration: "/registration",
};

// Function to register a new user
export async function registrationFunc(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.registration,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}
