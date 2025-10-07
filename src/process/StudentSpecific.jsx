import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function StudentSpecific() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex flex-col justify-center">
      {/* Back Button (top-left) */}
      <div className="flex items-center p-6">
        <button3
          onClick={() => navigate(-1)} // go back to previous page
          className="flex items-center text-black hover:text-gray-400"
        >
          <span className="text-xl font-extrabold mr-2 mb-1">←</span>
          <span className="text-xl font-bold">回上一頁</span>
        </button3>
      </div>

      {/* Center Section */}
      <div className="flex flex-col flex-1 items-center justify-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-sky-900 mb-40">
          請選擇您的特定身分
        </h2>

        {/* Options */}
        <div className="grid grid-rows-1 grid-cols-3 gap-x-32 gap-y-10">
        <Link to="/HomeUI" className="block">
            <button1 className="px-6 py-3 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-50 text-sky-900 text-xl font-bold transition-all flex justify-center items-center">
              體育生
            </button1>
        </Link>

        <Link to="/HomeUI" className="block">
            <button1 className="px-6 py-3 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-50 text-sky-900 text-xl font-bold transition-all flex justify-center items-center">
              藝術才能班學生
            </button1>
        </Link>

        <Link to="/HomeUI" className="block">
            <button1 className="px-6 py-3 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-50 text-sky-900 text-xl font-bold transition-all flex justify-center items-center">
              其他
            </button1>
        </Link>

        </div>
      </div>
    </div>
  );
}
