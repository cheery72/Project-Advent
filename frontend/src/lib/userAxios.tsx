import Axios from "axios";

const API_URL = "http://k6c2061.p.ssafy.io:8000/auth-server";
var TOKEN_VALUE: any = null;

if (typeof window !== "undefined") TOKEN_VALUE = localStorage.getItem("token");

const userAxios = Axios.create({
  baseURL: `${API_URL}`,
  headers: { Authorization: `Bearer ${TOKEN_VALUE}` },
});

export default userAxios;
