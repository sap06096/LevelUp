// 제네릭으로 추가 데이터 타입 정의
import {userType} from "./user.ts";

export type ApiResponse<T = any> = {
    data?: T, // 추가 데이터는 유동적
    result: number, // 0: 성공, 1: 실패 등
    desc: string // 응답 메시지
}

export type UserResponse = ApiResponse<userType>;
