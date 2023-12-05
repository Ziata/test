import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

export const Form = ({ status, message, onValidated }) => {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setIsButtonDisabled(
      !emailValue || !firstName || !lastName || !organization
    );
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setIsButtonDisabled(
      !email || !event.target.value || !lastName || !organization
    );
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setIsButtonDisabled(
      !email || !firstName || !event.target.value || !organization
    );
  };

  const handleOrganizationChange = (event) => {
    setOrganization(event.target.value);
    setIsButtonDisabled(
      !email || !firstName || !lastName || !event.target.value
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email &&
      email.indexOf("@") > -1 &&
      firstName &&
      lastName &&
      organization
    ) {
      onValidated({
        EMAIL: email,
        "mce-MMERGE1": firstName,
        "mce-MMERGE2": lastName,
        "mce-MMERGE3": organization,
      });
    }
  };

  useEffect(() => {
    if (status === "success") clearFields();
  }, [status]);

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setOrganization("");
  };

  return (
    <form
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      target="_blank"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div
        className="flex flex-col md:flex-row gap-5 flex-wrap relative"
        id="mc_embed_signup_scroll"
      >
        <div className="relative md:absolute left-1/2 -translate-x-1/2 md:top-[-60px]">
          {status === "sending" && (
            <div className="text-[#4abf42]">sending...</div>
          )}
          {status === "error" && (
            <div
              className="text-[#bf4242]"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          {status === "success" && (
            <div
              className="text-[#4abf42]"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
        </div>
        <label className="relative">
          <input
            className="w-full md:w-[211px] h-16 border not-italic font-normal text-lg leading-[22px] text-[#002C47] rounded-[20px] border-solid border-[rgba(0,0,0,0.2)] outline-none p-5"
            placeholder={t(`Email`)}
            value={email}
            id="mce-EMAIL"
            onChange={handleEmailChange}
          />
          {!email && (
            <span className="text-[#F00] pt-2 mr-2 absolute top-1/2 -translate-y-1/2 left-[10px]">
              *
            </span>
          )}
        </label>
        <label className="relative">
          <input
            className="w-full md:w-[211px] h-16 border not-italic font-normal text-lg leading-[22px] text-[#002C47] rounded-[20px] border-solid border-[rgba(0,0,0,0.2)] outline-none p-5"
            placeholder={t(`first name`)}
            value={firstName}
            id="mce-MMERGE1"
            onChange={handleFirstNameChange}
          />
          {!firstName && (
            <span className="text-[#F00] pt-2 mr-2 absolute top-1/2 -translate-y-1/2 left-[10px]">
              *
            </span>
          )}
        </label>
        <label className="relative">
          <input
            className="w-full md:w-[211px] h-16 border not-italic font-normal text-lg leading-[22px] text-[#002C47] rounded-[20px] border-solid border-[rgba(0,0,0,0.2)] outline-none p-5"
            placeholder={t(`last name`)}
            id="mce-MMERGE2"
            value={lastName}
            onChange={handleLastNameChange}
          />
          {!lastName && (
            <span className="text-[#F00] pt-2 mr-2 absolute top-1/2 -translate-y-1/2 left-[10px]">
              *
            </span>
          )}
        </label>
        <label className="relative">
          <input
            className="w-full md:w-[211px] h-16 border not-italic font-normal text-lg leading-[22px] text-[#002C47] rounded-[20px] border-solid border-[rgba(0,0,0,0.2)] outline-none p-5"
            placeholder={t(`organization`)}
            value={organization}
            id="mce-MMERGE3"
            onChange={handleOrganizationChange}
          />
          {!organization && (
            <span className="text-[#F00] pt-2 mr-2 absolute top-1/2 -translate-y-1/2 left-[10px]">
              *
            </span>
          )}
        </label>
        <input
          className="w-[145px] h-16 border text-lg text-white rounded-[20px] border-solid bg-[#002c47] border-[rgba(54,54,54,0.2)] disabled:bg-[#B5B5B5] flex items-center justify-center disabled:opacity-60 hover:opacity-80 transition-all duration-300 cursor-pointer"
          disabled={isButtonDisabled}
          type="submit"
          name="subscribe"
          id="mc-embedded-subscribe"
          value={t(`subscribe`)}
        />
      </div>
    </form>
  );
};
