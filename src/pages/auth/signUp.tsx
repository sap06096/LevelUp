import * as React from "react";
import {useState} from "react";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';
import userStore from "../../zustand/store.ts";
import {createUserAction, duplicationIdAction} from "../../api/userActions.ts";

const signUp: React.FC = () => {
    const { userDto, updateUserField, saveUserToStorage } = userStore();

    const handleChange = (field: keyof typeof userDto, value: any) => {
        console.log(field);
        console.log(value);
        updateUserField(field, value);
    };

    const [email, setEmail] = useState({
        front: '',
        back: ''
    });

    const [duplicateId, setDuplicateId] = useState(false);

    // 가입하기
    const registerSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 기본 동작(페이지 리프레시) 방지

        if(!duplicateId){
            toast.warning("아이디 중복확인을 시도해주세요.", {
                position: "bottom-center", // 알림 위치
                autoClose: 2000, // 3초 후 자동 닫힘
                hideProgressBar: true, // 진행 바 표시
                closeOnClick: true, // 클릭하면 닫힘
                pauseOnHover: false, // 마우스 올리면 멈춤
                draggable: true, // 드래그로 닫기 가능
            });
        }

        if(!_.isEmpty(email.front) && !_.isEmpty(email.back)){
            console.log("이메일들어옴?");
            let resultEmail = email.front + '@' + email.back;
            console.log(resultEmail);
            updateUserField('email', resultEmail);
        }
        console.log(userDto);

        try {
            const res = await createUserAction(userDto);
        }catch (e) {
            console.error("회원가입 중 오류 발생", e);
        }
    }

    const options = [
        { value: 0, label: '남자' },
        { value: 1, label: '여자' }
    ];

    const emailOptions = [
        { value: 'hanmail.net', label: 'hanmail.net' },
        { value: 'naver.com', label: 'naver.com' },
        { value: 'gmail.com', label: 'gmail.com' },
        { value: 'hotmail.com', label: 'hotmail.com' },
    ];

    //중복체크
    const duplicationId = async () => {
        console.log("아이디 중복체크");
        const id = userDto.loginId;
        if(_.isEmpty(id)){
            alert('아이디를 입력해주세요.');
            return;
        }

        try {
            const res = await duplicationIdAction(id);
            if (res.result == 0) {
                toast.success(`${res.desc} 🎉`, {
                    position: "bottom-center", // 알림 위치
                    autoClose: 2000, // 3초 후 자동 닫힘
                    hideProgressBar: true, // 진행 바 표시
                    closeOnClick: true, // 클릭하면 닫힘
                    pauseOnHover: false, // 마우스 올리면 멈춤
                    draggable: true, // 드래그로 닫기 가능
                });
                setDuplicateId(true);
            } else {
                toast.warning(res.desc, { position: "bottom-center"});
                setDuplicateId(false);
            }
        } catch (error) {
            console.error('중복 체크 중 오류 발생', error);
        }
    }

    return (
        <>
            <div className="w-full">
                <div className="flex justify-center items-center h-screen bg-gray-200">
                    <div className="bg-white p-8 rounded-lg shadow-lg mainBox">
                        <h2 className="text-2xl font-semibold mb-6 text-center">회원가입</h2>
                        <form onSubmit={registerSubmit}>
                            <div className="mt-12 mb-6">
                                <label htmlFor="loginId" className="w-full mb-2 font-bold flex justify-start text-sm font-medium text-gray-700">
                                    아이디
                                </label>
                                <div className={'w-full flex'}>
                                    <div className={'w-10/12 flex justify-start'}>
                                        <input
                                            id="loginId"
                                            type="text"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={userDto.loginId}
                                            onChange={(e) => handleChange('loginId', e.target.value)}
                                            placeholder="아이디를 입력하세요"
                                            required
                                        />
                                    </div>
                                    <div className={'w-2/12 text-center'}>
                                        {!duplicateId ?
                                            <button  className={'items-center w-full py-3 bg-blue-500 text-white font-semibold rounded-md'} type={"button"} onClick={duplicationId}>
                                                중복 확인
                                            </button>
                                            : <button className={'items-center w-full py-3 bg-green-500 text-white font-semibold rounded-md'}
                                                      type={"button"}
                                                      disabled={true}>
                                                허용 가능
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* 비밀번호 */}
                            <div className="mb-6">
                                <label htmlFor="loginPwd" className="w-full mb-2 font-bold flex justify-start text-sm font-medium text-gray-700">
                                    비밀번호
                                </label>
                                <input
                                    id="loginPwd"
                                    type="password"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={userDto.loginPwd}
                                    onChange={(e) => handleChange('loginPwd', e.target.value)}
                                    placeholder="비밀번호를 입력하세요"
                                    required
                                />
                            </div>

                            {/* 사용자 이름 */}
                            <div className="mb-6">
                                <label htmlFor="name" className="w-full mb-2 font-bold flex justify-start text-sm font-medium text-gray-700">
                                    사용자 이름
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={userDto.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="사용자 이름을 입력하세요"
                                    required
                                />
                            </div>

                            {/* 나이 */}
                            <div className="mb-6">
                                <label htmlFor="age" className="w-full mb-2 font-bold flex justify-start text-sm font-medium text-gray-700">
                                    나이
                                </label>
                                <input
                                    id="age"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={userDto.age}
                                    onChange={(e) => handleChange('age', Number(e.target.value))}
                                    placeholder="나이를 입력하세요"
                                    required
                                />
                            </div>

                            {/* 성별 */}
                            <div className="mb-6">
                                <label htmlFor="gender" className="w-full mb-2 font-bold flex justify-start text-sm font-medium text-gray-700">
                                    성별 (선택)
                                </label>
                                <Select
                                    options={options}
                                    placeholder={"성별을 선택해주세요"}
                                    value={options.find(option => option.value == userDto.gender)}
                                    onChange={(selectedOption) => handleChange('gender', Number(selectedOption))}
                                />
                            </div>

                            {/* 이메일 */}
                            <div className="mb-6">
                                <label htmlFor="email" className="w-full mb-2 font-bold flex justify-start text-sm font-medium text-gray-700">
                                    이메일
                                </label>
                                <div className={"flex w-full"}>
                                    <input
                                        id="email"
                                        className="w-5/12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={email.front}
                                        onChange={(e) => setEmail({...email, front: e.target.value})}
                                        placeholder="이메일 주소"
                                        required
                                    />
                                    <p className={"w-2/12 flex justify-center items-center"}>@</p>
                                    <Select
                                        options={emailOptions}
                                        className="w-5/12"
                                        placeholder={"이메일 형식"}
                                        value={emailOptions.find(option => option.value === email.back)} // selected value를 객체로 설정
                                        onChange={(selectedOption) =>
                                            setEmail({
                                                ...email,
                                                back: selectedOption?.value || '', // value 필드만 사용해 back 업데이트
                                            })
                                        }
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                height: '100%',
                                                minHeight: 'auto',
                                            }),
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            {/* 핸드폰 번호 */}
                            <div className="mb-6">
                                <label htmlFor="phone" className="w-full mb-2 font-bold flex justify-start text-sm font-medium text-gray-700">
                                    핸드폰 번호
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={userDto.phoneNumber}
                                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                    placeholder="핸드폰 번호를 입력하세요"
                                    required
                                />
                            </div>

                            {/* 가입하기 버튼 */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                            >
                                가입하기
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* 알림 컴포넌트 */}
            <ToastContainer />
        </>
    )
}

export default signUp