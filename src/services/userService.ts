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
                console.log(resp.data.token);
                document.cookie = `token=${resp.data.token}`;
            })
            .catch((err) => {
                return err;
            });
    }

    static async register(username: string, email: string, password: string) {
        API.post("/User/register", { username, email, password })
            .then((resp) => {
                document.cookie = `token=${resp.data.token}`;
            })
            .catch((err) => {
                alert(err);
            });
    }

    static async logout() {
        document.cookie = `token=${GlobalFunctions.getCookie("token")};  max-age=-1; path=/`;
        GlobalFunctions.Redirection("/login");
    }
}
