
import Step3 from "./step3/Step3";
import { useState } from "react";
import Setup from "../auth/Setup";
function CustomisationPage() {
  const [step, setStep] = useState(3);
  // pick the color from redux store
  return (
    <div className="w-full">
      {step === 1 && <Setup />}
      {step === 3 && <Step3 primaryColor="#005200" secondaryColor="#B0D0B0" />}
    </div>
  );
}

export default CustomisationPage;
