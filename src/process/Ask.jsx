import { useNavigate } from "react-router-dom";
import BackButton from "/src/process/BackButton";
import PrimaryButton from "/src/process/PrimaryButton";

export default function Ask() {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    // Navigate to the next page with mainRole info
    if (role === "student") {
      navigate("/Student", { state: { mainRole: "student" } });
    } else if (role === "teacher") {
      navigate("/Teacher", { state: { mainRole: "teacher" } });
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
          請選擇您的身分
        </h2>

        {/* Options */}
        <div className="flex justify-center gap-96">
          {/* Student */}
          <div className="flex flex-col items-center">
            <img
              src="/student.png"
              alt="student"
              className="!w-24 !h-24 object-contain md:w-32 md:h-32 lg:w-40 lg:h-40 mb-10"
            />
            <PrimaryButton onClick={() => handleSelect("student")}>
              我是學生
            </PrimaryButton>
          </div>

          {/* Teacher */}
          <div className="flex flex-col items-center">
            <img
              src="/teacher.png"
              alt="teacher"
              className="!w-24 !h-24 object-contain md:w-32 md:h-32 lg:w-40 lg:h-40 mb-10"
            />
            <PrimaryButton onClick={() => handleSelect("teacher")}>
              我是教師
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
