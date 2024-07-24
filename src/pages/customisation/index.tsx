
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
  console.log("userProdile", profile)
  const [step, setStep] = useState(1);
  const [data, setData] = useState<customisationData>(customizationData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // pick the color from redux store
  useEffect(() => {
    console.log(">>>>>>>>>>>>>>")
    const localData: string | null = localStorage.getItem("setupData");
    if(localData){
      const fineLocalData = JSON.parse(localData);
      console.log("Local data", fineLocalData)
      setData(fineLocalData);
      setStep(fineLocalData.stage);
    }else{
      saveCustomizationData();
    }
  }, []);

  const saveCustomizationData = () => {
    console.log("User profile", profile)
    const existingData = {
      ...profile.customisationData,
      theme: {
        primaryColor: "#006600",
        secondaryColor: "#E0F5E0",
        footerColor: "#000000"
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
        tiktok: ""
      },
      banner: {
        text: profile.customisationData.banner.text,
        imageUrl: profile.customisationData.banner.ImageUrl,
        template: "",
      },
      contact: {
        phone: "",
        email: {
          supportEmail: "",
          senderEmail: "",
        },
        address: ""
      }
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
    }else{
      setData({...data, contact: {...data.contact, email: {...data.contact?.email, ...info}}})
    }
  }

  const setAboutData = (aboutData: any) => {
    setData({...data, aboutUs: {...data.aboutUs, ...aboutData}})
  }

  const setSocial = (socialData: any) => {
    setData({...data, socialMedia: {...data.socialMedia, ...socialData}})
    // console.log(data);
  }

  const prev = () => {
    console.log(data.stage)
    setData({...data, stage: data.stage && data.stage > 1 ? data.stage - 1 : 1})
    setStep(step - 1)
  }

  const processStage1 = useMutation(
      async () => {
        console.log("Processing data", data);
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
        console.log("Processing data", data);
        return await CustomisationService.updateCustomisation({...data, stage: 3});
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
      {step === 1 && data && <Setup data={data} setColor={setColor} setService={setServices} setInfo={setInfo} processStage1={() => processStage1.mutate()} isLoading={!isLoading} />}
      {step === 2 && data && <Step2 data={data} isLoading={!isLoading} setAboutData={setAboutData} setSocial={setSocial} prev={prev} processStage2={() => processStage2.mutate()} />}
      {step === 3 && <Step3 primaryColor={data.theme?.primaryColor} secondaryColor={data.theme?.secondaryColor} step={step} setStep={setStep} data={data}/>}
    </div>
  );
}

export default CustomisationPage;
