import "./global.css";
import { useState, useEffect } from "react";

function App() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      if (!csrfToken) {
        // Fetch only if csrfToken is not already set
        try {
          const response = await fetch("http://localhost:3000/form", {
            credentials: "include",
          });
          const data = await response.json();
          setCsrfToken(data.csrfToken);
        } catch (error) {
          console.error("Error fetching CSRF token:", error);
        }
      }
    };

    console.log(csrfToken);
    fetchCsrfToken();
  }, [csrfToken]); // Add csrfToken to the dependency array

  const handleSubmit = async () => {
    console.log(csrfToken);
    try {
      const response = await fetch("http://localhost:3000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      });
      const data = await response.text();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error in POST request:", error);
    }
  };

  return (
    <div>
      <h1>React CSRF Demo</h1>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
