import DOMPurify from "dompurify";

const sanitizeInput = {
  text: (input) => DOMPurify.sanitize(input),
  email: (input) => DOMPurify.sanitize(input),
};

export default sanitizeInput;
