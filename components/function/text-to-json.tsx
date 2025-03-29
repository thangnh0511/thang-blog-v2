"use client";

import { useEffect, useState } from "react";

interface TextToJsonConverterProps {
    inputText: string; // Nhận dữ liệu string từ props
}

const TextToJsonConverter: React.FC<TextToJsonConverterProps> = ({ inputText }) => {
    const [json, setJson] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const parsedJson = JSON.parse(inputText);
            setJson(parsedJson);
            setError(null);
        } catch (err) {
            setError("Invalid JSON format. Please check your input.");
            setJson(null);
        }
    }, [inputText]); // Tự động chuyển đổi khi inputText thay đổi

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-xl font-semibold mb-4">Converted JSON Output</h2>
            {error && <p className="text-red-500">{error}</p>}
            {json && (
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(json, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default TextToJsonConverter;
