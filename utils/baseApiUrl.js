const baseApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://rocky-hollows-66550.herokuapp.com"
    : "https://rocky-hollows-66550.herokuapp.com";

export default baseApiUrl;
