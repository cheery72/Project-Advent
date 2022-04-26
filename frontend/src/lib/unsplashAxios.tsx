import Axios from "axios";

const API_URL = "https://api.unsplash.com";

const unsplashAxios = Axios.create({
  baseURL: `${API_URL}`,
  headers: { Authorization: `Client-ID ${process.env.NEXT_PUBLIC_API_URL}` },
});

export default unsplashAxios;