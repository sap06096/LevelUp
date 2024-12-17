// 로그인 관련 타입 정의
export type loginType = {
    loginId: string;
    loginPwd: string;
}

export interface userType {
    loginId: string,
    loginPwd: string,
    name: string,
    age: string,
    gender: number,
    email: string,
    status: object,
    phoneNumber: string,
    snsToken?: string,
    snsKind: object,
    regDate: string,
    decodePhoneNumber: string,
    encodePhoneNumber: string,
    expireDate: string,
    id: number,
    jwtAccessToken: string,
    userToken: string,
}

export type stateType = {
    value: number,
    status: string,
}