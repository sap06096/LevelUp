import React, {useEffect, useState} from "react";
import {categoryStore, categoryType} from "../zustand/store.ts";
import {getCategoryAction} from "../api/productActions.ts";
import _ from "lodash";

const registerProduct:React.FC = () => {
    // const [productName, setProductName] = useState("");
    // const [price, setPrice] = useState("");
    // const [stock, setStock] = useState("");
    // const [description, setDescription] = useState("");

    const category = categoryStore();

    const handleSubmit = (e:any) => {
        e.preventDefault();
        // console.log({ productName, price, stock, description });
    };

    const [searchData, setSearchData] = useState({
        id: 0,
        level: 1,
    });

    const [categoryListByLevelOne, setCategoryListByLevelOne] = useState<categoryType[]>([]);
    const [categoryListByLevelTwo, setCategoryListByLevelTwo] = useState<categoryType[]>([]);
    const [categoryListByLevelThree, setCategoryListByLevelThree] = useState<categoryType[]>([]);

    const [choiceCategory, setChoiceCategory] = useState<categoryType[]>([]);

    const choiceDepth = async (category:categoryType, level:number) => {
        console.log(category);
        setChoiceCategory([...choiceCategory, category]);
        console.log(choiceCategory);

        const newSearchData = {
            id: category.id,
            level: category.level + 1,
        };

        setSearchData(newSearchData); // 상태도 업데이트
        console.log("newSearchData:", newSearchData);

        if(category.level == 3){
            return;
        }

        switch (level) {
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
        }


        const res = await getCategoryAction<categoryType[]>(newSearchData);
        console.log(res);
        if (res.result === 0 && Array.isArray(res.data) && res.data.length > 0) {
            console.info("result success");
            switch (category.level) {
                case 1:
                    setCategoryListByLevelTwo(res.data);
                    break;
                case 2:
                    setCategoryListByLevelThree(res.data);
                    break;
            }
        }else{
            console.info("result failed");
        }
    }

    useEffect(() => {
        // 비동기 함수 호출 및 상태 업데이트
        const getCategoryList = async () => {
            try {
                console.log("카테고리 가져오기");
                const res = await getCategoryAction<categoryType[]>(searchData);
                console.log(res);
                if (res.result === 0 && Array.isArray(res.data) && res.data.length > 0) {
                    console.info("result success");
                    setCategoryListByLevelOne(res.data);
                }else{
                    console.info("result failed");
                }
            }catch (e) {
                console.log(e);
            }
        }

        getCategoryList();
    }, [])

    return (
        <>
            <div className={"w-full"} style={{paddingBottom: "55px"}}>
                <div className={"w-full border-b border-t"}>
                    <div className={"paddingBox w-full"}>
                        <div className={"flex justify-start py-5 font-bold"}>
                            <div className={"pr-5 font-bold"}>상품등록</div>
                            <div className={"border-l border-gray-300"}></div>
                            <div className={"px-5"}>상품관리</div>
                            <div className={"border-l border-gray-300"}></div>
                            <div className={"px-5"}>구매/판매 내역</div>
                        </div>
                    </div>
                </div>
                <div className={"w-full paddingBox"}>
                    <div className={"flex border-b-4 justify-start py-7 text-3xl"}>
                        상품정보
                    </div>
                    <div className="flex justify-start bg-white">
                        <form onSubmit={handleSubmit} className="w-full font-bold">
                            <div className={"flex py-10 border-b"}>
                                <div className={"flex justify-start"} style={{width: '13%'}}>
                                    상품등록(0/12)
                                </div>
                                <div className={"flex justify-start border"}>
                                    <label htmlFor="fileInput" className="cursor-pointer">
                                        <img src={"/imgs/register_img.png"} alt="이미지 등록 로고"/>
                                    </label>
                                    <input id="fileInput" type="file" className="hidden"/>
                                </div>
                            </div>

                            <div className={"flex py-10 border-b"}>
                                <div className={"flex justify-start"} style={{width: '13%', alignItems: 'center'}}>
                                    상품명
                                </div>
                                <div className={"flex justify-start"} style={{width: '87%'}}>
                                    <input type="text"
                                           className={"w-full p-5 outline outline-1 outline-gray-400"}
                                           placeholder={"상품명을 입력해 주세요."}/>
                                </div>
                            </div>

                            <div className={"flex py-10 border-b"}>
                                <div className={"flex justify-start"} style={{width: '13%', alignItems: 'center'}}>
                                    카테고리
                                </div>
                                <div className={"block"} style={{width: '87%'}}>
                                    <div
                                        className={`flex w-full border-2 ${choiceCategory.length > 0 ? 'border-orange-300' : 'border-gray-300'}`}
                                        style={{height: '300px'}}>
                                        <div className={"flex w-4/12 border-r justify-center"}>
                                            <div className={"w-full py-3"}>
                                                {
                                                    categoryListByLevelOne.length > 0 ? (
                                                        categoryListByLevelOne.map((category: categoryType) => {
                                                            return (
                                                                <div
                                                                    className={`w-full flex justify-start px-7 py-3 clickAble hover:bg-gray-700 cursor-pointer ${!_.isEmpty(choiceCategory[0]) ? (choiceCategory[0].id == category.id ? 'active' : '') : ''}`}
                                                                    key={category.id}
                                                                    onClick={() => {
                                                                        choiceDepth(category, 1)
                                                                    }}>
                                                                    {category.name}
                                                                </div>
                                                            )
                                                        })
                                                    ) : (
                                                        <div
                                                            className={"w-full h-full flex justify-center text-gray-400"}
                                                            style={{alignItems: 'center'}}>리스트가 없음</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className={"flex w-4/12 border-r justify-center text-center"}>
                                            <div className={"w-full py-3"}>
                                                {
                                                    categoryListByLevelTwo.length > 0 ? (
                                                        categoryListByLevelTwo.map((category: categoryType) => {
                                                            return (
                                                                <div
                                                                    className={`w-full flex justify-start px-7 py-3 clickAble hover:bg-gray-700 cursor-pointer ${!_.isEmpty(choiceCategory[1]) ? (choiceCategory[1].id == category.id ? 'active' : '') : ''}`}
                                                                    key={category.id}
                                                                    onClick={() => {
                                                                        choiceDepth(category, 2)
                                                                    }}>{category.name}</div>
                                                            )
                                                        })
                                                    ) : (
                                                        <div
                                                            className={"w-full h-full flex justify-center text-gray-400"}
                                                            style={{alignItems: 'center'}}>중분류 선택</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className={"flex w-4/12 justify-center text-center"}>
                                            <div className={"w-full py-3"}>
                                                {
                                                    categoryListByLevelThree.length > 0 ? (
                                                        categoryListByLevelThree.map((category: categoryType) => {
                                                            return (
                                                                <div
                                                                    className={`w-full flex justify-start px-7 py-3 clickAble hover:bg-gray-700 cursor-pointer ${!_.isEmpty(choiceCategory[2]) ? (choiceCategory[2].id == category.id ? 'active' : '') : ''}`}
                                                                    key={category.id}
                                                                    onClick={() => {
                                                                        choiceDepth(category, 3)
                                                                    }}>{category.name}</div>
                                                            )
                                                        })
                                                    ) : (
                                                        <div
                                                            className={"w-full h-full flex justify-center text-gray-400"}
                                                            style={{alignItems: 'center'}}>소분류 선택</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        choiceCategory.length > 0 && choiceCategory.length < 3 ? (
                                            <div className={"flex justify-start mt-3 iMPvsn"}><i
                                                className="bi bi-slash-circle"></i>&nbsp;상세
                                                카테고리를 선택해주세요</div>
                                        ) : ('')
                                    }
                                    <div className={"w-full py-4 flex justify-start gMPvsn"}
                                         style={{alignItems: "center"}}>
                                        선택한 카테고리 : {
                                        choiceCategory.length > 0 ? (
                                            choiceCategory.length == 1 ? choiceCategory[0].name + '>' :
                                                choiceCategory.length == 2 ? choiceCategory[0].name + '>' + choiceCategory[1].name + '>' :
                                                    choiceCategory[0].name + '>' + choiceCategory[1].name + '>' + choiceCategory[2].name
                                        ) : ''
                                    }
                                    </div>
                                </div>
                            </div>

                            <div className={"flex py-10 border-b"}>
                                <div className={"flex justify-start"} style={{width: '13%', alignItems: 'center'}}>
                                    상품상태
                                </div>
                                <div className={"flex justify-start"} style={{width: '87%'}}>

                                    <div className="flex flex-col space-y-5 w-full">
                                        <label className="flex items-start space-x-2 cursor-pointer">
                                            <input type="radio" name="condition" value="new" className="mt-1"/>
                                            <div className={"flex justify-start space-x-2"}
                                                 style={{alignItems: "center"}}>
                                                <span className="font-semibold">새 상품 (미사용)</span>
                                                <span className="text-sm text-gray-500">사용하지 않은 새 상품</span>
                                            </div>
                                        </label>

                                        <label className="flex items-start space-x-2 cursor-pointer">
                                            <input type="radio" name="condition" value="noTrace" className="mt-1"/>
                                            <div className={"flex justify-start space-x-2"}
                                                 style={{alignItems: "center"}}>
                                                <span className="font-semibold">사용감 없음</span>
                                                <span className="text-sm text-gray-500">사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음</span>
                                            </div>
                                        </label>

                                        <label className="flex items-start space-x-2 cursor-pointer">
                                            <input type="radio" name="condition" value="lightUse" className="mt-1"/>
                                            <div className={"flex justify-start space-x-2"}
                                                 style={{alignItems: "center"}}>
                                                <span className="font-semibold">사용감 적음</span>
                                                <span className="text-sm text-gray-500">눈에 띄는 흔적이나 얼룩이 약간 있음</span>
                                            </div>
                                        </label>

                                        <label className="flex items-start space-x-2 cursor-pointer">
                                            <input type="radio" name="condition" value="heavyUse" className="mt-1"/>
                                            <div className={"flex justify-start space-x-2"}
                                                 style={{alignItems: "center"}}>
                                                <span className="font-semibold">사용감 많음</span>
                                                <span className="text-sm text-gray-500">눈에 띄는 흔적이나 얼룩이 많이 있음</span>
                                            </div>
                                        </label>

                                        <label className="flex items-start space-x-2 cursor-pointer">
                                            <input type="radio" name="condition" value="broken" className="mt-1"/>
                                            <div className={"flex justify-start space-x-2"}
                                                 style={{alignItems: "center"}}>
                                                <span className="font-semibold">고장/파손 상품</span>
                                                <span
                                                    className="text-sm text-gray-500">기능 이상이나 외관 손상 등으로 수리/수선 필요</span>
                                            </div>
                                        </label>
                                    </div>

                                </div>
                            </div>

                            <div className={"flex py-10 border-b"}>
                                <div className={"flex justify-start"} style={{width: '13%', alignItems: 'center'}}>
                                    사이즈
                                </div>
                                <div className={"flex justify-start"} style={{width: '87%'}}>
                                    <select className={"p-3 border border-gray-300"} style={{width: '15vw'}}>
                                        <option>사이즈를 선택해 주세요</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </div>
                            </div>

                            <div className={"flex py-10 border-b"}>
                                <div className={"flex justify-start"} style={{width: '13%', alignItems: 'center'}}>
                                    설명
                                </div>
                                <div className={"flex justify-start"} style={{width: '87%'}}>
                                    <input type="text"
                                           className={"w-full p-5 outline outline-1 outline-gray-400"}
                                           placeholder={"상품명을 입력해 주세요."}/>
                                </div>
                            </div>

                            <div className={"flex py-10 border-b"}>
                                <div className={"flex justify-start"} style={{width: '13%', alignItems: 'center'}}>
                                    태그<span className={"text-gray-400"}>(선택)</span>
                                </div>
                                <div className={"flex justify-start"} style={{width: '87%'}}>
                                    <input type="text"
                                           className={"w-full p-5 outline outline-1 outline-gray-400"}
                                           placeholder={"상품명을 입력해 주세요."}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <footer className="w-full fixed bottom-0 left-0 right-0 bg-gray-400 p-4">
                <div className="w-full flex justify-between items-center">
                    <div className="w-7/12"></div>
                    <div className="w-5/12 flex justify-start space-x-10">
                        <button className="bg-white px-4 py-2 rounded">임시저장</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">등록하기</button>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default registerProduct;