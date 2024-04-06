import { t } from "i18next";

export default function SubscriptionModal({ closeModal }: { closeModal: () => void }) {

    
    return <div className="rounded-[10px] bg-[#fff] p-6 tb:p-9 min-w-[300px]">
        <h3 className="font-Din font-bold text-[24px] tb:text-[45px]  text-center capitalize text-black tb:whitespace-nowrap">{t("Subscription modal title")}</h3>
        <h6 className="font-Din font-normal text-[18px] tb:text-2xl leading-6 capitalize text-[#8A8A8A] tb:whitespace-nowrap my-3 tb:my-10 text-center">{t("Subscription modal subtitle")}</h6>
        <div className="flex items-center justify-center mb-5">
            <input className="font-Din rounded-[10px_0px_0px_10px] border-2 border-solid border-[rgba(0,0,0,0.1)] w-full max-w-[420px] h-[40px] tb:h-[62px] outline-none p-3 tb:p-5 text-xl leading-5 capitalize placeholder:text-[#C9C9C9]" placeholder="efe" /> 
            <button className="font-Din rounded-[0px_10px_10px_0px] bg-[#0071BC] p-[10px] tb:p-[21px] h-[40px] tb:h-[62px]  font-bold text-[14px] tb:text-xl leading-5 uppercase text-white">{t('Subscribe')}</button>
        </div>
        <button className="font-Din block text-sm leading-6 capitalize text-[#8A8A8A] mx-auto underline" onClick={closeModal}>{t("No thanks")}</button>
    </div>
}