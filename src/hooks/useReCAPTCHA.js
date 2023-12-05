import { useState, useEffect } from "react";

export const useRecaptcha = (siteKey) => {
  const [recaptchaToken, setRecaptchaToken] = useState("");

  useEffect(() => {
    const handleLoaded = () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(siteKey, { action: "homepage" })
          .then((token) => {
            console.log(token);
            setRecaptchaToken(token);
          });
      });
    };

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.addEventListener("load", handleLoaded);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoaded);
      document.body.removeChild(script);
    };
  }, [siteKey]);

  return recaptchaToken;
};
