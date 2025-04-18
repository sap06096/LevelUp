import React, {useState} from "react";
import _ from "lodash";
import 'react-quill/dist/quill.snow.css';

const home: React.FC = () => {
    //@ts-ignore
    interface Todo {
        id: number;
        title: string;
        description?: string;
        status: '대기 중' | '진행 중' | '완료됨';
        priority: number;
        due_date: string;
        created_at: string;
        updated_at: string;
        category?: string;
    }

    // const todoList: Todo[] = [];
    //@ts-ignore
    const [activeTab, setActiveTab] = useState(0);
    //@ts-ignore
    const tabs = ['표', '계정', '노트'];
    //@ts-ignore
    const [boardList, setBoardList] = useState([
        {
            id: 1,
            title: "제목입니다.",
            content: "내용입니다.",
            writer: "김찬우",
            created_at: "2020-01-01",
            updated_at: "2020-02-01",
        },
        {
            id: 2,
            title: "제목입니다.",
            content: "내용입니다.",
            writer: "김우빈",
            created_at: "2020-01-01",
            updated_at: "2020-02-01",
        },
        {
            id: 3,
            title: "제목입니다.",
            content: "내용입니다.",
            writer: "안재혁",
            created_at: "2020-01-01",
            updated_at: "2020-02-01",
        },
    ])
    //@ts-ignore
    const [content, setContent] = useState<string>('');
    //@ts-ignore
    const handleChange = (value: string) => {
        setContent(value);
    };

    return (
        <>
            {/* 상단 배너 */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen px-80">
                <section className="bg-gray-100 p-4 border">wo</section>
                <section className="bg-gray-200 p-4 border">우측 상단</section>
                <section className="bg-gray-300 p-4 border col-span-2">하단 전체</section>
            </div>
        </>
    );
};

export default home;