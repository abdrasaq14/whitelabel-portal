import { useEffect, useState } from "react";
import useStorage from "../useStorage";
import { customisationData } from "@/interfaces/AppInterfaces";
import { CustomisationService } from "@/services/Customisation";
import toast from "react-hot-toast";

const customizationData = {
  theme: {
    primaryColor: "",
    secondaryColor: "",
    footerColor: "",
  },
  image: {
    logo: "",
    favicon: "",
  },
  aboutUs: {
    shortText: "",
    longText: "",
    coreValues: [
      { title: "", icon: "" },
      { title: "", icon: "" },
      { title: "", icon: "" },
    ],
  },
  domain: "",
  socialMedia: {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
  },
  banner: {
    text: "",
    imageUrl: "",
    template: "",
  },
  contact: {
    phone: { cCode: "", val: "" },
    email: {
      supportEmail: "",
      senderEmail: "",
    },
    address: "",
  },
  services: [],
  completeSetup: "ongoing",
  stage: 1,
};
const useCustomisation = () => {
  const { currentUser } = useStorage();
  const profile = currentUser?.user;
  // console.log("Profile", profile)
  const [step, setStep] = useState(1);
  const [data, setData] = useState<customisationData>(customizationData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<any>({});
  const [isAboutError, setIsAboutError] = useState<any>({});
  // const [phoneCode, setPhoneCode] = useState<string>('');
  // pick the color from redux store
  useEffect(() => {
    console.log(">>>>>>>>>>>>>>");
    const localData: string | null = localStorage.getItem("setupData");
    if (localData) {
      const fineLocalData = JSON.parse(localData);
      // console.log("Local data", fineLocalData)
      setData(fineLocalData);
      setStep(fineLocalData.stage);
    } else {
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
  };

  const setColor = (color: any) => {
    setData({ ...data, theme: { ...data.theme, ...color } });
  };

  const setServices = (services: any) => {
    setData({ ...data, services });
  };

  // const setUpPhoneCode = (code: string) => {
  //   setPhoneCode(code);
  // }

  const setInfo = (info: any) => {
    if (info.hasOwnProperty("supportEmail")) {
      setData({
        ...data,
        contact: {
          ...data.contact,
          email: { ...data.contact?.email, ...info },
        },
      });
    } else if (info.hasOwnProperty("phone")) {
      setData({ ...data, contact: { ...data.contact, ...info } });
    } else if (info.hasOwnProperty("senderEmail")) {
      setData({
        ...data,
        contact: {
          ...data.contact,
          email: { ...data.contact?.email, ...info },
        },
      });
    }
  };

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
    });
  };

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
    });

    console.log("Error info aboutus ", isAboutError);
  };

  const setAboutData = (aboutData: any) => {
    setData({ ...data, aboutUs: { ...data.aboutUs, ...aboutData } });
  };

  const setSocial = (socialData: any) => {
    console.log("Social Data", socialData);
    setData({
      ...data,
      socialMedia: { ...data.socialMedia, ...socialData },
    });
    console.log("Final socials", data);
  };

  const prev = () => {
    console.log(data.stage);
    setData({
      ...data,
      stage: data.stage && data.stage > 1 ? data.stage - 1 : 1,
    });
    setStep(step - 1);
  };

    const processStage1 = async () => {
        try {
            // const newData = {...data, contact: {...data.contact, phone: phoneCode+data?.contact?.phone}}
            console.log("Processing data", data);
            setIsLoading(true);
            const res: any = await CustomisationService.update({
                ...data,
                stage: 2,
            });
            if (res.data.result) {
                console.log("Inside success");
                setIsLoading(false);
                localStorage.setItem(
                    "setupData",
                    JSON.stringify({ ...data, stage: 2 })
                );
                setStep(2);
                toast.success("Stage1 setup completed");
            }
        } catch (e: any) {
            setIsLoading(false);
            console.log("erro", e);
            toast.error(e);
        }
    }
    const processStage2 = async () => {
      try {
        const mData: any = { ...data };
        console.log("Processing data", mData);
        const socialData: any = mData.socialMedia;
        const result: any[] | undefined = Object.entries(socialData)
          .map(([key, value]) => ({
            title: key,
            link: value,
          }))
          .filter((item) => item.link);
        setIsLoading(true);
        mData["socialMedia"] = result;
        const res: any = await CustomisationService.update({
          ...mData,
          stage: 3,
        });
        console.log("Inside success");
        setIsLoading(false);
        localStorage.setItem(
          "setupData",
          JSON.stringify({ ...data, stage: 2 })
        );
        setStep(3);
        if (res.data.result) {
          toast.success("Stage2 setup completed");
          setIsLoading(false);
        }
      } catch (error:any) {
        console.log("erro", error);
        toast.success(error);
      }
    };
  return {
    data,
    step,
    setColor,
    setServices,
    setInfo,
    setError,
    setAboutError,
    setAboutData,
    setSocial,
    prev,
    processStage1,
    processStage2,
    isLoading,
    isError,
    isAboutError,
    
    }
};

export default useCustomisation;
