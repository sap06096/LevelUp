import {LoginArgs, userType} from '../types/user.ts';
import {ApiResponse} from "../types/response.ts";
import {api} from "../axios.ts"

// 로그인 요청 액션 함수
export const loginAction = async (args: LoginArgs) => {
    try {
        const res = await api.get('/api/users/login', {
            params: args,
        });
        return res.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
};

export const signUpAction = async <T = any>(arg: userType) => {
    try{
        const res = await api.post('/api/users/signUp', arg);
        return res.data;
    }catch (e) {
        console.error(e);
        throw e;
    }
}


// duplicationIdAction 수정
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

export const createUserAction = async <T = any>(postData: userType): Promise<ApiResponse<T>> => {
    try{
        const res = await api.post('/api/users/user', postData);
        return res.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}