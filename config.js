/* ===================================================================
   Crumb & Co. — business information
   -------------------------------------------------------------------
   This is the ONLY file you need to edit to point the site at a
   different bakery. The top bar, hero, chips, service cards, hours
   table, open/closed pill, directions link and footer are all built
   from what is below — app.js contains no business details.

   Two things live outside this file and must be changed by hand:
     • the <title>, meta description and Open Graph tags in index.html
     • the LocalBusiness JSON-LD block at the bottom of index.html's
       <head> (search crawlers do not run our JavaScript)
   =================================================================== */

const CONFIG = {
  name: "Crumb & Co.",
  tagline: "Baked before sunrise, gone by noon.",

  phone: "+91 98765 43210",     // shown to humans
  phoneDigits: "919876543210",  // country code + number, digits only (tel: and wa.me)

  // Prefilled text for the main "Order on WhatsApp" buttons.
  whatsappMessage: "Hi Crumb & Co! I'd like to place an order.",
  // Per-service links use this template; {topic} comes from services[].topic
  whatsappTopicMessage: "Hi Crumb & Co! I'd like to ask about {topic}.",

  instagram: "crumbandco",      // handle only, no @

  address: {
    line: "14 Model Town Market",
    city: "Ludhiana",
    region: "Punjab",
    postalCode: "141002"
  },
  parking: "Free street parking along the market lane; the two bays right outside are usually open before 9am.",

  // Opening hours. Keys are 0 = Sunday … 6 = Saturday.
  // null means closed all day. Times are 24-hour "HH:MM".
  hours: {
    0: { open: "07:00", close: "19:00" },  // Sunday
    1: null,                              // Monday — closed
    2: { open: "07:00", close: "19:00" },  // Tuesday
    3: { open: "07:00", close: "19:00" },  // Wednesday
    4: { open: "07:00", close: "19:00" },  // Thursday
    5: { open: "07:00", close: "19:00" },  // Friday
    6: { open: "07:00", close: "19:00" }   // Saturday
  },

  // null  = judge open/closed by the visitor's own clock.
  // Set to "Asia/Kolkata" to always show the shop's local status instead,
  // so a visitor browsing from another timezone still sees the truth.
  timezone: null,

  // Section 3 — the horizontally scrolling strip.
  //
  //   art   picks a drawn illustration from ART in app.js:
  //         sourdough | croissant | babka | bun | cookies | cake
  //   photo optional. Leave it "" to use the illustration. To use a real
  //         photograph instead, drop the file into an images/ folder next
  //         to index.html and put the path here, e.g. "images/sourdough.jpg".
  //         Square-ish crops around 600×450 look best. Keep files under
  //         ~200KB so the page stays quick.
  //   note  the small line of text under the name.
  freshToday: [
    { name: "Sourdough",        art: "sourdough", photo: "", note: "Out at 7am" },
    { name: "Butter Croissant", art: "croissant", photo: "", note: "Laminated overnight" },
    { name: "Chocolate Babka",  art: "babka",     photo: "", note: "Weekends only" },
    { name: "Cardamom Bun",     art: "bun",       photo: "", note: "Hand-knotted" },
    { name: "Atta Cookies",     art: "cookies",   photo: "", note: "Six to a box" },
    { name: "Birthday Cakes",   art: "cake",      photo: "", note: "Order ahead" }
  ],

  // Section 4 — the menu-board cards.
  // `icon` picks an inline SVG from ICONS in app.js: bread | cake | box | coffee
  // `topic` is dropped into whatsappTopicMessage above.
  services: [
    {
      icon: "bread",
      title: "Daily fresh bread",
      price: "from ₹60",
      desc: "Sourdough, pav and seeded loaves, out of the oven by 7am every baking day.",
      topic: "your daily fresh bread"
    },
    {
      icon: "cake",
      title: "Custom celebration cakes",
      price: "from ₹900",
      desc: "Tell us the flavour, the name and the date — three days' notice is plenty.",
      topic: "a custom celebration cake"
    },
    {
      icon: "box",
      title: "Party & office boxes",
      price: "from ₹1,200",
      desc: "Mixed boxes of viennoiserie, cookies and buns for ten people or a hundred.",
      topic: "a party or office box"
    },
    {
      icon: "coffee",
      title: "Coffee & counter seating",
      price: "from ₹120",
      desc: "Six stools at the window, filter and espresso, and whatever came out last.",
      topic: "coffee and counter seating"
    }
  ]
};
