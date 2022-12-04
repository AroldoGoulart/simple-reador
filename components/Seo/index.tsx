import Head from "next/head";
import React from "react";

const DEFAULT_SINOPSE = `IA generate a tree of percepton based in gaing of information`;
const DEFAULT_TITLE = `IA Percep`;

type PropsType = {
  title?: string;
  sinopse?: string;
  image?: string;
};

function MainSeo(props: PropsType) {
  const { title = DEFAULT_TITLE, sinopse = DEFAULT_SINOPSE } = props;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={sinopse}></meta>
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={sinopse} key="ogdesc" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="IA - Tree" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${title}`} />
      <meta name="twitter:description" content={sinopse} />
    </Head>
  );
}

export { MainSeo };
