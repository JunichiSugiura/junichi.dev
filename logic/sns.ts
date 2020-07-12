export const accounts = {
  youtube: {
    channelName: "Junichi パリ在住エンジニア",
    link: "https://www.youtube.com/channel/UC9IdI7wrSz9S3y5QxHvFseg",
  },
  twitter: {
    mention: "@JunichiSugiura",
    link: "https://twitter.com/JunichiSugiura",
  },
  github: {
    mention: "@JunichiSugiura",
    link: "http://github.com/JunichiSugiura",
  },
  instagram: {
    mention: "@junichisugiura_",
    link: "https://www.instagram.com/junichisugiura_/",
  },
};

export function getThumbnailLink(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}
