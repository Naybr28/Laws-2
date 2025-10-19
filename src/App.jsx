import { Link } from "react-router-dom";
import PrimaryButton from "/src/process/PrimaryButton";
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
          <PrimaryButton>
            我要諮詢 →
          </PrimaryButton>
        </Link>

  </div>
  );
}

export default App;
