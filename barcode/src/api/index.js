import axios from "axios";
import config from "../../config";

const API = axios.create({ baseURL: config.api });

export const addProduct = payload => API.post('/add-product', payload);