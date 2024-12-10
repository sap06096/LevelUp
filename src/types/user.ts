// 로그인 관련 타입 정의
export interface LoginArgs {
    username: string;
    password: string;
}

export interface userType {
    loginId: string,
    loginPwd: string,
    name: string,
    age: number,
    gender: number,
    email: string,
    status: object,
    phoneNumber: string,
    snsToken?: string,
    snsKind: object,
    regDate: string
}

export type stateType = {
    value: number,
    status: string,
}