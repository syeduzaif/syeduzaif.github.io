import type { Media } from "@/lib/types";

/**
 * Creative work presented as observations that became stories — one personal
 * story, one developer/product reflection, and one clearly-reserved slot for
 * the product-building video (Stupid Alarm dev series), so the section shows a
 * balanced set rather than three unrelated personal videos.
 *
 * `url: null` renders as a labelled future slot. No YouTube iframes load on
 * the page — stills only; videos open on YouTube after interaction.
 */
export interface CreativeVideo {
  /** The observation the piece started from, phrased as the question it asks. */
  observation: string;
  title: string;
  /** One line on where the story goes. */
  idea: string;
  /** The medium/format of the piece. */
  medium: string;
  /** What this piece demonstrates — the skill/quality it's evidence of. */
  demonstrates: string;
  skills: string[];
  thumb: Media;
  url: string | null;
  /** A deliberately-reserved future slot (not yet produced). */
  reserved?: boolean;
}

export const creativeVideos: CreativeVideo[] = [
  {
    observation:
      "Why do people wait for a call to end before sending a text?",
    title: "Why I Wait for the Call to End Before I Text",
    idea: "A tiny everyday habit, followed until it becomes an observation about attention.",
    medium: "Personal video essay",
    demonstrates: "Human observation and narrative structure",
    skills: ["Observing behaviour", "Audience empathy", "Story structure"],
    thumb: {
      kind: "image",
      src: "/images/creative/why-i-wait.jpg",
      alt: "Video still: Why I Wait for the Call to End Before I Text",
    },
    url: "https://www.youtube.com/watch?v=Am4Vdgm7-10",
  },
  {
    observation: "Why do builders ship for everyone except themselves?",
    title: "I ship apps for everyone except myself.",
    idea: "A developer's confession about building products for everyone else while putting your own on hold.",
    medium: "Developer reflection",
    demonstrates: "Product reflection and technical communication",
    skills: ["Product reflection", "Personal storytelling", "Narrative structure"],
    thumb: {
      kind: "image",
      src: "/images/creative/ship-apps.jpg",
      alt: "Video still: I ship apps for everyone except myself",
    },
    url: "https://www.youtube.com/watch?v=52eSRukpbUU",
  },
  {
    observation: "Can an alarm demand proof that you're actually awake?",
    title: "Stupid Alarm — building in public",
    idea: "The build story behind the behavioural alarm experiment: the hypothesis, the sensor problem, and what breaks.",
    medium: "Build-in-public dev series",
    demonstrates: "Building in public and product ideation",
    skills: ["Building in public", "Product ideation", "Technical communication"],
    // TODO(asset): drop a thumbnail at public/images/creative/stupid-alarm-dev.jpg
    thumb: {
      kind: "placeholder",
      label: "Dev series",
      tone: "orange",
      feature: "Stupid Alarm — building in public",
    },
    url: null,
    reserved: true,
  },
];
