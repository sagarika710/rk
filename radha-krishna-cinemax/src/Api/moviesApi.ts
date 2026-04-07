import { apiGet } from "./apiService";


export const getNowShowingMovies = async () => {
  const data = await apiGet("/api/movies");
  return data.filter((movie: any) => movie.isNowShowing === true);
};

export const getMovies = async () => {
  return apiGet("/api/movies");
};
