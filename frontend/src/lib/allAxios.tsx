import Axios from "axios";

const LOCAL_API_URL = "http://localhost:8080";
const SERVER_API_URL = "https://makeourspecial.day/api/advent-server";

const allAxios = Axios.create({
  baseURL: `${SERVER_API_URL}`,
});

export default allAxios;
