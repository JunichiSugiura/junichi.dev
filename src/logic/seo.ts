import profileImg from "public/profile.jpg";
export const canonical = "https://junichi.dev";

export const seo = {
  title: "Junichi パリ在住エンジニア🇫🇷",
  description:
    "エンジニア・OSS コントリビュータ💻 フランス・パリにあるLedgerという会社で暗号資産用のハードウェアウォレットを作っています。みなさんの暗号資産をできる限り安全に管理できるようにするのが仕事です。",
  canonical,
  openGraph: {
    type: "website",
    url: canonical,
    site_name: "junichi.dev",
    images: [
      {
        url: canonical + profileImg,
        alt: "Profile",
      },
    ],
  },
  twitter: {
    handle: "@JunichiSugiura",
    cardType: "summary_large_image",
  },
};
