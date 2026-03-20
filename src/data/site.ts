import type {
  AboutSection,
  BrandDigest,
  Category,
  ContentBundle,
  FaqItem,
  GalleryItem,
  Product,
  ProductImage,
  SiteSettings,
} from "@/lib/types";

const placeholderPrice = "TODO: Add retail price";
const placeholderCare =
  "TODO: Confirm official care instructions. Interim suggestion: keep surfaces dry, dust with a soft cloth, and replace scratching panels when worn.";
const placeholderPurchaseNote =
  "TODO: Replace the inquiry link with the final Amazon or marketplace URL for this product.";

const inquiryLink = (label: string) =>
  `mailto:sales@tayen.com.tw?subject=${encodeURIComponent(`Anikitty product inquiry: ${label}`)}`;

const catalogImages = (...pages: Array<{ file: string; alt: string }>): ProductImage[] =>
  pages.map((page, index) => ({
    id: `${page.file}-${index + 1}`,
    image_url: `/images/catalog/${page.file}`,
    alt_text: page.alt,
    sort_order: index,
    is_placeholder: true,
  }));

const categories: Category[] = [
  {
    id: "household-furniture",
    name: "Cat Household Furniture",
    slug: "cat-household-furniture",
    description:
      "Furniture-minded enclosures, modular storage, and home-friendly forms designed to blend into living spaces while still serving cats well.",
    image_url: "/images/catalog/page-03.png",
    eyebrow: "Category 01",
    hero_title: "Shared-living furniture for cats and people.",
    hero_body:
      "The catalog frames this range as the bridge between practical cat care and a calm interior language. Use it for litter concealment, hiding spaces, scratching, and vertical exploration without leaning into toy-like styling.",
    feature_bullets: [
      "Furniture-style silhouettes inspired by storage and shelving pieces",
      "Scratchable surfaces and enclosed spaces for daily cat behavior",
      "Ideal for homeowners who care about aesthetics as much as pet function",
    ],
  },
  {
    id: "house-scratcher-post",
    name: "Cat House & Scratcher Post",
    slug: "cat-house-scratcher-post",
    description:
      "Cubed hideaways, bed platforms, posts, and tunnels that put scratching and lounging into compact shapes.",
    image_url: "/images/catalog/page-04.png",
    eyebrow: "Category 02",
    hero_title: "Compact nests with scratching built in.",
    hero_body:
      "This family centers on simple volumes and approachable forms: cubes, ramps, posts, and beds that fit into everyday corners while still offering satisfying scratch zones.",
    feature_bullets: [
      "Corrugated scratching surfaces built into usable forms",
      "Compact footprints for apartments and smaller rooms",
      "Mix of hideaway, sleep, and activity-driven shapes",
    ],
  },
  {
    id: "cat-scratcher",
    name: "Cat Scratcher",
    slug: "cat-scratcher",
    description:
      "Standalone scratch boards, ramps, beds, and slim formats with a softer visual presence for modern homes.",
    image_url: "/images/catalog/page-05.png",
    eyebrow: "Category 03",
    hero_title: "Scratch surfaces that still feel considered.",
    hero_body:
      "The scratcher range leans into the brand's practical side: highly usable scratch formats that sit more quietly in the home through restrained materials, neutral tones, and clean geometry.",
    feature_bullets: [
      "Flat, ramped, curved, and bed-style scratcher formats",
      "Designed to layer into the home instead of dominate it",
      "Easy to refresh and expand as cats' habits change",
    ],
  },
  {
    id: "floating-series",
    name: "Floating Series",
    slug: "floating-series",
    description:
      "Wall and cage-mounted scratchers and stepping surfaces that create vertical movement paths without heavy floor footprint.",
    image_url: "/images/catalog/page-06.png",
    eyebrow: "Category 04",
    hero_title: "Vertical routes for active cats.",
    hero_body:
      "This series uses steel tube brackets and floating forms to open up play, jumping, and perching opportunities on walls or cat cages. It is the most architectural family in the catalog.",
    feature_bullets: [
      "Wall and cage compatible floating scratch platforms",
      "Sophisticated steel bracket structure noted in the catalog",
      "Supports layered routes and enrichment without bulky furniture",
    ],
  },
  {
    id: "jumping-platform",
    name: "Cat Jumping Platform",
    slug: "cat-jumping-platform",
    description:
      "Steel and stair-style platforms that encourage climbing, stepping, and display-worthy vertical composition.",
    image_url: "/images/catalog/page-07.png",
    eyebrow: "Category 05",
    hero_title: "Cat steps as furniture elements.",
    hero_body:
      "Anikitty presents jumping platforms as more than pet accessories. The category is positioned as shared furniture that adds movement for cats and sculptural rhythm to a room.",
    feature_bullets: [
      "Steel frame options in multiple heights",
      "Stair configurations for gradual climbing and perching",
      "Designed to feel intentional in the home",
    ],
  },
  {
    id: "accessories",
    name: "Accessories & Gift Sets",
    slug: "accessories-gift-sets",
    description:
      "Supporting items, corner scratchers with bases, and gift-ready packs for retail or promotional programs.",
    image_url: "/images/catalog/page-08.png",
    eyebrow: "Category 06",
    hero_title: "Finishing pieces for gifting and add-on sales.",
    hero_body:
      "The final catalog page rounds out the line with smaller-format products and retail-ready extras that can support gifting, impulse purchases, or bundle merchandising.",
    feature_bullets: [
      "Compact formats for add-on retail programs",
      "Gift-ready packaging opportunities",
      "Useful for merchandising and seasonal promotions",
    ],
  },
];

