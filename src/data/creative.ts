import type { Media } from "@/lib/types";

/** Selected creative work — real YouTube videos on @uzaif_is_here. */
export interface CreativeVideo {
  title: string;
  idea: string;
  skills: string[];
  thumb: Media;
  url: string | null;
}

export const creativeVideos: CreativeVideo[] = [
  {
    title: "I ship apps for everyone except myself.",
    idea: "A developer's confession about building products for everyone else while putting your own on hold.",
    skills: ["Personal storytelling", "Product reflection", "Narrative structure"],
    thumb: {
      kind: "image",
      src: "/images/creative/ship-apps.jpg",
      alt: "Video: I ship apps for everyone except myself",
    },
    url: "https://www.youtube.com/watch?v=52eSRukpbUU",
  },
  {
    title: "Why I Wait for the Call to End Before I Text",
    idea: "Turning a tiny everyday habit into a larger observation about attention.",
    skills: ["Observing behaviour", "Audience empathy", "Narrative structure"],
    thumb: {
      kind: "image",
      src: "/images/creative/why-i-wait.jpg",
      alt: "Video: Why I Wait for the Call to End Before I Text",
    },
    url: "https://www.youtube.com/watch?v=Am4Vdgm7-10",
  },
  {
    title: "Why I can't stay consistent",
    idea: "An honest personal essay on the struggle to stay consistent — and what actually helps.",
    skills: ["Personal storytelling", "Script", "Visual direction", "Editing"],
    thumb: {
      kind: "image",
      src: "/images/creative/consistency.jpg",
      alt: "Video: Why I can't stay consistent",
    },
    url: "https://www.youtube.com/watch?v=_XebfLpFUDI",
  },
];
