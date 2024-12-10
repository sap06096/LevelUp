import axios from "axios";
const testURL = 'http://localhost:9090';

// API 클라이언트 생성
export const api = axios.create({
    baseURL: testURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});