const products: Product[] = [
  {
    id: "ank020",
    sku: "ANK020",
    slug: "ank020-litter-box-enclosure-side-passage",
    name: "Litter Box Enclosure, Side Passage",
    category_id: "household-furniture",
    short_description:
      "Furniture-style litter box enclosure with a discreet side entry and calm, storage-led proportions.",
    full_description:
      "Based on the 2024 catalog, ANK020 brings concealment and home integration together. It is positioned for households that want a cat care essential to read more like furniture than pet gear. TODO: confirm finish options and internal clean-out details.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK020 Litter Box Enclosure, Side Passage"),
    featured: true,
    materials:
      "GBoard paper board body. TODO: confirm final surface finish, inner panel treatment, and scratch panel specification.",
    dimensions: "91 x 52 x 43 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Conceals a litter zone inside a furniture-like form",
      "Side passage keeps the front elevation cleaner",
      "Suitable for design-conscious shared spaces",
    ],
    tags: ["featured", "litter enclosure", "shared living"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-03.png", alt: "Catalog lifestyle composition showing household furniture. TODO: replace with dedicated ANK020 photography." },
      { file: "page-01.png", alt: "Anikitty catalogue cover image used as a temporary brand lifestyle image." },
      { file: "page-02.png", alt: "Catalog materials page used as a temporary product context image." },
    ),
  },
  {
    id: "ank143",
    sku: "ANK143",
    slug: "ank143-cat-house-for-kallax",
    name: "Cat House for KALLAX",
    category_id: "household-furniture",
    short_description:
      "A cubed cat house insert designed for shelf-style living furniture systems.",
    full_description:
      "The catalog positions ANK143 as a KALLAX-friendly cat house, making it especially useful for homes that want cat territory built into existing storage. TODO: confirm exact compatibility notes and included panels.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK143 Cat House for KALLAX"),
    featured: true,
    materials:
      "GBoard body with corrugated scratching face. TODO: confirm insert structure and color options.",
    dimensions: "33 x 38 x 33 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Shelf-system friendly sizing",
      "Integrated scratch surface",
      "Lets cat spaces disappear into furniture arrangements",
    ],
    tags: ["featured", "modular", "kallax"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-03.png", alt: "Household furniture catalog image. TODO: replace with direct ANK143 photography." },
      { file: "page-04.png", alt: "Cat house and scratcher catalog page used as supporting imagery." },
    ),
  },
  {
    id: "ank154",
    sku: "ANK154",
    slug: "ank154-hollow-cat-tower",
    name: "Hollow Cat Tower",
    category_id: "household-furniture",
    short_description:
      "A geometric tower format that adds cubby-style play and vertical interest in a smaller footprint.",
    full_description:
      "ANK154 appears in the household furniture section as a hollow tower with playful openings. It works as a vertical accent piece for cats that like peeking, climbing, and short perches. TODO: confirm exact load capacity and assembly details.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK154 Hollow Cat Tower"),
    featured: false,
    materials:
      "GBoard body. TODO: confirm scratch surface coverage and whether pads are replaceable.",
    dimensions: "42 x 38 x 74 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Vertical play in a compact cube-and-cutout form",
      "Suitable as a statement accent near shelving or seating",
      "Designed for cats that alternate between hiding and surveying",
    ],
    tags: ["tower", "vertical"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-03.png", alt: "Household furniture catalog page showing ANK154 in the product grid. TODO: replace with direct imagery." },
      { file: "page-07.png", alt: "Jumping platform catalog page used as secondary vertical-living imagery." },
    ),
  },
  {
    id: "ank104",
    sku: "ANK104",
    slug: "ank104-cat-scratcher-tunnel",
    name: "Cat Scratcher Tunnel",
    category_id: "house-scratcher-post",
    short_description:
      "A tunnel-style hideaway with wraparound scratching appeal and a bolder profile.",
    full_description:
      "ANK104 blends hide-and-scratch behavior into a single piece. It is a useful option for cats that rotate between enclosed resting, playful peeking, and active scratching. TODO: confirm tunnel opening dimensions and replaceable parts.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK104 Cat Scratcher Tunnel"),
    featured: true,
    materials:
      "GBoard body with corrugated scratch surfaces. TODO: confirm edge finish and pad replacement details.",
    dimensions: "41 x 26 x 26 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Tunnel play and scratch behavior in one form",
      "Compact enough for living rooms, corners, or bedrooms",
      "A stronger sculptural silhouette than a flat board",
    ],
    tags: ["featured", "tunnel", "scratcher"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-04.png", alt: "Cat house and scratcher catalog page used as the primary ANK104 placeholder image." },
      { file: "page-01.png", alt: "Catalog cover lifestyle image used as a supporting home scene." },
    ),
  },
  {
    id: "ank031",
    sku: "ANK031",
    slug: "ank031-scratcher-cube",
    name: "Scratcher Cube",
    category_id: "house-scratcher-post",
    short_description:
      "A simple cube hideaway with a round opening and integrated scratch zones.",
    full_description:
      "ANK031 is one of the cleanest silhouettes in the house and post family. It reads like an approachable everyday nest that can sit beside seating, storage, or window zones. TODO: confirm panel finishes and weight recommendation.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK031 Scratcher Cube"),
    featured: false,
    materials:
      "GBoard body with corrugated scratch face. TODO: confirm finish variants.",
    dimensions: "34 x 30 x 32 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Simple cube format for easy placement",
      "Hideaway and scratching in a single object",
      "Works as a low-profile accent in refined interiors",
    ],
    tags: ["cube", "hideaway"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-04.png", alt: "Cat house and scratcher catalog page used as the ANK031 placeholder image." },
      { file: "page-03.png", alt: "Household furniture catalog page used as supporting imagery." },
    ),
  },
  {
    id: "ank003b",
    sku: "ANK003-B",
    slug: "ank003-b-cat-scratcher-ramp-b-blue",
    name: "Cat Scratcher Ramp B (Blue)",
    category_id: "cat-scratcher",
    short_description:
      "A ramped scratcher that invites stretching, lounging, and easier access for cats that prefer an incline.",
    full_description:
      "ANK003-B adds a gentle angle to the scratcher lineup, making it useful for cats that enjoy incline scratching or stepping. It also carries more sculptural presence than a flat pad. TODO: confirm whether this format is fold-flat or fixed.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK003-B Cat Scratcher Ramp B (Blue)"),
    featured: true,
    materials:
      "Corrugated scratching panel with structural supports. TODO: confirm finish and anti-slip details.",
    dimensions: "44 x 27 x 19.5 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Inclined geometry supports stretch scratching",
      "Can double as a casual lounge surface",
      "Stronger visual presence for styled corners or window zones",
    ],
    tags: ["featured", "ramp", "lounging"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-05.png", alt: "Cat scratcher catalog page used as the ANK003-B placeholder image." },
      { file: "page-01.png", alt: "Anikitty cover image used as a supporting lifestyle scene." },
    ),
  },
  {
    id: "ank156",
    sku: "ANK156",
    slug: "ank156-curved-cat-bed",
    name: "Curved Cat Bed",
    category_id: "cat-scratcher",
    short_description:
      "A curved lounge form that encourages light scratching and relaxed resting in the same silhouette.",
    full_description:
      "ANK156 is cataloged as a curved cat bed. It brings a softer, furniture-adjacent profile to the scratcher family and is a good match for cats that alternate between loafing and low-intensity scratching. TODO: confirm cushion-free surface notes.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK156 Curved Cat Bed"),
    featured: true,
    materials:
      "Corrugated paper scratch surface. TODO: confirm underside finish and whether refill pads are included.",
    dimensions: "42.5 x 24 x 7 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Curved ergonomic lounging shape",
      "Reads softly in minimalist interiors",
      "Useful for cats that prefer low and open resting spots",
    ],
    tags: ["featured", "bed", "curved"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-05.png", alt: "Cat scratcher catalog page used as the ANK156 placeholder image." },
      { file: "page-08.png", alt: "Accessories page used as supporting bed-form imagery." },
    ),
  },
  {
    id: "ank166",
    sku: "ANK166",
    slug: "ank166-ultra-thin-cat-scratcher-ramp-ab-blue",
    name: "Ultra Thin Cat Scratcher Ramp (AB Blue)",
    category_id: "cat-scratcher",
    short_description:
      "A lower-profile ramp scratcher that keeps the visual weight lighter while retaining the incline cats enjoy.",
    full_description:
      "ANK166 keeps the appeal of a ramp while slimming the overall mass. It is a strong fit for pared-back interiors that want a useful cat object with less visual bulk. TODO: confirm exact color and base details.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK166 Ultra Thin Cat Scratcher Ramp (AB Blue)"),
    featured: false,
    materials:
      "Corrugated scratching panel with slim support structure. TODO: confirm anti-slip treatment.",
    dimensions: "44 x 27 x 19.5 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Slimmer ramp profile for cleaner visual integration",
      "Designed for stretch scratching and lounging",
      "Useful beside windows, sofas, or reading chairs",
    ],
    tags: ["ramp", "ultra thin"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-05.png", alt: "Cat scratcher catalog page used as the ANK166 placeholder image." },
      { file: "page-01.png", alt: "Catalog cover used as a warm lifestyle backup image." },
    ),
  },
  {
    id: "ank1611",
    sku: "ANK161-1",
    slug: "ank161-1-floating-scratcher-for-wall-large",
    name: "Floating Scratcher for Wall, Large",
    category_id: "floating-series",
    short_description:
      "A wide floating wall scratcher that doubles as a stepping point and scratching zone.",
    full_description:
      "ANK161-1 is one of the strongest architectural pieces in the collection. It can help create a more intentional cat route across a wall while keeping the overall setup visually light. TODO: confirm wall load requirements and installation guide.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK161-1 Floating Scratcher for Wall, Large"),
    featured: true,
    materials:
      "Corrugated scratching surface with steel bracket support. TODO: confirm finish colors and included hardware.",
    dimensions: "48 x 18 x 4 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Acts as both scratcher and step",
      "Pairs well with vertical route planning",
      "Minimal structure keeps it visually light",
    ],
    tags: ["featured", "wall mount", "platform"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-06.png", alt: "Floating series catalog page used as the ANK161-1 placeholder image." },
      { file: "page-02.png", alt: "Catalog materials page used as supporting construction imagery." },
    ),
  },
  {
    id: "ank0541",
    sku: "ANK054-1",
    slug: "ank054-1-floating-scratcher-for-wall-triangle",
    name: "Floating Scratcher for Wall, Triangle",
    category_id: "floating-series",
    short_description:
      "A triangular floating surface for cats that like angled stepping points and compact wall layouts.",
    full_description:
      "ANK054-1 introduces a triangular geometry to the floating series, which makes route-building feel more composed and less repetitive. It is especially useful in tighter wall plans. TODO: confirm whether left and right orientations are available.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK054-1 Floating Scratcher for Wall, Triangle"),
    featured: false,
    materials:
      "Corrugated scratching surface with metal bracket support. TODO: confirm bracket finish.",
    dimensions: "30 x 30 x 4 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Angular geometry adds variety to wall routes",
      "Works in compact wall arrangements",
      "Useful as a secondary stepping point near larger platforms",
    ],
    tags: ["triangle", "wall mount"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-06.png", alt: "Floating series catalog page used as the ANK054-1 placeholder image." },
      { file: "page-07.png", alt: "Jumping platform page used as supporting route-building imagery." },
    ),
  },
  {
    id: "ank066m",
    sku: "ANK066-M",
    slug: "ank066-m-steel-jumping-platform-medium",
    name: "Steel Jumping Platform Medium",
    category_id: "jumping-platform",
    short_description:
      "A steel-frame platform that behaves like a compact side table for cats, with an airy architectural profile.",
    full_description:
      "ANK066-M is a medium jumping platform in the steel series. The catalog positions this family as a piece of furniture for both people and cats, which makes it especially suitable for design-led homes. TODO: confirm frame finish and weight rating.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK066-M Steel Jumping Platform Medium"),
    featured: true,
    materials:
      "Steel frame with platform surface. TODO: confirm top material and available colors.",
    dimensions: "37.5 x 33.5 x 68.5 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Furniture-like steel frame silhouette",
      "Supports stepping, perching, and room layering",
      "Feels lighter than bulkier cat trees",
    ],
    tags: ["featured", "steel", "jumping"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-07.png", alt: "Cat jumping platform catalog page used as the ANK066-M placeholder image." },
      { file: "page-01.png", alt: "Catalog cover used as a lifestyle support image." },
    ),
  },
  {
    id: "ank153",
    sku: "ANK153",
    slug: "ank153-cat-jumping-platform-5f",
    name: "Cat Jumping Platform 5F",
    category_id: "jumping-platform",
    short_description:
      "A taller multi-level platform for homes that want more height without resorting to plush cat-tree styling.",
    full_description:
      "ANK153 is one of the most vertical furniture-style pieces in the catalog. It offers multiple stop-off points and reads more like a narrow shelving form than a conventional pet tower. TODO: confirm final material stack-up and anchoring requirements.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK153 Cat Jumping Platform 5F"),
    featured: true,
    materials:
      "Structured multi-level platform body. TODO: confirm finish options and whether anti-slip surfaces are included.",
    dimensions: "58 x 28.5 x 154.5 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Tall, shelf-like vertical silhouette",
      "Multiple perching opportunities in one footprint",
      "Suitable for cats that enjoy observation points",
    ],
    tags: ["featured", "tower", "multi-level"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-07.png", alt: "Cat jumping platform catalog page used as the ANK153 placeholder image." },
      { file: "page-03.png", alt: "Household furniture page used as supporting home-integration imagery." },
    ),
  },
  {
    id: "ank178",
    sku: "ANK178",
    slug: "ank178-cylinder-corner-cat-scratcher-with-base",
    name: "Cylinder Corner Cat Scratcher with Base",
    category_id: "accessories",
    short_description:
      "A corner-friendly cylinder scratcher with base support for easy placement against walls or edges.",
    full_description:
      "ANK178 extends the line into more compact add-on pieces. It is a useful choice for retail bundles, corner placement, or homes that want a straightforward upright scratch option. TODO: confirm base finish and replacement surface details.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK178 Cylinder Corner Cat Scratcher with Base"),
    featured: false,
    materials:
      "Corrugated cylinder scratch surface with support base. TODO: confirm base material and colors.",
    dimensions: "20 x 20 x 74 cm",
    care_instructions: placeholderCare,
    highlights: [
      "Compact upright scratch solution",
      "Useful for corners and tighter circulation edges",
      "Strong add-on or bundle candidate",
    ],
    tags: ["accessory", "upright scratcher"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-08.png", alt: "Accessories page used as the ANK178 placeholder image." },
      { file: "page-04.png", alt: "Cat house and scratcher page used as supporting scratcher imagery." },
    ),
  },
  {
    id: "ank190",
    sku: "ANK190",
    slug: "ank190-silver-gift-box",
    name: "Silver Gift Box (2 g x 20)",
    category_id: "accessories",
    short_description:
      "A retail-ready gift set format suited to bundles, promotions, or seasonal merchandising.",
    full_description:
      "ANK190 is presented as a silver gift box on the final catalog page. It signals that the brand can support giftable retail programs in addition to furniture and scratcher formats. TODO: confirm what is included in the box and final retail copy.",
    displayed_price: placeholderPrice,
    external_link: inquiryLink("ANK190 Silver Gift Box"),
    featured: false,
    materials:
      "Gift box packaging with included contents. TODO: confirm exact insert materials and product composition.",
    dimensions: "56.5 x 11 x 3.5 cm",
    care_instructions: "TODO: Add handling and storage instructions for the gift box product.",
    highlights: [
      "Giftable and retail-display friendly",
      "Supports merchandising programs beyond core furniture",
      "Good fit for promotions and seasonal campaigns",
    ],
    tags: ["gift box", "retail"],
    notes: [placeholderPurchaseNote],
    product_images: catalogImages(
      { file: "page-08.png", alt: "Accessories page used as the ANK190 placeholder image." },
      { file: "page-02.png", alt: "Company and materials catalog page used as supporting brand context imagery." },
    ),
  },
];

