const useApiKey = () => {
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    throw new Error("API Key is not defined in the environment variables.");
  }

  return apiKey;
};

export default useApiKey;
