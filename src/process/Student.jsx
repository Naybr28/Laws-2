import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "/src/process/BackButton";
import PrimaryButton from "./PrimaryButton";

export default function Student() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get mainRole from Ask.jsx
  const { mainRole } = location.state || {};

  // Function to handle each age range selection
  const handleSelect = (subRole) => {
    navigate(`/student${subRole}`, { state: { mainRole, subRole } });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex flex-col justify-center">
      {/* Back Button */}
      <div className="flex items-center p-6">
        <BackButton />
      </div>

      {/* Center Section */}
      <div className="flex flex-col flex-1 items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-sky-900 mb-24">
          請選擇您的年齡
        </h2>

        {/* Options */}
        <div className="grid grid-rows-2 grid-cols-2 gap-x-36 gap-y-16">
          <PrimaryButton onClick={() => handleSelect("Under12")}>
            12歲以下
          </PrimaryButton>

          <PrimaryButton onClick={() => handleSelect("12Below14")}>
            12-14歲
          </PrimaryButton>

          <PrimaryButton onClick={() => handleSelect("14Under18")}>
            14-18歲
          </PrimaryButton>

          <PrimaryButton onClick={() => handleSelect("Above18")}>
            18歲以上
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