const faqItems: FaqItem[] = [
  {
    id: "faq-materials",
    question: "What are Anikitty products made from?",
    answer:
      "The catalog highlights GBoard, a recycled-paper-based board material, along with corrugated paper scratching surfaces. It also notes low-toxicity material choices, PU coating for water resistance, and recyclable material positioning. TODO: confirm product-by-product material details before launch.",
    sort_order: 1,
  },
  {
    id: "faq-brand-origin",
    question: "Where is the brand based?",
    answer:
      "Anikitty is presented as a brand from Taiwan created by Ta Yen Paper Box Container Co., Ltd., a paper-products manufacturer founded in 1975.",
    sort_order: 2,
  },
  {
    id: "faq-purchase",
    question: "Do I buy directly on this website?",
    answer:
      "No. This site is designed as a brand and product discovery experience. Final purchase is intended to happen through external platforms such as Amazon or through direct inquiry links. TODO: add final marketplace URLs.",
    sort_order: 3,
  },
  {
    id: "faq-oem",
    question: "Do you offer OEM, ODM, or wholesale support?",
    answer:
      "Yes. The catalog explicitly mentions OEM, ODM, and OBM service modes, including design collaboration and direct import support. Use the contact page for wholesale or brand partnership inquiries.",
    sort_order: 4,
  },
  {
    id: "faq-images",
    question: "Are all product images final?",
    answer:
      "Not yet. Several product pages currently use catalog-based placeholder imagery so the structure is ready for launch. TODO: replace placeholders with dedicated product photography before publishing.",
    sort_order: 5,
  },
];

