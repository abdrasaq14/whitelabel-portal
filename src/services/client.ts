import { create } from "apisauce";

const apiClient = create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

apiClient.setHeaders({
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
  "Cache-Control": "no-store",
  "Referrer-Policy": "no-referrer",
  // "User-Agent": "WhitelabelPortal/1.0.0",
  // "X-CSRF-Token": "csrfToken",
});

// apiClient.addAsyncRequestTransform((request) => async () => {
//   const token = await frontStorage.getUserData("token");
//   if (token) {
//     request.headers["Authorization"] = "Bearer " + token;
//   }
// });

// apiClient.axiosInstance.interceptors.response.use(
//   (response) => {
//     // Handle successful responses here (optional logging, transformations, etc.)
//     console.log("Request successful", response);
//     return response;
//   },
//   (error) => {
//     // Handle error responses (like 401 Unauthorized)
//     if (error.response && error.response.status === 401) {
//       console.error("Unauthorized request - token might be invalid.");
//       // Optionally, handle token refresh or redirect to login page
//     } else if (error.response && error.response.status >= 500) {
//       console.error("Server error", error.response);
//       // Handle server errors here
//     }
//     // You can also retry requests here or add other error-handling logic
//     return Promise.reject(error); // Always reject the error
//   }
// );

export default apiClient;
