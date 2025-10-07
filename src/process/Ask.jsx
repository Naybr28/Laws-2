import { Link } from "react-router-dom";
export default function Ask() {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex flex-col justify-center">
      {/* Back Button (top-left) */}
      <div className="flex items-center p-6">
        <a href="/" className="flex items-center text-black hover:text-gray-400">
          <span className="text-xl font-extrabold border-black mr-2 mb-1">
            ←
          </span>
          <span className="text-xl font-bold">
            回上一頁
          </span>
        </a>
      </div>

      {/* Center Section */}
      <div className="flex flex-col flex-1 items-center justify-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-sky-900 mb-40">
          請選擇您的身分
        </h2>

        {/* Options */}
        <div className="flex justify-center gap-96">
          <div className="flex flex-col items-center">
            <img src="/student.png" alt="student" className="!w-24 !h-24 object-contain md:w-32 md:h-32 lg:w-40 lg:h-40 mb-10"/>
          <Link to="/Student">
            <button1 className="px-6 py-3 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-50 text-sky-900 text-xl font-bold transition-all flex justify-center items-center">
              我是學生
            </button1>
          </Link> 
          </div>

          <div className="flex flex-col items-center">
            <img src="/teacher.png" alt="teacher" className="!w-24 !h-24 object-contain md:w-32 md:h-32 lg:w-40 lg:h-40 mb-10"/>
            <button1 className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 text-sky-900 text-xl font-bold transition-all flex justify-center items-center">
              我是教師
            </button1>
          </div>
        </div>
      </div>
    </div>
  );
}
