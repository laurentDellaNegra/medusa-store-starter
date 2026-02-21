export const getBaseURL = () => {
  return import.meta.env.PUBLIC_BASE_URL || "http://localhost:8001"
}
