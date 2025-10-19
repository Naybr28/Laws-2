import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "/src/process/BackButton";
import PrimaryButton from "/src/process/PrimaryButton";

export default function StudentSpecific() {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive all previous roles from StudentUnder12.jsx
  const { mainRole, subRole, subSubRole } = location.state || {};

  // Function to handle final selection
  const handleSelect = (subSubSubRole) => {
    // Navigate to HomeUI with all role data
    navigate("/HomeUI", {
      state: { mainRole, subRole, subSubRole, subSubSubRole },
    });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex flex-col justify-center">
      {/* Back Button */}
      <div className="flex items-center p-6">
        <BackButton />
      </div>

      {/* Center Section */}
      <div className="flex flex-col flex-1 items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-sky-900 mb-40">
          請選擇您的特定身分
        </h2>

        {/* Options */}
        <div className="grid grid-rows-1 grid-cols-3 gap-x-32 gap-y-10">
          <PrimaryButton onClick={() => handleSelect("體育生")}>
            體育生
          </PrimaryButton>

          <PrimaryButton onClick={() => handleSelect("藝術才能班學生")}>
            藝術才能班學生
          </PrimaryButton>

          <PrimaryButton onClick={() => handleSelect("其他")}>
            其他
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
