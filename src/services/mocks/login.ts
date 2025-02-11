import { AxiosResponse } from "axios";


export default function login(response: AxiosResponse) {
    if (response.request.username === "super" && response.request.password === "super") {
        response.status = 200;
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
        response.data = {
            token: token,
            user: {
                id: 1,
                name: "Stephen",
                email: "stephen@linkyun.co"
            }
        }
        const cookieOptions = [
            'token=' + token,
            'name=Stephen',
            'email=stephen@linkyun.co',
            'id=1',
            'Path=/',
            'Max-Age=604800',  // 7天 = 7 * 24 * 60 * 60 秒
            'SameSite=Strict'
          ];
        response.headers = {
            ...response.headers,
            'Set-Cookie': cookieOptions.join('; ')
          };
        response.status = 200;
        response.statusText = 'OK';
    } else {
        response.status = 401;
        response.data = {
            error: "invalid username or password"
        }
    }
    return response;
}