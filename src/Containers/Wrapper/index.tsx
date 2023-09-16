import { useState } from 'react'
import { AccountInformation, AddressInformation, PersonalInformation } from "..";

const Wrapper = () => {
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    if (step === 1) {
      setStep((prevStep) => prevStep + 1);
    }
    if (step === 2) {
      setStep((prevStep) => prevStep + 1);
    }

    return
  }

  const handlePrev = () => {
    if (step === 2) {
      setStep((prevStep) => prevStep - 1);
    }
    if (step === 3) {
      setStep((prevStep) => prevStep - 1);
    }

    return
  }

  return (
    <>
      {step === 1 && (
        < PersonalInformation onNext={handleNext} />
      )}
      {step === 2 && (
        <AddressInformation onNext={handleNext} onPrev={handlePrev} />
      )}
      {step === 3 && (
        <AccountInformation onPrev={handlePrev} />
      )}
    </>
  )
}

export default Wrapper