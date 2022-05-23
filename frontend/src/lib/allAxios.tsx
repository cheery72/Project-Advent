import Axios from "axios";

const LOCAL_API_URL = "http://localhost:8080";
const SERVER_API_URL = "http://k6c2061.p.ssafy.io:8082";

const allAxios = Axios.create({
  baseURL: `${SERVER_API_URL}`,
});

export default allAxios;
