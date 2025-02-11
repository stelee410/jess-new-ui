import { AxiosResponse } from "axios";


export default function ping(response: AxiosResponse) {
    response.data = "pong";
    return response;
}