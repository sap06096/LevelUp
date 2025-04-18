import React from "react";

const registerProduct:React.FC = () => {
    // const [productName, setProductName] = useState("");
    // const [price, setPrice] = useState("");
    // const [stock, setStock] = useState("");
    // const [description, setDescription] = useState("");

    const handleSubmit = (e:any) => {
        e.preventDefault();
        // console.log({ productName, price, stock, description });
    };

    return (
        <>
            <div className={"w-full"} style={{paddingBottom: "55px"}}>
                <div className={"w-full border-b border-t"}>
                    <div className={"px-80 w-full"}>
                        <div className={"flex justify-start py-5 font-bold"}>
                            <div className={"pr-5 font-bold"}>상품등록</div>
                            <div className={"border-l border-gray-300"}></div>
                            <div className={"px-5"}>상품관리</div>
                            <div className={"border-l border-gray-300"}></div>
                            <div className={"px-5"}>구매/판매 내역</div>
                        </div>
                    </div>
                </div>
                <div className={"px-80 w-full"}>
                    <div className={"flex border-b-4 justify-start py-7 text-3xl"}>
                        상품정보
                    </div>
                    <div className="flex justify-start bg-white shadow-md rounded-lg">
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
                                <div className={"flex justify-start"} style={{width: '87%'}}>
                                    <input type="text"
                                           className={"w-full p-5 outline outline-1 outline-gray-400"}
                                           placeholder={"상품명을 입력해 주세요."}/>
                                </div>
                            </div>
                            <div className={"flex py-10 border-b"}>
                                <div className={"flex justify-start"} style={{width: '13%', alignItems: 'center'}}>
                                    상품상태
                                </div>
                                <div className={"flex justify-start"} style={{width: '87%'}}>
                                    <input type="text"
                                           className={"w-full p-5 outline outline-1 outline-gray-400"}
                                           placeholder={"상품명을 입력해 주세요."}/>
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
