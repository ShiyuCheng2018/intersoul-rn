import {EndPoint, ErrorMessageType} from "./types/requestTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DispatchProp} from "react-redux";


const updateAccessToken = (token:string) => ({
    type: "APP|[UPDATE]|UPDATE_ACCESS_TOKEN",
    payload: token
});

let requestHeaders = new Headers();
requestHeaders.append("Accept", "application/json");

function get(endpoint: EndPoint, dispatch:DispatchProp): Promise<Response> {
    return fetch(endpoint.url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).then((res) => {
        // console.log("[GET]: ", res);
        return handleResponse(res, endpoint.url, dispatch);
    });
}

function post(endpoint: EndPoint, data: any, dispatch:DispatchProp) {
    console.log(data);
    return fetch(endpoint.url, {
        method: "POST",
        // @ts-ignore
        headers:{
            ...endpoint.contentType,
            Accept: "application/json",
            Authorization: endpoint.isProtected ? `Bearer ${process.env.REACT_APP_PINATA_JWT}` : null,
        },
        body: data,
    }).then((res) => {
        console.log("[POST]: ", res);
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
    } else {

        console.error(`Request failed. URL= ${URL}`);
        let data = await response.json();
        return Promise.reject({
            code: response.status,
            message: data.message ?? "Request failed due to your network error, please try later.",
            error: data.errors ?? "Request failed due to your network error, please try later.",
        });
    }
}

export {get, post};
