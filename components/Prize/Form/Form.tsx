import React, { useEffect, useState } from "react";

export const Form = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setIsButtonDisabled(!emailValue);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleOrganizationChange = (event) => {
    setOrganization(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
        "mce-MMERGE1": firstName,
        "mce-MMERGE2": lastName,
        "mce-MMERGE3": organization,
      });
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
        className="flex flex-col md:flex-row gap-7 flex-wrap relative"
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
            placeholder="email"
            value={email}
            id="mce-EMAIL"
            onChange={handleEmailChange}
          />
          {!email && (
            <span className="text-[#F00] pt-2 mr-2 absolute top-1/2 -translate-y-1/2 left-[70px]">
              *
            </span>
          )}
        </label>
        <input
          className="w-full md:w-[211px] h-16 border not-italic font-normal text-lg leading-[22px] text-[#002C47] rounded-[20px] border-solid border-[rgba(0,0,0,0.2)] outline-none p-5"
          placeholder="First Name"
          value={firstName}
          id="mce-MMERGE1"
          onChange={handleFirstNameChange}
        />
        <input
          className="w-full md:w-[211px] h-16 border not-italic font-normal text-lg leading-[22px] text-[#002C47] rounded-[20px] border-solid border-[rgba(0,0,0,0.2)] outline-none p-5"
          placeholder="Last Name"
          id="mce-MMERGE2"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <input
          className="w-full md:w-[211px] h-16 border not-italic font-normal text-lg leading-[22px] text-[#002C47] rounded-[20px] border-solid border-[rgba(0,0,0,0.2)] outline-none p-5"
          placeholder="Organization"
          value={organization}
          id="mce-MMERGE3"
          onChange={handleOrganizationChange}
        />
        <input
          className="w-[145px] h-16 border text-lg text-white rounded-[20px] border-solid border-[rgba(54,54,54,0.2)] bg-[#002c47] cursor-pointer flex items-center justify-center disabled:opacity-60"
          disabled={isButtonDisabled}
          type="submit"
          name="subscribe"
          id="mc-embedded-subscribe"
          value="Subscribe"
        />
      </div>
    </form>
  );
};
