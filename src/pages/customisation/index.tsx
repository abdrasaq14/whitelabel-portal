
import Step3 from "./step3/Step3";
import {useEffect, useState} from "react";
import Setup from "./Setup";
import {useMutation} from "react-query";
import {CustomisationService, customisationData} from "../../services/customisation.service";
import {useAuth} from "../../zustand/auth.store";
import Step2 from "./Step2";
import toast from "react-hot-toast";

const customizationData = {
  theme: {
    primaryColor: "",
    secondaryColor: "",
    footerColor: ""
  },
  image: {
    logo: "",
    favicon: "",
  },
  aboutUs: {
    shortText: "",
    longText: "",
    coreValues: [{title: "", icon: ""}, {title: "", icon: ""}, {title: "", icon: ""}],
  },
  domain: "",
  socialMedia: {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    tiktok: ""
  },
  banner: {
    text: "",
    imageUrl: "",
    template: "",
  },
  contact: {
    phone: "",
    email: {
      supportEmail: "",
      senderEmail: "",
    },
    address: ""
  },
  services: [],
  completeSetup: "ongoing",
  stage: 1
}

function CustomisationPage() {
  const profile: any = useAuth((s) => s.profile)
  // console.log("Profile", profile)
  const [step, setStep] = useState(1);
  const [data, setData] = useState<customisationData>(customizationData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<any>({});
  const [isAboutError, setIsAboutError] = useState<any>({});
  // pick the color from redux store
  useEffect(() => {
    console.log(">>>>>>>>>>>>>>")
    const localData: string | null = localStorage.getItem("setupData");
    if(localData){
      const fineLocalData = JSON.parse(localData);
      // console.log("Local data", fineLocalData)
      setData(fineLocalData);
      setStep(fineLocalData.stage);
    }else{
      saveCustomizationData();
    }
  }, []);

  const saveCustomizationData = () => {
    // console.log("User profile", profile)
    const existingData = {
      ...profile.customisationData,
      theme: {
        primaryColor: "#006600",
        secondaryColor: "#E0F5E0",
        footerColor: "#000000",
      },
      image: {
        logo: profile.companyLogo,
        favicon: "",
      },
      socialMedia: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        tiktok: "",
      },
      banner: {
        text: profile.customisationData?.banner?.text,
        imageUrl: profile.customisationData?.banner?.imageUrl,
        template: profile.customisationData?.banner?.template,
      },
      contact: {
        phone: "",
        email: {
          supportEmail: "",
          senderEmail: "",
        },
        address: "",
      },
    };
    localStorage.setItem("setupData", JSON.stringify(existingData));
    setData(existingData);
    setStep(existingData.stage);
  }

  const setColor = (color: any) => {
    setData({...data, theme: {...data.theme, ...color}})
  }

  const setServices = (services: any) => {
    setData({...data, services})
  }

  const setInfo = (info: any) => {
    if(info.hasOwnProperty("supportEmail")){
      setData({...data, contact: {...data.contact, email: {...data.contact?.email, ...info}}})
    }else if(info.hasOwnProperty("phone")){
      setData({...data, contact: {...data.contact, ...info}})
    }else if(info.hasOwnProperty("senderEmail")){
      setData({...data, contact: {...data.contact, email: {...data.contact?.email, ...info}}})
    }
  }

  const setError = (error: any) => {
    console.log("Info.error", error);
    
    setIsError((prevError: any) => {
      let newErrorState = { ...prevError };
      if (error.hasOwnProperty("contactEmail")) {
        newErrorState.contactEmail = error.contactEmail;
      }
      if (error.hasOwnProperty("senderEmail")) {
          newErrorState.senderEmail = error.senderEmail;
      }
      if (error.hasOwnProperty("contactPhone")) {
          newErrorState.contactPhone = error.contactPhone;
      }

      return newErrorState;
    })
  }

  const setAboutError = (error: any) => {
    console.log("Info.aboutError", error);
    
    setIsAboutError((prevError: any) => {
      let newErrorState = { ...prevError };
      if (error.hasOwnProperty("aboutUs")) {
        newErrorState.aboutUs = error.aboutUs;
      }
      if (error.hasOwnProperty("aboutUsFull")) {
          newErrorState.aboutUsFull = error.aboutUsFull;
      }

      return newErrorState;
    })

    console.log("Error info aboutus ", isAboutError)
  }

  const setAboutData = (aboutData: any) => {
    setData({...data, aboutUs: {...data.aboutUs, ...aboutData}})
  }

  const setSocial = (socialData: any) => {
    console.log("Social Data", socialData);
    setData({...data, socialMedia: {...data.socialMedia, ...socialData}})
    console.log("Final socials", data);
  }

  const prev = () => {
    console.log(data.stage)
    setData({...data, stage: data.stage && data.stage > 1 ? data.stage - 1 : 1})
    setStep(step - 1)
  }

  const processStage1 = useMutation(
      async () => {
        console.log("Processing data", data);
        setIsLoading(true);
        return await CustomisationService.updateCustomisation({...data, stage: 2});
      },
      {
        onSuccess: (response) => {
          console.log("Inside success")
          setIsLoading(false);
          localStorage.setItem("setupData", JSON.stringify({...data, stage: 2}));
          setStep(2);
          toast.success("Stage1 setup completed")
        },
        onError: (err: any) => {
          setIsLoading(false);
          console.log("erro", err);
          toast.error(err)
        }
      }
  )

  const processStage2 = useMutation(
      async () => {
        const mData: any = {...data}
        console.log("Processing data", mData);
        const socialData: any = mData.socialMedia;
        const result: any[] | undefined = Object.entries(socialData).map(([key, value]) => ({
          title: key,
          link: value
        })).filter(item => item.link);
        setIsLoading(true);
        mData["socialMedia"] = result;
        return await CustomisationService.updateCustomisation({...mData, stage: 3});
      },
      {
        onSuccess: (response) => {
          console.log("Inside success")
          setIsLoading(false);
          localStorage.setItem("setupData", JSON.stringify({...data, stage: 2}));
          setStep(3);
          toast.success("Stage2 setup completed")
        },
        onError: (err: any) => {
          setIsLoading(false);
          console.log("erro", err);
          toast.success(err)
        }
      }
  )

  return (
    <div className="w-full">
      {step === 1 && data && <Setup data={data} setColor={setColor} setService={setServices} setError={setError} setInfo={setInfo} processStage1={() => !isError.contactEmail && !isError.senderEmail && !isError.contactPhone && processStage1.mutate()} isLoading={isLoading} />}
      {step === 2 && data && <Step2 data={data} isLoading={isLoading} setAboutData={setAboutData} setError={setAboutError} setSocial={setSocial} prev={prev} processStage2={() => !isAboutError.aboutUs && !isAboutError.aboutUsFull && processStage2.mutate()} />}
      {step === 3 && <Step3 primaryColor={data.theme?.primaryColor} secondaryColor={data.theme?.secondaryColor} step={step} setStep={setStep} data={data}/>}
    </div>
  );
}

export default CustomisationPage;
