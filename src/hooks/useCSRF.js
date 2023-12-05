import { useState, useEffect } from "react";

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/csrf", {
          credentials: "include",
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    if (!csrfToken) {
      fetchCsrfToken();
    }
  }, [csrfToken]);

  return csrfToken;
};
