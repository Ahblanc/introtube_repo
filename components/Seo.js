import Head from "next/head";

export default function Seo({ title }) {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.png" />
      <title>{`${title} | Introtube - Introduce Youtuber`}</title>
      <meta
        name="naver-site-verification"
        content="8e8434b4505649abaeca687ec5f72fe9f93db281"
      />
      <meta
        name="description"
        content="introtube! introduce your youtuber! 유튜버 카테고리별 직접 설정 및 검색. 채널들을 직접 관리하세요~"
      />
    </Head>
  );
}
