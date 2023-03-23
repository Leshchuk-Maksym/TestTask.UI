import { createBrowserHistory, History } from "history";
import { JwtClaims } from "../models/JwtClaims";
import jwt from "jwt-decode";

export default class GlobalFunctions {
    private static history: History = createBrowserHistory();

    static Redirection = (to: string) => {
        this.history.push(to);
        this.history.go(0);
    };

    static getCookie(name: string) {
        let matches = document.cookie.match(
            new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
            )
        );
        return matches ? decodeURIComponent(matches[1]) : null;
    }

    static getCred = () => {
        let token = GlobalFunctions.getCookie("token");
        if (token === null) {
            return [null];
        }
        let decodedJwt: JwtClaims = jwt<JwtClaims>(token);
        console.log(decodedJwt);
        return [decodedJwt.unique_name, decodedJwt.nameid];
    };
}
