import {create} from 'zustand';
import {userType} from "../types/user.ts";
import { persist } from "zustand/middleware";

// 상태의 타입 정의
interface type {
    userDto: userType;
    setUser: (newUser: userType) => void;
    getUser: () => userType;
    updateUserField: (field: keyof userType, value: any) => void;
    clearUser: () => void;
    saveUserToStorage:(userToken: string)=>void;
}

interface TabType {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    getActiveTab: () => string;
}

const userDto:userType = {
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
    decodePhoneNumber: '',
    encodePhoneNumber: '',
    expireDate: '',
    id: 0,
    jwtAccessToken: '',
    userToken: ''
}

// Zustand 스토어 생성
const userStore = create<type>((set, get) => ({
    userDto: { ...userDto},
    setUser: (user) => set(() => ({userDto: user })),
    getUser: () => {
        const user:userType =  get().userDto;
        return user;
    },
    updateUserField: (field, value) => {
        set((state) => {
            if (state.userDto) {
                return {
                    userDto: { ...state.userDto, [field]: value },
                };
            }
            return state; // 상태를 그대로 반환
        });
    },
    clearUser: ()=>{
        set(()=> ({ userDto: {...userDto} }));
        localStorage.removeItem('US_TK');
    },
    saveUserToStorage: (userToken) => {
        if(userToken){
            localStorage.setItem('US_TK', userToken);
        }
    },

}));

const tabList: string[] = ['home', 'registerProduct', 'myProducts', 'messenger'];

export const tabStore = create<TabType>()(
    persist<TabType>(
        (set, get) => ({
            activeTab: tabList[0],
            setActiveTab: (tab: string) => set({ activeTab: tab }),
            getActiveTab: () => get().activeTab,
        }),
        {
            name: "zustand-storage", // localStorage에 저장될 key
        }
    )
);

export type categoryType = {
    id: number;
    name: string;
    parent_id: number| undefined;
    level: number;
    sort_order: number | undefined;
}

interface CategoryType {
    categoryDto: categoryType;
    getCategory: () => categoryType;
    setCategory: (newCategory: categoryType) => void;
}

const categoryDto:categoryType = {
    id: 0,
    name: '',
    parent_id: undefined,
    level: 1,
    sort_order: undefined
}

export const categoryStore = create<CategoryType>((set, get)=> ({
    categoryDto: {...categoryDto},
    setCategory: (category) => set(() => ({categoryDto: category })),
    getCategory: () => {
        const category:categoryType = get().categoryDto;
        return category;
    },
}));

export default userStore;
