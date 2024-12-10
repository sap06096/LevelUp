import { create } from 'zustand';
import {userType} from "../types/user.ts";

// 상태의 타입 정의
interface type {
    userDto: userType;
    setUser: (newUser: userType) => void;
    updateUserField: (field: keyof userType, value: any) => void;
    loadUserFromStorage:()=>void;
    saveUserToStorage:()=>void;
}

// Zustand 스토어 생성
const userStore = create<type>((set, get) => ({
    userDto: {
        loginId: '',
        loginPwd: '',
        name: '',
        age: '',
        gender: 0,
        email: '',
        status: {value: 0},
        phoneNumber: '',
        snsToken: '',
        snsKind: {value: 0},
        regDate: '',
    },
    setUser: (newUser) => set(() => ({userDto: newUser })),
    updateUserField: (field, value) => (
        set((state) => ({
            userDto: { ...state.userDto, [field]: value }, // 특정 필드만 업데이트
        }))
    ),
    loadUserFromStorage: () => {
        const storedUser = localStorage.getItem('userDto');
        if (storedUser) {
            set(() => ({ userDto: JSON.parse(storedUser) }));
        }
    },
    saveUserToStorage: () => {
        const user = get().userDto;
        localStorage.setItem('userDto', JSON.stringify(user));
    },

}));

export default userStore;
