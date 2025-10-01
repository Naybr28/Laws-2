import { Link } from "react-router-dom";

export default function Ask() {
  return (
    <div className="w-[1440px] h-[1024px] mx-auto flex flex-col bg-gradient-to-b from-white to-gray-100">
      {/* Back Button (top-left) */}
      <div className="flex items-center p-6">
        <a href="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <span className="text-2xl mr-2">←</span>
          <span className="font-medium">回上一頁</span>
        </a>
      </div>

      {/* Center Section */}
      <div className="flex flex-col flex-1 items-center justify-center">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#003366] mb-16">
          請選擇您的身分
        </h1>

        {/* Options */}
        <div className="flex justify-center gap-32">
          <div className="flex flex-col items-center">
            <img src="/student.png" alt="學生" className="w-32 h-32 mb-4" />
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50">
              我是學生
            </button>
          </div>

          <div className="flex flex-col items-center">
            <img src="/teacher.png" alt="教師" className="w-32 h-32 mb-4" />
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50">
              我是教師
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
