import axios from "axios";
import config from "../config";

const API = axios.create({ baseURL: config.api });

export const uploadData = (payload) => API.post("/upload", payload);
