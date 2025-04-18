import {loginType, userType} from '../types/user.ts';
import {ApiResponse} from "../types/response.ts";
import {api} from "../axios.ts"

// 로그인 요청 액션 함수
export const loginAction = async <T = any>(postData:loginType): Promise<ApiResponse<T>> => {
    try {
        const res = await api.post('/api/users/login', postData);
        return res.data;
    }catch (e) {
        console.error(e);
        throw e;
    }
};

// 아이디 중복체크
export const duplicationIdAction =  async <T = any>(loginId: string): Promise<ApiResponse<T>> => {
    try {
        const res = await api.get('/api/users/checkDuplicateId', {
            params: { loginId },
        });
        return res.data; // 반환 타입에 맞게 res.data 반환
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// 유저 생성
export const createUserAction = async <T = any>(postData: userType): Promise<ApiResponse<T>> => {
    try{
        const res = await api.post('/api/users/user', postData);
        return res.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getUserByUserToken = async <T = any>(userToken: string): Promise<ApiResponse<T>> => {
    try {
        const res = await api.get('/api/users/user/userToken', {
            params: {userToken}
        });
        return res.data;
    }catch (e) {
        console.error(e);
        throw e;
    }
}