const settingsUrl = `${baseUrl}/api/v1/settings`;
const makeAuthenticatedRequest = (url, method = "GET", data = null) => {
  const token = getToken();
  if (token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    return axios({
      method,
      url,
      headers,
      data: data ? JSON.stringify(data) : null,
    })
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
          return data;
        } else {
          throw new Error("Request failed");
        }
      })
      .catch((error) => {
        throw error;
      });
  } else {
    throw new Error("No token available");
  }
};
try {
  makeAuthenticatedRequest(settingsUrl)
    .then((response) => {
      const submissionOpen = response.data.submission_open;
      const landingPartDoneSection = document.getElementById("landingPartBtn");
      if (submissionOpen) {
        landingPartDoneSection.style.display = "flex";
      } else {
        landingPartDoneSection.style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Authenticated Request failed:", error);
    });
} catch (error) {
  console.error("Token is not available:", error);
}
