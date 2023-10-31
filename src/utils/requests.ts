import {EndPoint, ErrorMessageType} from "./types/requestTypes";

let requestHeaders = new Headers();
requestHeaders.append("Accept", "application/json");

function get(endpoint: EndPoint): Promise<Response> {
    return fetch(endpoint.url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).then((res) => {
        // console.log("[GET]: ", res);
        return handleResponse(res, endpoint.url);
    });
}

function post(endpoint: EndPoint, data: any) {
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
        return handleResponse(res, endpoint.url);
    });
}

async function handleResponse(response: Response, URL: String) : Promise<any|ErrorMessageType> {
    console.log("[url] ", URL, response.status)
    console.log(response)

    if (200 === response.status) {
        let data = await response.json();
        return Promise.resolve(data);
    } else {

        console.error(`Request failed. URL= ${URL}`);
        let data = await response.text();
        return Promise.reject({
            code: response.status,
            message: data ?? "Request failed due to your network error, please try later.",
            error: "Request failed due to your network error, please try later.",
        });
    }
}

export {get, post};
