import { AxiosInstance, InternalAxiosRequestConfig, AxiosAdapter, AxiosResponse } from "axios";
import ping from "./mocks/ping";

// 首先定义一个 MockHandler 类型
type MockHandler = (response: AxiosResponse) => AxiosResponse;

// 定义路由映射接口
interface MockRouteMap {
    [key: string]: MockHandler;
}

const mockServiceRouter:MockRouteMap = {
    "/ping": ping,
}

const mockAdapter: AxiosAdapter = (config: InternalAxiosRequestConfig) => {  
    return new Promise((resolve, reject) => {
        let response: AxiosResponse = {
            data: null,
            status: 200,
            statusText: 'OK',
            headers: { 'content-type': 'application/json' },
            config,
            request: {}
          };
        if (config.url) {
            const handler = mockServiceRouter[config.url];
            if (handler) {
                response = handler(response);
                resolve(response);
            } else {
                reject(new Error(`No mock handler found for URL: ${config.url}`));
            }
        } else {
            reject(new Error('Not found'));
        }
    });
}

function mockitup(apiClient:AxiosInstance):AxiosInstance {
    apiClient.defaults.adapter = mockAdapter;
    return apiClient;
}

export default mockitup;