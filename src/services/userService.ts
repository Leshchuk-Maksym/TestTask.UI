import axios from "axios";
import { API } from "../axios/axiosInstance";
import { TokenResponse } from "../models/TokenResponse";
import GlobalFunctions from "./globalFuntions";

export default class UserService {
    static async login(username: string, password: string) {
        await API.post("User/login", {
            username: username,
            password: password,
        })
            .then((resp) => {
                document.cookie = `token=${resp.data.token}`;
            })
            .catch((err) => {
                alert(err.response.data);
            });
        GlobalFunctions.Redirection("/tests");
    }

    static async register(username: string, email: string, password: string) {
        await API.post("/User/register", { username, email, password })
            .then((resp) => {
                document.cookie = `token=${resp.data.token}`;
            })
            .catch((err) => {
                alert(err.response.data);
            });
        GlobalFunctions.Redirection("tests");
    }

    static async logout() {
        document.cookie = `token=${GlobalFunctions.getCookie("token")};  max-age=-1; path=/`;
        GlobalFunctions.Redirection("/login");
    }
}
