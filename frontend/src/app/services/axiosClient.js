import { createAxiosClient } from "./createAxiosClient";
import {Cookies} from "js-cookie"
const REFRESH_TOKEN_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/userRoutes/refresh-token`;
const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/`;

function getCurrentAccessToken() {
    let accessToken = sessionStorage.getItem("accessToken")
    return accessToken;
}

function getCurrentRefreshToken() {
    let refreshToken = sessionStorage.getItem("refreshToken");
    return refreshToken;
}


export function setRefreshedTokens(tokens){
    console.log('set refresh tokens...')
    // const login = useAuthStore.getState().login
    // login(tokens)
    sessionStorage.setItem("accessToken", tokens.accessToken);
    sessionStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("role", tokens.role);
    Cookies.set('role', tokens.role);
}

export async function logout(){
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    Cookies.remove('role');
}


export const axiosClient = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    getCurrentAccessToken,
    getCurrentRefreshToken,
    refreshTokenUrl: REFRESH_TOKEN_URL,
    logout,
    setRefreshedTokens
})
