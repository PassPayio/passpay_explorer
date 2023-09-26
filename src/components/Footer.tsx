import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from '../utils/common';

const Footer = () => {
  const router = useRouter();
  const {t} = useTranslation('common');
  return (
    <footer className="bg-[#1A202C]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-center w-fit h-[100px] ml-[5%]">
          <div className="flex flex-row pb-4 w-full">
            <div className="flex space-x-2 w-full text-sm text-white dark:text-gray-100 text-[14px] justify-between flex-wrap">
              <div>{`Copyright ${new Date().getFullYear()} PassPay Wallet.`} </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row text-[#A0ABC0] gap-4 mx-[5%] items-center py-10">
          <Link className="hover:text-white" href="https://pp.passpay.io/" target={"_blank"}>{t('privacy_policy')}</Link>  
          <Link className="hover:text-white" href="https://passpay.gitbook.io/li-yong-gui-yue/" target={"_blank"}>{t('terms_condition')}</Link>  
          <Link className="hover:text-white" href="https://passpay.gitbook.io/nidzuku-1/" target={"_blank"}>{t('spcified_commercial')}</Link>  
          <span>{t('contact_us')} support@passpay.io</span>  
        </div>
      </div>
    </footer>
  );
};

export default Footer;
