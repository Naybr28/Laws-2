import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "/src/process/BackButton";
import PrimaryButton from "/src/process/PrimaryButton";

export default function StudentUnder12() {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive data from previous page
  const { mainRole, subRole } = location.state || {};

  // Function to handle selection
  const handleSelect = (subSubRole) => {
    // If user chooses "特定身分學生", go to deeper selection page
    if (subSubRole === "special_identity") {
      navigate("/studentSpecific", { state: { mainRole, subRole, subSubRole } });
    } else {
      // Otherwise, go directly to HomeUI with all role info
      navigate("/HomeUI", { state: { mainRole, subRole, subSubRole } });
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex flex-col justify-center">
      {/* Back Button (top-left) */}
      <div className="flex items-center p-6">
        <BackButton />
      </div>

      {/* Center Section */}
      <div className="flex flex-col flex-1 items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-sky-900 mb-24">
          請選擇您的學生身分（12歲以下）
        </h2>

        {/* Options */}
        <div className="grid grid-rows-5 grid-cols-2 gap-x-28 gap-y-10">
          <PrimaryButton onClick={() => handleSelect("一般生")}>一般生</PrimaryButton>
          <PrimaryButton onClick={() => handleSelect("特殊教育生")}>特殊教育生</PrimaryButton>
          <PrimaryButton onClick={() => handleSelect("原住民學生")}>原住民學生</PrimaryButton>
          <PrimaryButton onClick={() => handleSelect("弱勢學生")}>弱勢學生</PrimaryButton>
          <PrimaryButton onClick={() => handleSelect("特定身分學生")}>特定身分學生</PrimaryButton>
          <PrimaryButton onClick={() => handleSelect("僑生")}>僑生</PrimaryButton>
          <PrimaryButton onClick={() => handleSelect("外籍生")}>外籍生</PrimaryButton>
          <PrimaryButton onClick={() => handleSelect("陸生")}>陸生</PrimaryButton>
          <PrimaryButton onClick={() => handleSelect("港澳生")}>港澳生</PrimaryButton>
          <PrimaryButton onClick={() => handleSelect("新住民生")}>新住民生</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
