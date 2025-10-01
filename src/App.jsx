import { Link } from "react-router-dom";

function App() {
  return (
    <div className="h-screen w-screen bg-gradient-to-t from-indigo-50/70 to-blue-100/70">
      <div>
        {/* Title */}
        <h1 className="text-5xl font-bold text-sky-950 pt-35 pb-55">
          校園法律顧問
        </h1>

        {/* Button */}
        <Link to="/ask">
          <button className="px-8 py-4 bg-white border border-sky-700 rounded-xl text-sky-700 text-xl font-bold shadow-md hover:bg-sky-50 transition">
            我要諮詢 →
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
