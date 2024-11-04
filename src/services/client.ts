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

apiClient.axiosInstance.interceptors.response.use(
  (response: any) => {
    console.log("Request success", response.data);
    if(response.data.status === "Failed"){
      console.log("Entered failed")
      throw new Error(response?.data);
    }

    return response;
  },
  (error) => {
    console.log("Request error", error);
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized request - token might be invalid.");
      // Redirect to login
      window.location.href = '/';
    } else if (error.response && error.response.status >= 500) {
      console.error("Server error detected");
      // Redirect to custom error page
      window.location.href = '/ServerError';
    }else{
      // Reject the error so it can be handled in the calling code
      console.log("Rejection mode", error.response.data)
      return Promise.reject(error.response);
    }
  }
);

export default apiClient;
