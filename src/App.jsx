import { Link } from "react-router-dom";
import './App.css'

function App() {
  return (
  <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex flex-col items-center justify-center">
        
        {/* Title */}
        <h1 className="text-sky-800 font-bold text-5xl mb-48">
          校園法律顧問 
        </h1>

        {/* Button */}
        <Link to="/Ask">
          <button className="px-6 py-3 bg-white border border-sky-700 rounded-xl text-sky-700 text-xl font-bold shadow-md hover:bg-sky-50 transition">
            我要諮詢 →
          </button>
        </Link>

  </div>
  );
}

export default App;
