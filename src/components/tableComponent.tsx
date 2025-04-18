import React, {useState} from "react";

type TableItem = {
    id: number;
    name: string;
    status: string;
    date: string;
};

const TableComponent: React.FC = () => {
    const [data, setData] = useState<TableItem[]>([
        { id: 1, name: "", status: "", date: "" },
    ]);

    const [editingCell, setEditingCell] = useState<{
        rowId: number | null;
        field: keyof TableItem | null;
    }>({ rowId: null, field: null });

    const handleEdit = (rowId: number, field: keyof TableItem) => {
        setEditingCell({ rowId, field });
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        rowId: number,
        field: keyof TableItem
    ) => {
        const value = e.target.value;
        setData((prevData) =>
            prevData.map((item) =>
                item.id === rowId ? { ...item, [field]: value } : item
            )
        );
    };

    const handleBlur = () => {
        setEditingCell({ rowId: null, field: null });
    };

    return (
        <div className="notion-style-table">
            <table className="table-fixed w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="w-1/4 px-3 py-2 border border-gray-300">이름</th>
                        <th className="w-1/4 px-3 py-2 border border-gray-300">Status</th>
                        <th className="w-1/4 px-3 py-2 border border-gray-300">날짜</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id} className="text-center">
                        {(["name", "status", "date"] as (keyof TableItem)[]).map(
                            (field) => (
                                <td
                                    key={field}
                                    onClick={() => handleEdit(item.id, field)}
                                    className="border border-gray-300 px-3 py-2"
                                    style={{minWidth: "100px", height: "45px" }}
                                >
                                    {editingCell.rowId === item.id &&
                                    editingCell.field === field ? (
                                        <input
                                            type="text"
                                            value={item[field]}
                                            onChange={(e) => handleInputChange(e, item.id, field)}
                                            onBlur={handleBlur}
                                            autoFocus
                                            className="w-full bg-transparent border-none outline-none"
                                            style={{
                                                minWidth: "100px",
                                            }}
                                        />
                                    ) : (
                                        item[field]
                                    )}
                                </td>
                            )
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
            <div
                className="w-full flex justify-start p-3"
                style={{alignItems: "center", borderBottom: "1px solid #ddd"}}
            >
                <i className="bi bi-plus-lg clickable"></i>&nbsp;&nbsp;새 페이지
            </div>

        </div>
    );
};

export default TableComponent;