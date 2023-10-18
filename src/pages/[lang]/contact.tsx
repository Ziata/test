import ContactSelect from "@/components/ContactSelect/ContactSelect";
import FollowBlock from "@/components/FollowBlock/FollowBlock";
import Loader from "@/components/Loader/Loader";
import { LayoutContext } from "@/context/LayoutContext";
import { useSendMessageMutation } from "@/services/api";
import { IFollow, IFooter, IHeader, Page } from "@/services/interface";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const jsonToFormData = (json: any) => {
  try {
    const data = new FormData();

    for (let k in json) {
      data.append(k, json[k]);
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface PageProps {
  data: Page;
  headerData: IHeader;
  footerData: IFooter;
  followData: IFollow;
  form_id?: string;
}

const Contact: React.FC<PageProps> = ({
  data,
  footerData,
  headerData,
  followData,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [values, setValues] = useState<{ value: string; label: string }[]>([]);
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const { setHeaderData, setFooterData } = useContext(LayoutContext);

  useEffect(() => {
    setHeaderData(headerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerData]);

  useEffect(() => {
    setFooterData(footerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerData]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsNameValid(!!event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailValid(validateEmail(event.target.value));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!isNameValid || !isEmailValid || !data.form_id)
      setStatusMessage(
        "One or more fields have an error. Please check and try again."
      );
    else {
      try {
        const result = (await sendMessage({
          id: data.form_id,
          body: jsonToFormData({
            "your-name": name,
            "your-email": email,
            "your-message": message,
            "type-enquiry": type,
          }),
        })) as { data: { message: string } };
        setStatusMessage(result?.data?.message);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    statusMessage && setTimeout(() => setStatusMessage(""), 5000);
  }, [statusMessage]);

  useEffect(() => {
    if (!data.form[2].values) return;

    const transformedArray = data.form[2].values.map((item) => ({
      value: item,
      label: item,
    }));
    setValues(transformedArray);
    setType(transformedArray[0].value);
  }, [data]);

  return (
    <>
      <div
        className="w-full h-[200px] md:h-[330px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${data?.featured_image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="md:-mt-[70px] font-bold text-5xl text-white font-Din">
          {data?.title}
        </h2>
      </div>
      <div className="container">
        <div className="md:p-[30px] py-[20px] bg-white md:-mt-[70px] flex w-full flex-col tb:flex-row">
          <div className="tb:mr-[50px] w-full font-light text-lg leading-6 font-Din text-[#002c47]">
            <div
              className="text-content"
              dangerouslySetInnerHTML={{ __html: data?.content }}
            />
            <div className="flex flex-col md:flex-row items-center mt-[30px] gap-[15px] md:gap-[50px]">
              <label className="font-light text-lg leading-6 text-[#002c47] w-full md:w-1/3 font-Din pl-[15px]">
                {data.form[0].values[0]}
                <input
                  className="bg-[#EBEBEB] rounded-[10px] h-[45px] w-full font-Din mt-[10px] outline-none border focus:border-none px-[10px] -ml-[15px]"
                  value={name}
                  onChange={handleNameChange}
                />
              </label>
              <label className="font-light text-lg leading-6 text-[#002c47] w-full md:w-1/3 font-Din pl-[15px]">
                {data.form[1].values[0]}
                <input
                  className="bg-[#EBEBEB] rounded-[10px] h-[45px] w-full font-Din mt-[10px] outline-none border focus:border-none px-[10px] -ml-[15px]"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
              <div className="font-light text-lg leading-6 text-[#002c47] w-full md:w-1/3 font-Din pl-[15px]">
                {data.form[3].values[0]}
                <ContactSelect options={values} setType={setType} />
              </div>
            </div>
            <div className="flex flex-col md:flex-row mt-[15px] md:mt-[50px] gap-[15px] md:gap-[50px]">
              <label className="font-light text-lg leading-6 text-[#002c47] w-full md:w-2/3 font-Din pl-[15px]">
                {data.form[4].values[0]}
                <textarea
                  className="bg-[#EBEBEB] rounded-[10px] w-full font-Din mt-[10px] outline-none border focus:border-none p-[10px] -ml-[15px]"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>
              <div className="flex items-center">
                <ReCAPTCHA sitekey="Your client site key" />
              </div>
            </div>
            {statusMessage && (
              <div className="text-orange-600 mt-4">{statusMessage}</div>
            )}
            <button
              className="bg-[#D0E5F2] font-Din font-normal text-base text-[#002C47] px-[20px] py-[10px] rounded-[10px] transition-all duration-300 hover:bg-[#0071BC] hover:text-white mt-[15px] md:mt-[50px]"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <Loader customClass="w-6 h-6" />
              ) : (
                data.form[5].values[0]
              )}
            </button>
          </div>
          <div className="w-full flex flex-col-reverse md:flex-row justify-between tb:block tb:w-[360px] tb:min-w-[300px]">
            <div className="mt-[30px] tb:mt-[0]">
              <FollowBlock followData={followData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const lang = params?.lang;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion${
        lang === "zh" ? lang : ""
      }/v2/contact-page`
    );
    const data: Page = await response.json();

    const responseHeader = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion${
        lang === "zh" ? lang : ""
      }/v2/header`
    );
    const headerData: IHeader = await responseHeader.json();

    const responseFooter = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion${
        lang === "zh" ? lang : ""
      }/v2/footer`
    );
    const footerData: IFooter = await responseFooter.json();

    const responseFollow = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion${
        lang === "zh" ? lang : ""
      }/v2/follownextquestion`
    );
    const followData: IFooter = await responseFollow.json();

    return {
      props: {
        data,
        headerData,
        footerData,
        followData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
        headerData: null,
        footerData: null,
        followData: null,
      },
    };
  }
};

export default Contact;
