export type DescriptionKey = "description_az" | "description_en" | "description_ru";

export interface Project {
  id: number;
  title: string;
  description_az: string;
  description_en: string;
  description_ru: string;
  images: string[];
  tags: string[];
  url: string;
  github: string;
  featured: boolean;
  aspectRatio: string;
  category: string;
}