const aboutSections: AboutSection[] = [
  {
    id: "about-heritage",
    section_title: "Paper-craft heritage, reimagined for cat living",
    section_body:
      "The catalog traces Anikitty back to Ta Yen Paper Box Container Co., Ltd., a Taiwan-based paper manufacturer founded in 1975. That manufacturing background gives the brand a more grounded, material-led point of view than generic pet furniture brands.",
    image_url: "/images/catalog/page-02.png",
    sort_order: 1,
  },
  {
    id: "about-home",
    section_title: "Designed for shared spaces",
    section_body:
      "One of the clearest catalog messages is that cats are family, and the home should feel harmonious for both people and cats. The products are positioned not as novelty pet pieces, but as thoughtful furniture that respects the room around it.",
    image_url: "/images/catalog/page-03.png",
    sort_order: 2,
  },
  {
    id: "about-material",
    section_title: "Material responsibility without losing function",
    section_body:
      "Anikitty's material story centers on GBoard and recycled paper construction, with attention to non-toxic choices, recyclability, and water resistance. The result is a line that aims to feel both practical and considered.",
    image_url: "/images/catalog/page-06.png",
    sort_order: 3,
  },
];

const galleryItems: GalleryItem[] = [
  {
    title: "Furniture-minded living",
    caption: "Catalog imagery that shows how the line fits into light, modern interiors. TODO: replace with customer home photography.",
    image_url: "/images/catalog/page-01.png",
  },
  {
    title: "Quiet household utility",
    caption: "Enclosures and storage-adjacent pieces that keep cat care feeling more integrated. TODO: add finished product room photography.",
    image_url: "/images/catalog/page-03.png",
  },
  {
    title: "Scratch surfaces with restraint",
    caption: "The scratcher family is designed to feel useful without becoming visually noisy. TODO: add customer-submitted gallery images.",
    image_url: "/images/catalog/page-05.png",
  },
  {
    title: "Vertical movement",
    caption: "Floating routes and jumping platforms help cats climb while keeping floor plans open. TODO: add installed lifestyle images.",
    image_url: "/images/catalog/page-07.png",
  },
];
const siteSettings: SiteSettings = {
  id: "default",
  brand_name: "Anikitty",
  logo_url: "",
  hero_title: "Cat furniture designed to live beautifully at home.",
  hero_subtitle:
    "Anikitty pairs Taiwan paper-craft expertise with calm, furniture-minded forms for cat households that care about both daily function and interior aesthetics.",
  hero_image_url: "/images/catalog/page-01.png",
  contact_email: "sales@tayen.com.tw",
  contact_phone: "+886-4-8355656",
  social_links: {
    website: "https://www.anikitty.com",
    company: "https://www.tayen.com.tw",
    email: "mailto:sales@tayen.com.tw",
  },
  featured_product_slugs: [
    "ank020-litter-box-enclosure-side-passage",
    "ank143-cat-house-for-kallax",
    "ank104-cat-scratcher-tunnel",
    "ank003-b-cat-scratcher-ramp-b-blue",
    "ank161-1-floating-scratcher-for-wall-large",
    "ank066-m-steel-jumping-platform-medium",
    "ank153-cat-jumping-platform-5f",
  ],
  home_copy_blocks: [
    {
      kicker: "Brand identity",
      title: "A premium cat-furniture brand shaped by paper engineering",
      body: "The catalog positions Anikitty as the cat-focused brand of Ta Yen Paper Box Container Co., Ltd. The tone is warm, thoughtful, practical, and design-conscious rather than playful or childish.",
    },
    {
      kicker: "Product categories",
      title: "From litter concealment to vertical climbing",
      body: "The line spans household furniture, scratcher houses and posts, standalone scratchers, floating wall series, jumping platforms, and add-on accessories or gift-ready items.",
    },
    {
      kicker: "Product philosophy",
      title: "Create a harmonious shared space for people and cats",
      body: "Across the catalog, the strongest message is coexistence: cat furniture should support natural behavior while still sitting comfortably inside a refined home environment.",
    },
  ],
  contact_intro:
    "Use this page for retailer inquiries, OEM or ODM discussions, direct product questions, or to request final marketplace links while the external shop network is being configured.",
  contact_note:
    "TODO: Add showroom address, customer-service hours, and final regional purchase links.",
  final_cta_title: "Ready to browse the collection?",
  final_cta_body:
    "Explore the current range, shortlist products, and send customers to external buying links instead of an on-site cart or checkout.",
  hero_cta_label: "Explore the shop",
  hero_secondary_label: "View material story",
};

