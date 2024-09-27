export const getRepositories = async (page: number) => {
  const response = await fetch(`/api/repositories?page=${page}`);
  return response.json();
};
