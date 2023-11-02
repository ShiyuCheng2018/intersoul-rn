import {EndPoint} from "./types/requestTypes";

export default {
    emailPasswordLogin: ():EndPoint =>({
        url: "http://127.0.0.1:8080/auth/login",
        isProtected: false,
        contentType: { "Content-Type":"application/json" },
    }),
    emailPasswordSignUp: ():EndPoint =>({
        url: "http://127.0.0.1:8080/auth/signup",
        isProtected: false,
        contentType: { "Content-Type":"application/json" },
    }),

}
