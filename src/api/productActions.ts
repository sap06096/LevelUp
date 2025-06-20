import {ApiResponse, CategoryResponse} from "../types/response.ts";
import {api} from "../axios.ts"
import {categoryType} from "../zustand/store.ts";

type PartialUser = Pick<categoryType, 'id' | 'level'>;

// 로그인 요청 액션 함수
export const getCategoryAction = async <T = CategoryResponse>(searchData:PartialUser): Promise<ApiResponse<T>> => {
    try {
        const res = await api.get('/api/products/category', {
            params: searchData
        });
        return res.data;
    }catch (e) {
        console.error(e);
        throw e;
    }
};