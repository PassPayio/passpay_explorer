import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { AppConfig } from '@/utils/AppConfig';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          key="viewport"
        />
        <link
          rel="icon"
          sizes="192x192"
          href={`${router.basePath}/assets/images/passpay-logo-3d.webp`}
          key="icon32"
        />
        <link
          rel="shortcut icon"
          sizes="16x16"
          href={`${router.basePath}/assets/images/passpay-logo-3d.webp`}
        />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}//assets/images/passpay-logo-3d.webp`}
          key="apple"
        />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
        }}
      />
    </>
  );
};

export { Meta };
