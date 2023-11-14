import {EndPoint, ErrorMessageType} from "./types/requestTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DispatchProp} from "react-redux";


const updateAccessToken = (token:string) => ({
    type: "APP|[UPDATE]|UPDATE_ACCESS_TOKEN",
    payload: token
});

let requestHeaders = new Headers();
requestHeaders.append("Accept", "application/json");

async function get(endpoint: EndPoint, dispatch:DispatchProp): Promise<Response> {
    const jwt = await AsyncStorage.getItem('InterSoul_jwt_token');
    return fetch(endpoint.url, {
        method: "GET",
        // @ts-ignore
        headers:{
            ...endpoint.contentType,
            Accept: "application/json",
            Authorization: endpoint.isProtected ? `Bearer ${jwt}` : null,
        },
    }).then((res) => {
        // console.log("[GET]: ", res);
        return handleResponse(res, endpoint.url, dispatch);
    });
}

async function post(endpoint: EndPoint, data: any, dispatch:DispatchProp) {
    console.log(data);
    const jwt = await AsyncStorage.getItem('InterSoul_jwt_token');
    console.log("jwt: ", jwt)
    return fetch(endpoint.url, {
        method: "POST",
        // @ts-ignore
        headers:{
            ...endpoint.contentType,
            Accept: "application/json",
            Authorization: endpoint.isProtected ? `Bearer ${jwt}` : null,
        },
        body: data,
    }).then((res) => {
        console.log("[POST]: ", res);
        return handleResponse(res, endpoint.url, dispatch);
    });
}

async function put(endpoint: EndPoint, data: any, dispatch:DispatchProp) {
    console.log(data);
    const jwt = await AsyncStorage.getItem('InterSoul_jwt_token');
    console.log("jwt: ", jwt)
    return fetch(endpoint.url, {
        method: "PUT",
        // @ts-ignore
        headers:{
            ...endpoint.contentType,
            Accept: "application/json",
            Authorization: endpoint.isProtected ? `Bearer ${jwt}` : null,
        },
        body: data,
    }).then((res) => {
        console.log("[POST]: ", res);
        return handleResponse(res, endpoint.url, dispatch);
    });
}

async function deleteRequest(endpoint: EndPoint,data:any, dispatch: DispatchProp) {
    const jwt = await AsyncStorage.getItem('InterSoul_jwt_token');
    console.log("jwt: ", jwt);

    return fetch(endpoint.url, {
        method: "DELETE",
        headers:{
            ...endpoint.contentType,
            Accept: "application/json",
            Authorization: `Bearer ${jwt}`
        },
    }).then((res) => {
        console.log("[DELETE]: ", res);
        return handleResponse(res, endpoint.url, dispatch);
    });
}

async function handleResponse(response: Response, URL: String, dispatch:any) : Promise<any|ErrorMessageType> {
    console.log("[url] ", URL, response.status)
    if (200 === response.status) {
        let data = await response.json();
        const newAccessToken = response.headers.get('X-New-Access-Token');
        if (newAccessToken) {
            await AsyncStorage.setItem('InterSoul_jwt_token', newAccessToken);
            dispatch(updateAccessToken(newAccessToken));
        }
        return Promise.resolve(data);
    }
    console.error(`Request failed. URL= ${URL}`);
    let errorMessage = await response.text();
    return Promise.reject({
        code: response.status,
        message: errorMessage ?? "Request failed due to your network error, please try later.",
        error: errorMessage ?? "Request failed due to your network error, please try later.",
    });
}

export {get, post, put, deleteRequest};
