import axios from "axios";
const testURL = 'http://localhost:9090';

// API 클라이언트 생성
export const api = axios.create({
    baseURL: testURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // CORS를 위해 필요할 수 있음
});

// api.interceptors.request.use((config) => {
//     // 요청을 보낼 때마다 토큰을 인자로 받아서 설정할 수 있도록 수정
//     // @ts-ignore
//     const userToken = config.headers?.Authorization?.replace('Bearer ', ''); // 기존 토큰을 가져올 수 있음
//     if (userToken) {
//         config.headers.Authorization = `Bearer ${userToken}`;
//     }
//     return config;
// });
