export type TitleType = { english: string; romaji: string };
export type AnimeType = {
  id: number;
  title: TitleType;
  coverImage: { large: string };
  siteUrl: string;
};
