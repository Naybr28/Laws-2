import { Link } from "react-router-dom";
import BackButton from "/src/process/BackButton";
import PrimaryButton from "/src/process/PrimaryButton";

export default function Student14Under18() {

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#FFFFFF] to-[#EAF2FF] flex flex-col justify-center">
      {/* Back Button (top-left) */}
      <div className="flex items-center p-6">
        <BackButton/>
      </div>

      {/* Center Section */}
      <div className="flex flex-col flex-1 items-center justify-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-sky-900 mb-24">
          請選擇您的學生身分(14-18歲)
        </h2>

        {/* Options */}
        <div className="grid grid-rows-5 grid-cols-2 gap-x-28 gap-y-10">
        <Link to="/HomeUI">
            <PrimaryButton>
              一般生
            </PrimaryButton>
        </Link>
        
        <Link to="/HomeUI">
            <PrimaryButton>
              特殊教育生
            </PrimaryButton>
        </Link>

        <Link to="/HomeUI">
            <PrimaryButton>
              原住民學生
            </PrimaryButton>
        </Link>

        <Link to="/HomeUI">
            <PrimaryButton>
              弱勢學生
            </PrimaryButton>
        </Link>

        <Link to="/studentSpecific">
            <PrimaryButton>
              特定身分學生
            </PrimaryButton>
        </Link>

        <Link to="/HomeUI">
            <PrimaryButton>
              僑生
            </PrimaryButton>
        </Link>

        <Link to="/HomeUI">
            <PrimaryButton>
              外籍生
            </PrimaryButton>
        </Link>

        <Link to="/HomeUI">
            <PrimaryButton>
              陸生
            </PrimaryButton>
        </Link>

        <Link to="/HomeUI">
            <PrimaryButton>
              港澳生
            </PrimaryButton>
        </Link>

        <Link to="/HomeUI">
            <PrimaryButton>
              新住民生
            </PrimaryButton>
        </Link>
        </div>
      </div>
    </div>
  );
}
