import * as OAuth from "oauth-1.0a"
import QueryStringUtils from "./queryString";

export default function request(oauth: OAuth, options: OAuth.RequestOptions, token: OAuth.Token | undefined = undefined) {
    var opt = {
        url: options.url,
        method: options.method,
        body: QueryStringUtils.encode(options.data),
        headers: {...oauth.toHeader(oauth.authorize(options, token)), "Content-Type": "application/x-www-form-urlencoded"}
    }
    if (options.method == "GET") {
        opt.url += "?" + opt.body
        delete opt.body
        delete opt.headers["Content-Type"]
    }
    return fetch(opt.url, opt)
}