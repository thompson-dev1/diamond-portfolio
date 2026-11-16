import { photos } from "./photos";

export type GalleryCategory = "Editorial" | "Campaigns" | "Beauty" | "Runway";

export interface GalleryItem {
  id: string;
  src: string;
  images: string[];
  alt: string;
  category: GalleryCategory;
  caption?: string;
  aspect?: "tall" | "wide" | "square";
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: photos.blackDressPortrait,
    images: [photos.blackDressPortrait, photos.blackDressStanding, photos.blackDressSeated],
    alt: "Light & Shadow",
    category: "Editorial",
    caption:
      "Hard side light cuts across the studio and traces the outline of a black dress. I move between an upright silhouette and relaxed seated poses, changing how the dress falls and how the shadows frame it. The sharp light makes small shifts in posture and expression more noticeable.",
    aspect: "tall",
  },
  {
    id: "g2",
    src: photos.goldAccentsPortrait,
    images: [photos.goldAccentsPortrait],
    alt: "Golden Glow",
    caption:
      "Gold earrings and stacked bangles frame my face in this warm studio close-up. I rest my elbows on a white plinth and bring my hands up to my cheeks, creating a frame around my makeup and expression. The spotlight catches the gold details and gives the portrait its warmth.",
    category: "Beauty",
    aspect: "wide",
  },
  {
    id: "g3",
    src: photos.glassDoorPortrait,
    images: [photos.glassDoorPortrait, photos.drivewayPortrait, photos.goldenHourDriveway, photos.gardenDressDetail],
    alt: "Sunlit Elegance",
    category: "Campaigns",
    caption:
      "An ivory dress carries this series from sunlit glass doors to a driveway and garden. The wider portraits show the silhouette of the dress against a dark SUV and outdoor greenery. Closer frames pick up the folds in the fabric and the way sunlight crosses the dress.",
    aspect: "tall",
  },
  {
    id: "g4",
    src: photos.redDressStudio,
    images: [photos.redDressStudio],
    alt: "Crimson Silhouette",
    category: "Runway",
    caption:
      "A fitted red evening gown is the focus of this studio portrait. I turn my shoulders and lift my gaze so the warm spotlight catches the neckline and the shape of the fabric. The plain studio backdrop draws attention to the gown’s bold colour and clean silhouette.",
    aspect: "square",
  },
  {
    id: "g5",
    src: photos.warmInteriorPortrait,
    images: [photos.warmInteriorPortrait, photos.ivoryOneShoulder, photos.yellowGownHallway],
    alt: "Radiant Portraits",
    category: "Beauty",
    caption:
      "Three looks in magenta, ivory, and soft yellow bring different moods to warm indoor settings. I take a low, relaxed pose in the magenta look, then stand for the two gowns so their drape is visible. The portraits explore how colour and posture can change the feel of a frame.",
    aspect: "tall",
  },
  {
    id: "g6",
    src: photos.whiteSuitStanding,
    images: [photos.whiteSuitStanding, photos.whiteSuitSeated],
    alt: "Tailored in White",
    category: "Editorial",
    caption:
      "A white suit and graduation cap stand out against a muted olive backdrop. The standing portrait shows the cut of the jacket and trousers, while the seated frame brings my expression forward. Together, the two portraits mark my graduation with a formal look that still feels personal.",
    aspect: "tall",
  },
];

export const campaigns = [
  {
    id: "c1",
    brand: "Sunlit Elegance",
    image: photos.glassDoorPortrait,
    alt: "Ivory dress against glass doors in afternoon light",
    position: "center 32%",
  },
  {
    id: "c2",
    brand: "Golden Hour",
    image: photos.drivewayPortrait,
    alt: "Ivory dress beside a dark SUV in a sunlit driveway",
    position: "center 38%",
  },
  {
    id: "c3",
    brand: "Studio Series",
    image: photos.goldAccentsPortrait,
    alt: "Warm studio portrait with gold earrings and bangles",
    position: "center 34%",
  },
  {
    id: "c4",
    brand: "Crimson Collection",
    image: photos.redDressStudio,
    alt: "Red evening dress under a studio spotlight",
    position: "center top",
  },
];