const brandDigest: BrandDigest = {
  identitySummary:
    "Anikitty is a Taiwan-based cat furniture brand created by Ta Yen Paper Box Container Co., Ltd., combining paper-material expertise with a warm, home-conscious design point of view.",
  categorySummary: categories.map((category) => category.name),
  philosophySummary: [
    "Design products that let cats and people share a harmonious home.",
    "Use recyclable, low-toxicity paper-based materials where possible.",
    "Balance durability, scratch behavior, and refined interior aesthetics.",
  ],
  materialClaims: [
    "GBoard is presented as a recycled-paper-based material for the brand's furniture line.",
    "The catalog describes the material direction as non-toxic and 100% recyclable.",
    "Water-resistance messaging is tied to PU coating.",
    "The catalog references compliance with strict formaldehyde standards. TODO: verify launch-ready compliance wording for the live site.",
  ],
  serviceModes: [
    {
      title: "OEM",
      body: "Ta Yen presents a 6,000-square-meter factory and collaborative product-development support.",
    },
    {
      title: "ODM",
      body: "Retailers can add Anikitty-designed products to their own brand assortment.",
    },
    {
      title: "OBM",
      body: "The catalog welcomes direct import of the Anikitty line with packaging and marketing support.",
    },
  ],
  stats: [
    { label: "Company founded", value: "1975" },
    { label: "Exports began", value: "2008" },
    { label: "Anikitty launched", value: "2017" },
    { label: "Paper furniture markets", value: "15+ countries" },
  ],
};

export const seedContent: ContentBundle = {
  brandDigest,
  siteSettings,
  categories,
  products,
  faqItems,
  aboutSections,
  galleryItems,
};
