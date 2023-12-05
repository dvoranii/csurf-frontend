import { useState } from "react";
import { useCsrfToken } from "./hooks/useCSRF";
import { useRecaptcha } from "./hooks/useReCAPTCHA";
import sanitizeInput from "./utils/sanitizeInput";

function App() {
  const csrfToken = useCsrfToken();
  const recaptchaToken = useRecaptcha(
    "6LecdSIpAAAAAN-xfoG0bDQlO-97NHbDLnmAC-D1"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedData = {
      name: sanitizeInput.text(formData.name),
      email: sanitizeInput.email(formData.email),
      message: sanitizeInput.text(formData.message),
    };
    try {
      const response = await fetch("http://localhost:5000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({ ...sanitizedData, recaptchaToken }),
        credentials: "include",
      });
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error in POST request:", error);
    }
  };

  return (
    <div>
      <h1>React CSRF Demo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
