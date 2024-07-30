import { createAxiosClient } from "./createAxiosClient";

const REFRESH_TOKEN_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/userRoutes/refresh-token`;
const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/`;

function getCurrentAccessToken() {
    let accessToken = sessionStorage.getItem("accessToken")
}

function getCurrentRefreshToken() {
    let refreshToken = sessionStorage.getItem("refreshToken");
}


export function setRefreshedTokens(tokens){
    console.log('set refresh tokens...')
    // const login = useAuthStore.getState().login
    // login(tokens)
    sessionStorage.setItem("accessToken", tokens.accessToken);
    sessionStorage.setItem("refreshToken", tokens.refreshToken);
}

async function logout(){
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
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
