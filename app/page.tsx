"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Wrench, 
  Cpu, 
  ArrowRight, 
  PhoneCall, 
  Download, 
  Clock, 
  CheckCircle2, 
  Building, 
  Layers, 
  Maximize, 
  Users, 
  Zap, 
  Sliders, 
  FileText,
  Menu,
  X,
  Search,
  Check,
  Star,
  Flame,
  Award,
  Truck,
  Eye,
  Hammer,
  FileCheck,
  UserCheck,
  Compass,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

// Pre-defined premium stock images of elevators & modern architecture with referrers
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
  passengerElevator: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=1200",
  panoramicElevator: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=1200",
  industrialPanel: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
  teamwork: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
  carLift: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200",
  generator: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200",
};

// Comprehensive Projects Dataset extracted directly from PDF Pages 17-22 and 26-34
interface Project {
  name: string;
  amharicName?: string;
  location: string;
  brand: string;
  capacity: string;
  units: number;
  status: "Completed" | "Ongoing" | "Maintenance";
  floors?: string;
  details?: string;
}

const PROJECTS_DATA: Project[] = [
  // Completed Projects (Slides 26-30)
  {
    name: "GET AS Real International PLC",
    location: "Felewuha, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 3,
    status: "Completed",
    floors: "3B+G+11 = 15 Floors",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Joberg Real Estate",
    location: "Kazanchis, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 3,
    status: "Completed",
    floors: "4B+G+11 & 4B+G+14 = 19 Floors",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Dandirose Building",
    location: "Bole Adey Abeba Stadium, Addis Ababa",
    brand: "Fuji",
    capacity: "630KG / 8 Persons",
    units: 2,
    status: "Completed",
    floors: "B+G+10 = 12 Floors",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "City Mall Project",
    location: "Megenagna, Addis Ababa",
    brand: "Fuji",
    capacity: "630KG / 8 Persons",
    units: 2,
    status: "Completed",
    floors: "B+G+14 = 15 Floors",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Festival 22",
    location: "22 Awuraris Area, Addis Ababa",
    brand: "Fuji",
    capacity: "800KG / 10 Persons",
    units: 2,
    status: "Completed",
    floors: "B+G+12 = 14 Floors",
    details: "Elevator supply, 2 units installation, testing & commissioning"
  },
  {
    name: "Solta Hotel and Apartment",
    amharicName: "ሶልታ ሆቴል",
    location: "Bole Brass, Yod Abyssinia, Addis Ababa",
    brand: "Sword",
    capacity: "1000KG / 13 Persons",
    units: 2,
    status: "Completed",
    floors: "B+G+9 = 11 Floors",
    details: "Premium Sword elevators supply and setup"
  },
  {
    name: "Tolip Olympia Hotel",
    location: "Meskel Flower, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 2,
    status: "Completed",
    floors: "2B+G+10 = 13 Floors",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Debre Markos University & ALMA Building",
    location: "Debre Markos, Ethiopia",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 4,
    status: "Completed",
    floors: "G+7 & 2B+G+11 = 14 Floors",
    details: "Comprehensive supply, installation, testing & commissioning"
  },
  {
    name: "Tsadikane Mariam Apartment",
    location: "Wosen 02, Addis Ababa",
    brand: "Fuji",
    capacity: "630KG / 8 Persons",
    units: 2,
    status: "Completed",
    floors: "B+G+9 = 11 Floors",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Anchinesh Tesfaye Building",
    location: "Chichinia, Addis Ababa",
    brand: "GiantKONE",
    capacity: "800KG / 10 Persons & 630KG / 8 Persons",
    units: 4,
    status: "Completed",
    floors: "2B+G+13 = 16 Floors",
    details: "Elevator supply, 4 units installation, testing & commissioning"
  },
  {
    name: "Taycon Construction Apartment",
    amharicName: "ታይኮን ኮንስትራክሽን",
    location: "Atlas Mebratu, Addis Ababa",
    brand: "Fuji",
    capacity: "800KG / 10 Persons",
    units: 2,
    status: "Completed",
    floors: "Atlas B+G+12",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Sami Vegas Hotel",
    location: "22 Awuraris Area, Addis Ababa",
    brand: "Fuji",
    capacity: "450KG / 6 Persons",
    units: 1,
    status: "Completed",
    floors: "G+10",
    details: "Elevator supply, 1 installation, testing & commissioning"
  },
  {
    name: "Mihret Guest House",
    location: "Shola Gebeya Area, Addis Ababa",
    brand: "Fuji",
    capacity: "800KG / 10 Persons",
    units: 2,
    status: "Completed",
    floors: "G+8",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Z.I.S Trading S.C",
    location: "Lideta, Infront of Abdela Hintsa Building, Addis Ababa",
    brand: "JUJI",
    capacity: "630KG / 8 Persons & 800KG / 10 Persons",
    units: 2,
    status: "Completed",
    floors: "B+G+9",
    details: "1 unit 630KG, 1 unit 800KG elevator supply & commissioning"
  },
  {
    name: "Karama Real Estate",
    amharicName: "ካራማ ሪል እስቴት",
    location: "Bisrate Gebrael Queens Area, Addis Ababa",
    brand: "Orona (Spain)",
    capacity: "630KG / 8 Persons",
    units: 1,
    status: "Completed",
    floors: "2B+G+9 = 12 Floors",
    details: "Premium Orona traction system installation"
  },
  {
    name: "Ziabaziwo Building",
    location: "Sebategna, Addis Ababa",
    brand: "Fuji",
    capacity: "800KG / 10 Persons",
    units: 1,
    status: "Completed",
    floors: "G+9",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Vail Colorado Building / Guest House",
    amharicName: "ቫይላ ኮሎራዶ",
    location: "Wossen Sunshine Area, Addis Ababa",
    brand: "Fuji",
    capacity: "630KG / 8 Persons",
    units: 1,
    status: "Completed",
    floors: "G+8",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Water & Resource Office",
    location: "Lamberet Minister Area, Addis Ababa",
    brand: "Fuji",
    capacity: "630KG / 8 Persons",
    units: 1,
    status: "Completed",
    floors: "G+6",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Daniel Hotel",
    location: "Piazza Area, Addis Ababa",
    brand: "Fuji",
    capacity: "630KG / 8 Persons",
    units: 1,
    status: "Completed",
    floors: "G+8",
    details: "Elevator supply, 1 unit installation & commissioning"
  },
  {
    name: "Makrina Hotel",
    location: "Adam, Ethiopia",
    brand: "Fuji",
    capacity: "800KG / 10 Persons",
    units: 1,
    status: "Completed",
    floors: "G+7",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Sint Real Estate",
    location: "Mekelle, Ethiopia",
    brand: "Fuji",
    capacity: "630KG / 8 Persons",
    units: 1,
    status: "Completed",
    floors: "G+8",
    details: "Elevator supply, installation, testing & commissioning"
  },
  {
    name: "Harmony Hospital",
    location: "Mekelle Ayder Area, Ethiopia",
    brand: "Fuji",
    capacity: "630KG / 8 Persons",
    units: 1,
    status: "Completed",
    floors: "G+6",
    details: "Elevator supply, installation, testing & commissioning"
  },

  // Ongoing Projects (Slides 31-33)
  {
    name: "RG and Families Real Estate",
    location: "Bole Adey Abeba Stadium, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 2,
    status: "Ongoing",
    floors: "2B+G+17 = 20 Floors",
    details: "Elevator supply, 2 installations, testing & commissioning"
  },
  {
    name: "Fisik Real Estate",
    location: "Wolo Sefer, Addis Ababa",
    brand: "Fuji / Staking",
    capacity: "1000KG / 13 Persons & Car lifts",
    units: 18,
    status: "Ongoing",
    floors: "2B+G+16 = 19 Floors",
    details: "Elevator supply and installation (2 passenger lifts + 15 staking car lifts + 1 car platform lift)"
  },
  {
    name: "Matrix Real Estate",
    location: "Wolo Sefer, Addis Ababa",
    brand: "Fuji",
    capacity: "800KG / 10 Persons",
    units: 1,
    status: "Ongoing",
    floors: "B+G+9 = 11 Floors",
    details: "Elevator supply, installation, testing & commissioning 1 unit"
  },
  {
    name: "Enetafetu Real Estate",
    location: "Figa, Addis Ababa",
    brand: "Fuji",
    capacity: "450KG / 6 Persons",
    units: 1,
    status: "Ongoing",
    floors: "G+6 = 7 Floors",
    details: "Elevator supply, 1 installation, testing & commissioning"
  },
  {
    name: "Hintsa Building",
    location: "Bisrate Gebereal, Addis Ababa",
    brand: "Fuji",
    capacity: "630KG / 8 Persons & Car lift",
    units: 3,
    status: "Ongoing",
    floors: "G+11",
    details: "Supply and installation of 2 passenger lifts and 1 car lift"
  },
  {
    name: "Africon Real Estate",
    location: "22 Area, Addis Ababa",
    brand: "Fuji",
    capacity: "1150KG (15 Persons) & 450KG (6 Persons)",
    units: 2,
    status: "Ongoing",
    floors: "2B+G+13 = 15 Floors",
    details: "Elevator supply, 2 installations, testing & commissioning"
  },
  {
    name: "Hamracon Construction",
    location: "Bole Arabesa, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 3,
    status: "Ongoing",
    floors: "2B+G+10",
    details: "Elevator supply, 3 units installation, testing & commissioning"
  },
  {
    name: "Mulush Construction",
    location: "Bole Arabesa, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 3,
    status: "Ongoing",
    floors: "2B+G+10",
    details: "Elevator supply, 3 units installation, testing & commissioning"
  },
  {
    name: "Antem Construction",
    location: "Bole Arabesa, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 3,
    status: "Ongoing",
    floors: "2B+G+10",
    details: "Elevator supply, 3 units installation, testing & commissioning"
  },
  {
    name: "Dugeda Construction",
    location: "Felewuha, Addis Ababa",
    brand: "Fuji Precision",
    capacity: "1600KG / 21 Persons",
    units: 2,
    status: "Ongoing",
    floors: "2B+G+6 = 9 Floors",
    details: "Elevator supply, 2 panoramic units installation, testing & commissioning"
  },

  // Preventive Maintenance Projects (Slides 33-34)
  {
    name: "Tsihay Real Estate (Yetbaberut Service)",
    location: "CMC, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 25,
    status: "Maintenance",
    details: "Full maintenance and routine safety monitoring of 25 elevator systems"
  },
  {
    name: "Boston Apartment",
    location: "Bole Alem Cinema, Addis Ababa",
    brand: "Fuji",
    capacity: "Standard Passenger",
    units: 3,
    status: "Maintenance",
    details: "Active SLA preventive support package (3 services)"
  },
  {
    name: "Get-AS International PLC",
    location: "Ayat 72 Project, Addis Ababa",
    brand: "Fuji",
    capacity: "Standard Passenger",
    units: 5,
    status: "Maintenance",
    details: "Preventive maintenance and service checks (5 services)"
  },
  {
    name: "Festival 22 Apartment",
    location: "22 Awuraris Area, Addis Ababa",
    brand: "Fuji",
    capacity: "800KG / 10 Persons",
    units: 2,
    status: "Maintenance",
    details: "Full maintenance cycle and breakdown dispatch support (2 services)"
  },
  {
    name: "Tedy Apartment",
    location: "Bole Atlas, Addis Ababa",
    brand: "Fuji",
    capacity: "Standard Passenger",
    units: 1,
    status: "Maintenance",
    details: "Bi-weekly inspection and backup engineering checks (1 service)"
  },
  {
    name: "Noah Real Estate",
    location: "22 Golagol, Addis Ababa",
    brand: "Fuji",
    capacity: "Standard Passenger",
    units: 4,
    status: "Maintenance",
    details: "Routine mechanical calibration and electrical safety audit (4 services)"
  },
  {
    name: "Nejib Building",
    location: "Wollo Sefer, Addis Ababa",
    brand: "Fuji",
    capacity: "Standard Passenger",
    units: 1,
    status: "Maintenance",
    details: "Routine lubrication, controller inspection, and safety check (1 service)"
  },
  {
    name: "The Editor",
    location: "Atlas, Addis Ababa",
    brand: "Standard",
    capacity: "Standard Passenger",
    units: 4,
    status: "Maintenance",
    details: "Comprehensive safety inspection and active breakdown protection (4 services)"
  },
  {
    name: "Abyssinia Building",
    location: "Bole Medhanealem, Addis Ababa",
    brand: "Standard",
    capacity: "Standard Passenger",
    units: 2,
    status: "Maintenance",
    details: "Monthly preventive maintenance cycle (2 services)"
  }
];

const TRANSLATIONS = {
  en: {
    heroBadge: "Ethiopian Premier Lift Integration Firm",
    heroTitle: "Star of Elevation:",
    heroTitleSpan: "Vertical Transportation",
    heroTitleEnd: " Precision",
    heroSubtitle: "Founded in May 2023 by electrical engineer Dibekulu Admit Tagele, Shining Star Electro Mechanical Work delivers world-class elevator, escalator, car-stacking systems, and generators with unparalleled safety standards across Ethiopia and East Africa.",
    configureBtn: "Configure Your System",
    browseProjects: "Browse Projects",
    compLifts: "Completed Lifts",
    ongoingProj: "Ongoing Projects",
    activeMaint: "Active Maintenance",
    groupExp: "Group Experience",
    navOverview: "Overview",
    navProducts: "Products & Services",
    navPartners: "Strategic Partners",
    navPortfolio: "Project Portfolio",
    navCertifications: "Certifications",
    navGallery: "Photo Gallery",
    navEstimator: "Specs Estimator",
    getProposal: "Get Proposal / Estimate",
    emergencyBanner: "EE-ECA Standards Compliant (EN 81 Standard compliance guaranteed)",
    regContractor: "Grade-1 Registered Electromechanical Contractor",
    emergencyHotline: "Breakdown dispatch 24/7:",
  },
  am: {
    heroBadge: "የኢትዮጵያ ቀዳሚ ሊፍት መገጣጠሚያ ድርጅት",
    heroTitle: "የከፍታ ኮከብ፡",
    heroTitleSpan: "አስተማማኝ የሊፍት",
    heroTitleEnd: " አገልግሎቶች",
    heroSubtitle: "በግንቦት ወር 2015 ዓ.ም በኤሌክትሪካል መሃንዲስ ዲበኩሉ አድሚት ታገለ የተመሰረተው ሻይኒንግ ስታር ኤሌክትሮ መካኒካል ስራዎች፥ በኢትዮጵያ እና በምስራቅ አፍሪካ ወደር የለሽ የደህንነት ደረጃዎችን የጠበቁ የሊፍት፣ የእስካሌተር፣ የመኪና ማቆሚያ (ካር ስታኪንግ) እና የጄነሬተር አቅርቦት እና ተከላ አገልግሎት ይሰጣል።",
    configureBtn: "ሲስተምዎን ያዋቅሩ",
    browseProjects: "ስራዎቻችንን ይመልከቱ",
    compLifts: "የተጠናቀቁ ሊፍቶች",
    ongoingProj: "በመሰራት ላይ ያሉ",
    activeMaint: "ንቁ ጥገና",
    groupExp: "የቡድን ልምድ",
    navOverview: "አጠቃላይ እይታ",
    navProducts: "ምርቶች እና አገልግሎቶች",
    navPartners: "ስትራቴጂካዊ አጋሮች",
    navPortfolio: "የስራዎቻችን ማህደር",
    navCertifications: "የምስክር ወረቀቶች",
    navGallery: "ፎቶ ጋለሪ",
    navEstimator: "የሊፍት ማስያ (Estimator)",
    getProposal: "ዋጋ ለመጠየቅ",
    emergencyBanner: "በኢፌዴሪ ኤሌክትሮ መካኒካል ደረጃዎች (EN 81) የተመሰከረለት",
    regContractor: "የደረጃ-1 ኤሌክትሮ መካኒካል ተቋራጭ",
    emergencyHotline: "የድንገተኛ አደጋ ጥገና 24/7፡",
  }
};

const GALLERY_ITEMS = [
  {
    url: IMAGES.passengerElevator,
    category: "passenger",
    title_en: "Premium Passenger Elevator",
    title_am: "ዘመናዊ የሰው ማመላለሻ ሊፍት",
    desc_en: "Sleek stainless steel interior with smart control panel and LED ambient lighting.",
    desc_am: "ቀልጣፋ የስማርት ቁጥጥር ሲስተም እና የኤልኢዲ መብራት ያለው ዘመናዊ የስታንለስ ስቲል ሊፍት።",
    specs_en: "Capacity: 1000KG (13 Persons) | Sourced Brand: FUJI Precision",
    specs_am: "የመጫን አቅም፡ 1000 ኪሎግራም (13 ሰው) | ብራንድ፡ ፉጂ ፕሪሲዥን",
  },
  {
    url: IMAGES.panoramicElevator,
    category: "panoramic",
    title_en: "High-Visibility Panoramic Glass Cabin",
    title_am: "ፓኖራሚክ የመስታወት ሊፍት",
    desc_en: "Stunning scenic views with high-durability safety tempered glass and modern steel framework.",
    desc_am: "ለዕይታ ምቹ የሆነ ከፍተኛ ጥንካሬ ካለው የተጠናከረ መስታወት እና ብረት የተሰራ ውብ ሊፍት።",
    specs_en: "Compliance: EN 81-20/50 | Cabin Type: Round Panoramic Glass",
    specs_am: "ደህንነት፡ EN 81-20/50 | የካቢን አይነት፡ ክብ ፓኖራሚክ መስታወት",
  },
  {
    url: IMAGES.industrialPanel,
    category: "systems",
    title_en: "Integrated Electrical & VVVF Control Cabinet",
    title_am: "የኤሌክትሮኒክስ ቁጥጥር ካቢኔ",
    desc_en: "Precision engineering featuring energy-saving VVVF frequency converters and safe logic boards.",
    desc_am: "የሃይል ፍጆታን የሚቀንስ የVVVF ፍሪኩዌንሲ መለወጫ እና የሎጂክ ሰሌዳ የያዘ መቆጣጠሪያ።",
    specs_en: "Power Savings: >48% | Technology: PMSM Synchronous Gearless Support",
    specs_am: "የሃይል ቁጠባ፡ >48% | ቴክኖሎጂ፡ PMSM ሲንክሮነስ ጊየርለስ",
  },
  {
    url: IMAGES.teamwork,
    category: "systems",
    title_en: "On-Site Mechanical Integration & SLA Service",
    title_am: "የመስክ ተከላ እና ጥራት ቁጥጥር",
    desc_en: "Licensed Shining Star electromechanical engineering team installing structural guide rails with micro-millimeter precision.",
    desc_am: "የሻይኒንግ ስታር መሃንዲሶች የሊፍት መመሪያ ሀዲዶችን በከፍተኛ ጥንቃሬ እና ጥንቃቄ ሲተክሉ።",
    specs_en: "Engineering Standard: Grade-1 Registered Contractor Quality",
    specs_am: "የምህንድስና ደረጃ፡ የደረጃ-1 ኤሌክትሮ መካኒካል ተቋራጭ ጥራት",
  },
  {
    url: IMAGES.carLift,
    category: "passenger",
    title_en: "Heavy-Duty Multi-Level Car Lift System",
    title_am: "ከባድ መኪናዎችን የሚያነሳ የሊፍት ሲስተም",
    desc_en: "Robust traction-based structural vehicle lifting solution with double operating panels and certified security locks.",
    desc_am: "ሁለት የቁጥጥር ፓነል እና የደህንነት መቆለፊያ ያለው ጠንካራ መኪናዎችን የማመላለሻ ሲስተም።",
    specs_en: "Weight Limit: 3000KG - 5000KG | Safety Hooks: Automated Mechanical",
    specs_am: "የክብደት ገደብ፡ 3000 - 5000 ኪሎ | ደህንነት፡ አውቶማቲክ መቆለፊያዎች",
  },
  {
    url: IMAGES.generator,
    category: "power",
    title_en: "High-Capacity Backup Diesel Generator Sets",
    title_am: "ከፍተኛ አቅም ያለው የናፍጣ ጄኔሬተር",
    desc_en: "Reliable prime emergency power backup units with automatic transfer switch (ATS) to prevent lift blackouts.",
    desc_am: "ሊፍት እንዳይቋረጥ በአጭር ሰከንዶች ውስጥ አውቶማቲክ የሀይል ሽግግር (ATS) የሚያደርግ ጄነሬተር።",
    specs_en: "Sourced Brands: Perkins / Cummins | Response Time: <5 Seconds",
    specs_am: "ብራንዶች፡ ፐርኪንስ / ካሚንስ | የምላሽ ሰዓት፡ <5 ሰከንድ",
  }
];

export default function HomePage() {
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Language state (en = English, am = Amharic)
  const [lang, setLang] = useState<"en" | "am">("en");

  // Elevator simulator states
  const [currentSimFloor, setCurrentSimFloor] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simTargetFloor, setSimTargetFloor] = useState<number>(1);
  const [simDoorOpen, setSimDoorOpen] = useState<boolean>(true);

  // Active tabs for different information modules
  const [activeAboutTab, setActiveAboutTab] = useState<"overview" | "values" | "prequal">("overview");
  const [activeProductTab, setActiveProductTab] = useState<"elevators" | "escalators" | "special" | "power">("elevators");
  
  // Projects state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "Ongoing" | "Maintenance">("All");
  const [brandFilter, setBrandFilter] = useState<string>("All");

  // Photo Gallery state
  const [galleryFilter, setGalleryFilter] = useState<"all" | "passenger" | "panoramic" | "systems" | "power">("all");
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<number | null>(null);

  // Custom Elevator Estimator wizard state
  const [estBuildingType, setEstBuildingType] = useState<string>("commercial");
  const [estFloors, setEstFloors] = useState<number>(6);
  const [estStyle, setEstStyle] = useState<string>("panoramic");
  const [estCapacity, setEstCapacity] = useState<number>(800); // in kg

  // Web Audio Context for elevator chime (initialized/warmed on user click to satisfy browser security policies)
  const playArrivalChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      
      // Warm up the context if suspended
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      
      const now = audioCtx.currentTime;
      // High-frequency primary chime tone
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now); // E5 note
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      
      // Secondary harmonious sub-tone
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(523.25, now + 0.08); // C5 note
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.setValueAtTime(0.08, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.08);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      
      osc1.start(now);
      osc1.stop(now + 1.0);
      osc2.start(now + 0.08);
      osc2.stop(now + 1.08);
    } catch (err) {
      console.warn("Chime playback failed", err);
    }
  };

  // Handle simulated elevator call
  const handleSimulateElevator = async (targetFloor: number) => {
    if (isSimulating || targetFloor === currentSimFloor) return;
    setIsSimulating(true);
    setSimTargetFloor(targetFloor);
    setSimDoorOpen(false);

    const steps = Math.abs(targetFloor - currentSimFloor);
    const direction = targetFloor > currentSimFloor ? 1 : -1;
    
    // simulate door closing time
    await new Promise((resolve) => setTimeout(resolve, 600));

    for (let i = 1; i <= steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setCurrentSimFloor(prev => prev + direction);
    }

    setSimDoorOpen(true);
    setIsSimulating(false);
    playArrivalChime();
  };

  // Inquiries feedback state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "elevator-install",
    message: "",
    floorsConfig: "6",
    capacityConfig: "800kg",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Load calculator results into inquiry form
  const handleApplyConfig = () => {
    const recommendedSpeed = estFloors <= 4 ? "1.0 m/s" : estFloors <= 10 ? "1.6 m/s" : "2.0 m/s+";
    const recommendedMotor = estStyle === "panoramic" ? "PMSM Gearless (Suzhou FUJI Precision tech)" : "VVVF Integrated System";
    
    setFormData(prev => ({
      ...prev,
      serviceType: "elevator-install",
      floorsConfig: estFloors.toString(),
      capacityConfig: `${estCapacity}kg (${Math.round(estCapacity/75)} Persons)`,
      message: `System configuration compiled from estimator wizard:
- Building Profile: ${estBuildingType.toUpperCase()}
- Number of Stories: ${estFloors}
- Recommended Speed: ${recommendedSpeed}
- Preferred Aesthetic: ${estStyle.toUpperCase()}
- Nominal Load: ${estCapacity}kg (${Math.round(estCapacity/75)} Persons)
- Suggested System: ${recommendedMotor}

Please formulate an official quotation and contact me.`
    }));

    // Scroll to the contact form smoothly
    const contactSection = document.getElementById("inquiry-portal");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pre-fill form from selected gallery photo item
  const handleInquiryForGalleryItem = (itemIndex: number) => {
    const item = GALLERY_ITEMS[itemIndex];
    setFormData(prev => ({
      ...prev,
      serviceType: item.category === "power" ? "power-generator" : "elevator-install",
      message: `Inquiry regarding completed projects photo gallery item "${item.title_en}":
- Technical Profile: ${item.specs_en}
- Sourced Solution: ${item.desc_en}

Please provide an official brochure, lead times, and financial quotation for this configuration.`
    }));

    setSelectedGalleryImage(null); // Close lightbox modal

    // Scroll to the contact form smoothly
    const contactSection = document.getElementById("inquiry-portal");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Main Inquiry Submission
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setStatusMessage(result.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          serviceType: "elevator-install",
          message: "",
          floorsConfig: "6",
          capacityConfig: "800kg",
        });
      } else {
        setSubmitStatus("error");
        setStatusMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      setStatusMessage("Failed to submit. Please check network and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get distinct brands from projects for filters
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    PROJECTS_DATA.forEach(p => {
      const b = p.brand.split(" ")[0].split("/")[0]; // Clean brand name
      if (b) brands.add(b);
    });
    return ["All", ...Array.from(brands)];
  }, []);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.amharicName && p.amharicName.includes(searchQuery)) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      
      const matchesBrand = brandFilter === "All" || p.brand.toLowerCase().includes(brandFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesBrand;
    });
  }, [searchQuery, statusFilter, brandFilter]);

  // Total sums of units
  const statsSummary = useMemo(() => {
    let completed = 0;
    let ongoing = 0;
    let maintenance = 0;

    PROJECTS_DATA.forEach(p => {
      if (p.status === "Completed") completed += p.units;
      else if (p.status === "Ongoing") ongoing += p.units;
      else if (p.status === "Maintenance") maintenance += p.units;
    });

    return { completed, ongoing, maintenance };
  }, []);

  // Filter photo gallery items dynamically
  const filteredGalleryItems = useMemo(() => {
    return GALLERY_ITEMS.map((item, index) => ({ ...item, originalIndex: index })).filter(
      item => galleryFilter === "all" || item.category === galleryFilter
    );
  }, [galleryFilter]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50 selection:bg-[#f37021] selection:text-white">
      
      {/* 24/7 Regulatory & Emergency Notification Banner */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2.5 px-4 border-b border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#f37021] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#f37021] animate-pulse" />
              {TRANSLATIONS[lang].emergencyBanner}
            </span>
            <span className="hidden lg:inline text-slate-700">|</span>
            <span className="text-slate-400 font-light">{TRANSLATIONS[lang].regContractor}</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#f37021]" />
              {TRANSLATIONS[lang].emergencyHotline} <strong className="text-white">+251 985 064 087</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Corporate Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-[#f37021] to-[#d65103] rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/10">
              <Star className="w-6 h-6 animate-pulse text-white fill-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-950 block leading-tight font-display">
                SHINING STAR
              </span>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block">
                ELECTRO MECHANICAL WORK
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-8">
            <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-[#f37021] transition-colors">{TRANSLATIONS[lang].navOverview}</a>
            <a href="#products" className="text-sm font-semibold text-slate-600 hover:text-[#f37021] transition-colors">{TRANSLATIONS[lang].navProducts}</a>
            <a href="#partners" className="text-sm font-semibold text-slate-600 hover:text-[#f37021] transition-colors">{TRANSLATIONS[lang].navPartners}</a>
            <a href="#projects" className="text-sm font-semibold text-slate-600 hover:text-[#f37021] transition-colors">{TRANSLATIONS[lang].navPortfolio}</a>
            <a href="#gallery" className="text-sm font-semibold text-slate-600 hover:text-[#f37021] transition-colors">{TRANSLATIONS[lang].navGallery}</a>
            <a href="#credentials" className="text-sm font-semibold text-slate-600 hover:text-[#f37021] transition-colors">{TRANSLATIONS[lang].navCertifications}</a>
            <a href="#estimator" className="text-sm font-semibold text-slate-600 hover:text-[#f37021] transition-colors">{TRANSLATIONS[lang].navEstimator}</a>
          </nav>

          {/* Quick Contact & Language Switcher Portal */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button 
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${lang === "en" ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang("am")}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${lang === "am" ? "bg-[#f37021] text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
              >
                አማ
              </button>
            </div>

            <a 
              href="#inquiry-portal" 
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-[#f37021] text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg duration-300"
            >
              {TRANSLATIONS[lang].getProposal}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburguer and Lang */}
          <div className="flex items-center gap-3 xl:hidden">
            {/* Small Language Switcher */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 mr-1">
              <button 
                onClick={() => setLang("en")}
                className={`px-2 py-1 text-[9px] font-bold rounded-md ${lang === "en" ? "bg-slate-950 text-white" : "text-slate-500"}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang("am")}
                className={`px-2 py-1 text-[9px] font-bold rounded-md ${lang === "am" ? "bg-[#f37021] text-white" : "text-slate-500"}`}
              >
                አማ
              </button>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 text-slate-700 hover:text-[#f37021] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-100 py-6 px-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-4">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#f37021] transition-colors py-1">{TRANSLATIONS[lang].navOverview}</a>
              <a href="#products" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#f37021] transition-colors py-1">{TRANSLATIONS[lang].navProducts}</a>
              <a href="#partners" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#f37021] transition-colors py-1">{TRANSLATIONS[lang].navPartners}</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#f37021] transition-colors py-1">{TRANSLATIONS[lang].navPortfolio}</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#f37021] transition-colors py-1">{TRANSLATIONS[lang].navGallery}</a>
              <a href="#credentials" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#f37021] transition-colors py-1">{TRANSLATIONS[lang].navCertifications}</a>
              <a href="#estimator" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#f37021] transition-colors py-1">{TRANSLATIONS[lang].navEstimator}</a>
              <hr className="border-slate-100 my-2" />
              <div className="flex flex-col gap-3">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Breakdown Support</span>
                <span className="text-sm font-bold text-slate-900">+251 985 064 087</span>
              </div>
              <a 
                href="#inquiry-portal"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#f37021] hover:bg-[#d65103] text-white font-bold py-3 px-4 rounded-xl text-center transition-all shadow-md text-sm uppercase tracking-wider"
              >
                {TRANSLATIONS[lang].getProposal}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-24 sm:py-32 xl:py-40 flex items-center">
        {/* Sky Backdrop */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={IMAGES.hero} 
            alt="Tall futuristic buildings with modern lifts"
            fill
            className="object-cover opacity-20 pointer-events-none"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
          {/* Subtle bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            
            {/* Top Indicator Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[#f37021] text-xs font-bold tracking-wider uppercase mb-8"
            >
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              {TRANSLATIONS[lang].heroBadge}
            </motion.div>

            {/* Main Catchy Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-display leading-tight"
            >
              {TRANSLATIONS[lang].heroTitle} <br />
              <span className="text-[#f37021] bg-gradient-to-r from-[#f37021] to-[#ff8c42] bg-clip-text text-transparent">
                {TRANSLATIONS[lang].heroTitleSpan}
              </span>{TRANSLATIONS[lang].heroTitleEnd}
            </motion.h1>

            {/* Corporate Summary Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-light max-w-3xl"
            >
              {TRANSLATIONS[lang].heroSubtitle}
            </motion.p>

            {/* Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <a 
                href="#estimator" 
                className="inline-flex items-center justify-center gap-2 bg-[#f37021] hover:bg-[#d65103] text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 hover:scale-105 duration-200"
              >
                {TRANSLATIONS[lang].configureBtn}
                <Sliders className="w-4 h-4" />
              </a>
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-semibold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all hover:border-slate-700 duration-200"
              >
                {TRANSLATIONS[lang].browseProjects} ({PROJECTS_DATA.length})
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Authentic Company Profile Key Metrics (Direct from PDF) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-900 pt-10"
            >
              <div>
                <span className="block text-4xl font-black text-[#f37021] font-display">142+</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 block">{TRANSLATIONS[lang].compLifts}</span>
              </div>
              <div>
                <span className="block text-4xl font-black text-white font-display">38+</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 block">{TRANSLATIONS[lang].ongoingProj}</span>
              </div>
              <div>
                <span className="block text-4xl font-black text-white font-display">75+</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 block">{TRANSLATIONS[lang].activeMaint}</span>
              </div>
              <div>
                <span className="block text-4xl font-black text-[#f37021] font-display">8 Yrs</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 block">{TRANSLATIONS[lang].groupExp}</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section: Company Overview & Corporate Identity */}
      <section id="about" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Col: Sticky summary profile */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <div>
                <span className="text-xs font-bold text-[#f37021] uppercase tracking-widest block mb-2">Corporate Profile 2026</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
                  Shining Star Electro Mechanical Work
                </h2>
                <div className="w-16 h-1.5 bg-[#f37021] rounded-full mt-4" />
              </div>

              <p className="text-slate-600 leading-relaxed font-light text-base">
                An industry leading vertical transportation and electromechanical solution company based in Addis Ababa, Ethiopia. We serve residential, commercial, industrial and public infrastructure sectors.
              </p>

              {/* Leadership Spotlight Cards */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Executive Management</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* CEO */}
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f37021]/10 rounded-xl flex items-center justify-center text-[#f37021] flex-shrink-0">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">Dibekulu Admit</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Founder &amp; CEO, EE</p>
                    </div>
                  </div>

                  {/* Manager */}
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-950/5 rounded-xl flex items-center justify-center text-slate-600 flex-shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">Rodas Tesfaye</h4>
                      <p className="text-[10px] text-slate-500 font-medium">General Manager</p>
                    </div>
                  </div>
                </div>

                {/* Technical Manager */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3 max-w-sm">
                  <div className="w-10 h-10 bg-slate-950/5 rounded-xl flex items-center justify-center text-slate-600 flex-shrink-0">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">Shimeles Adimet</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Technical Manager</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Tab-based detailed documentation */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-200 gap-6">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "values", label: "Mission, Vision & Values" },
                  { id: "prequal", label: "Pre-Qualification Profile" },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAboutTab(tab.id as any)}
                    className={`pb-4 text-sm font-bold tracking-tight uppercase transition-all relative ${
                      activeAboutTab === tab.id 
                        ? "text-[#f37021]" 
                        : "text-slate-400 hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                    {activeAboutTab === tab.id && (
                      <motion.div 
                        layoutId="activeAboutLine" 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-[#f37021] rounded-full" 
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAboutTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {activeAboutTab === "overview" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-950 font-display">Leading Ethiopia's Vertical Movement</h3>
                      <p className="text-slate-600 font-light leading-relaxed">
                        Shining Star Electro Mechanical Engineering is a professional, licensed company specializing in the delivery of comprehensive electromechanical solutions for residential, commercial, and institutional buildings. With more than 8 years of aggregate experience, we have structured a sterling reputation for safety, engineering competence, and customer compliance.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-[#f37021] uppercase tracking-wider block">Foundational Leadership</span>
                          <p className="text-xs text-slate-600 leading-relaxed font-light">
                            Founded in May 2023 by <strong>Dibekulu Admit Tagele</strong>, an experienced electrical engineer with extensive technical expertise in elevator maintenance, retrofitting, and international installations.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">China Factory Trained</span>
                          <p className="text-xs text-slate-600 leading-relaxed font-light">
                            Our engineers are certified through specialized elevator manufacturing training at high-tech factory hubs in China (including Sicher Elevator / SRH Level 1 Commissioning credentials).
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Core Technical Strengths:</span>
                        <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600 font-light">
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f37021]" /> EN 81 Safety Regulations Compliance</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f37021]" /> High-rise structural layouts (G+14, G+19, etc.)</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f37021]" /> International project experience (Somalia installations)</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f37021]" /> Real-time 24/7 technical help desk &amp; spare parts</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeAboutTab === "values" && (
                    <div className="space-y-8">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          <span className="text-[#f37021] text-xs font-bold tracking-widest uppercase block mb-2">Our Vision</span>
                          <p className="text-slate-600 text-sm font-light leading-relaxed">
                            To become one of the leading and most trusted elevator and escalator solution providers in Ethiopia and East Africa by setting new standards in quality, safety, innovation, and customer satisfaction.
                          </p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          <span className="text-slate-950 text-xs font-bold tracking-widest uppercase block mb-2">Our Mission</span>
                          <p className="text-slate-600 text-sm font-light leading-relaxed">
                            To deliver reliable, safe, innovative, and high-quality elevator and escalator solutions through professional expertise, advanced technology, and exceptional customer service.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Our Core Pillars &amp; Values</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {[
                            { title: "Professionalism", desc: "Expert technical standards" },
                            { title: "Integrity", desc: "Transparent business ethics" },
                            { title: "Quality", desc: "Zero defect engineering" },
                            { title: "Safety First", desc: "Strict fail-safe systems" },
                            { title: "Customer Centric", desc: "Tailored project specs" },
                            { title: "Innovation", desc: "VVVF smart systems" },
                            { title: "Teamwork", desc: "Synchronized specialists" },
                            { title: "Accountability", desc: "Proactive guarantees" }
                          ].map((v, idx) => (
                            <div key={idx} className="p-3 bg-white border border-slate-100 hover:border-orange-200 hover:bg-orange-50/20 rounded-xl transition-all">
                              <span className="block text-xs font-bold text-slate-900 leading-tight mb-1">{v.title}</span>
                              <span className="block text-[10px] text-slate-500 font-light">{v.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeAboutTab === "prequal" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-950 font-display">Prequalification Criteria Summary</h3>
                      <p className="text-slate-600 text-sm font-light leading-relaxed">
                        Shining Star meets the most rigorous regulatory and commercial criteria to handle large-scale construction developments across Ethiopia.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4 text-xs">
                        {[
                          { label: "Financial Capacity", val: "Capable of multiple large-scale projects (up to 5 elevators concurrently)" },
                          { label: "Recent Projects", val: "Delivered multiple high-rise projects (e.g. G+14, G+16, G+19, etc.)" },
                          { label: "Staff Qualification", val: "Certified, trained specialists (China technical certificate + regional engineering degrees)" },
                          { label: "Maintenance Portfolio", val: "Above 75 elevators under active routine preventive care agreements" },
                          { label: "Registration & License", val: "Valid Ethiopian business license, Grade-1 certified contractor" },
                          { label: "Supply Lead Time", val: "Fast delivery within 3 months of contract signing" },
                          { label: "Installation Velocity", val: "10-15 days per elevator depending on project complexity" },
                          { label: "Standard Warranty", val: "1 Year free maintenance & 5 Years on major components" }
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                            <span className="block font-bold text-slate-900">{item.label}</span>
                            <span className="block text-slate-500 font-light leading-relaxed">{item.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

      {/* Section: Comprehensive Product & Service Catalog */}
      <section id="products" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#f37021] uppercase tracking-widest block mb-2">Our Engineering Range</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
              Elevator Systems &amp; Electromechanical Solutions
            </h2>
            <p className="text-slate-600 mt-4 font-light leading-relaxed">
              We design, supply, install, commission, modernize and maintain a vast portfolio of vertical transport mechanisms and commercial building support systems.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "elevators", label: "Passenger & Panoramic Lifts", icon: Layers },
              { id: "escalators", label: "Escalators & Moving Walks", icon: Maximize },
              { id: "special", label: "Car Lifts & Specialized Lifts", icon: Sliders },
              { id: "power", label: "Power & Building Services", icon: Zap }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveProductTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeProductTab === tab.id 
                      ? "bg-slate-950 text-white border-slate-950 shadow-md" 
                      : "bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeProductTab === tab.id ? "text-[#f37021]" : "text-slate-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Grid Layout of the Selected Category */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProductTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              
              {activeProductTab === "elevators" && (
                <>
                  {/* Passenger Elevators */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/30 transition-all">
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f37021]">
                        <Layers className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">Passenger Elevators</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Our passenger elevators feature state-of-the-art permanent magnet synchronous motors (PMSM) and variable frequency drives (VVVF). Reduces energy consumption by over 48%.
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Intelligent Group Control (Up to 8 cabs)</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Microprocessor-based VVVF controller</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Capacity: 450kg, 630kg, 800kg, 1000kg</li>
                      </ul>
                    </div>
                  </div>

                  {/* Panoramic Glass Elevators */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/30 transition-all">
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f37021]">
                        <Eye className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">Panoramic / Observation Elevators</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Add elegant luxury and prestige to commercial buildings, hotels, and high-rise apartments with panoramic glass elevator capsules. 
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Curvaceous or semi-circular glass shapes</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Frameless safety glass configurations</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Machine Room-Less (MRL) design options</li>
                      </ul>
                    </div>
                  </div>

                  {/* Freight / Bed Elevators */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/30 transition-all">
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f37021]">
                        <Building className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">Freight &amp; Hospital Lifts</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Engineered for rugged durability, high load capacity, and heavy duty industrial or healthcare applications with precise floor alignment.
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Load capacities from 1000KG to 5000KG</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Anti-collision bumper strips in cab</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Wide, multi-panel sliding door mechanisms</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {activeProductTab === "escalators" && (
                <>
                  {/* Commercial Escalators */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/30 transition-all">
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f37021]">
                        <Maximize className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">Commercial Escalators</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        High capacity, continuous vertical transit systems for busy urban commercial centers, train stations, shopping malls and airports.
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Energy saving eco-mode (Idle speed sensor)</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Integrated safety skirt brush lighting</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> 30-degree and 35-degree inclinations</li>
                      </ul>
                    </div>
                  </div>

                  {/* Moving Walks */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/30 transition-all">
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f37021]">
                        <Maximize className="w-6 h-6 animate-pulse" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">Moving Walkways</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Reliable horizontal transport arrays for malls and transit hubs. Offers comfortable movement over long distances.
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Smooth step connection panels</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Anti-static comb protection</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Indoor and outdoor configurations</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {activeProductTab === "special" && (
                <>
                  {/* Car Lift */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/30 transition-all">
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f37021]">
                        <Sliders className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">Car Lifts &amp; Cargo Elevators</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Heavy duty vertical platforms optimized to transport motor vehicles safely between parking levels in modern high-density structures.
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Double operating panels (COP)</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Hydraulic and traction options</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Capacity up to 5000KG</li>
                      </ul>
                    </div>
                  </div>

                  {/* Car Stacking System */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/30 transition-all">
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f37021]">
                        <Building className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">Car Stacking Systems</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Automated multi-level parking rack configurations designed to stack vehicles vertically, doubling or tripling parking bay density.
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Heavy duty steel layout tracks</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Smart photoelectric sensors</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Fail-safe mechanical locking hooks</li>
                      </ul>
                    </div>
                  </div>

                  {/* Staircase Elevators */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/30 transition-all">
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f37021]">
                        <Sliders className="w-6 h-6 animate-pulse" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">Staircase &amp; Home Lifts</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Accessibility lift chairs and compact residential elevators providing easy vertical mobility within multi-story private properties.
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Compact space-efficient tracks</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Ultra-quiet motor system</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Rechargeable backup battery array</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {activeProductTab === "power" && (
                <>
                  {/* Heavy Duty Generators */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/30 transition-all">
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f37021]">
                        <Zap className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">Generators &amp; Power Backups</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Supply, installation and integration of robust commercial generator backup sets (including Perkins, Cummins) and Automatic Transfer Switch (ATS) panels.
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> ATS power transition under 5 seconds</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Soundproof canopy configurations</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Seamless lift brake release power arrays</li>
                      </ul>
                    </div>
                  </div>

                  {/* Building Mechanical Services */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/30 transition-all">
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f37021]">
                        <Wrench className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">Mechanical HVAC Systems</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Design, ventilation layout, fresh air and exhaust air systems matching international airflow requirements.
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Complex duct routing &amp; damper systems</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Multi-zone commercial air filtration</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Low vibration bracket mountings</li>
                      </ul>
                    </div>
                  </div>

                  {/* Electrical & Structural Construction */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/30 transition-all">
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f37021]">
                        <Hammer className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">Structural &amp; Electrical Setup</h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Building electrical cable installations, heavy duty main distribution panels, wiring, and steel structure construction for external elevator shafts.
                      </p>
                      <ul className="space-y-1 text-xs text-slate-600 font-medium pt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Certified steel elevator shafts</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Cable tray and wiring bus integration</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f37021]" /> Grounding and lightning rod frameworks</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Section: Strategic Brand Partners (Slides 15-16) */}
      <section id="partners" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#f37021] uppercase tracking-widest block mb-2">Our Alliances</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
              Sourced From Global Engineering Leaders
            </h2>
            <p className="text-slate-600 mt-4 font-light leading-relaxed">
              Shining Star works directly with elite global manufacturers, importing premium elevator machinery certified with Europe CE standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Fuji Precision Partner */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col justify-between hover:border-orange-500/30 transition-all duration-300 shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl" />
              <div className="space-y-4">
                <div className="inline-flex px-3 py-1 bg-orange-100 rounded-full text-xs font-bold text-[#f37021]">
                  Japan Technology
                </div>
                <h3 className="text-xl font-bold text-slate-900">FUJI PRECISION</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Equipped with specialized high-tech frequency converters based on advanced control theory and ergonomic design principles. Uses permanent magnet synchronous motors that cut electricity consumption by over 48%.
                </p>
                <div className="p-3 bg-white border border-slate-100 rounded-xl text-[10px] text-slate-400 font-light">
                  <strong className="block text-slate-700 font-bold mb-1">Official Authorized Partner:</strong>
                  Suzhou FUJI Precision Elevator Co., Ltd. <br />
                  Authorization Number: NO. 202404130013
                </div>
              </div>
            </div>

            {/* Orona Partner */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col justify-between hover:border-orange-500/30 transition-all duration-300 shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl" />
              <div className="space-y-4">
                <div className="inline-flex px-3 py-1 bg-slate-950/5 rounded-full text-xs font-bold text-slate-600">
                  Spain
                </div>
                <h3 className="text-xl font-bold text-slate-900">ORONA ELEVATORS</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  A premium global manufacturer with more than 50 years of experience. We import their world-class traction-based elevator configurations designed to fit narrow shaft structures without machine room requirements.
                </p>
                <div className="p-3 bg-white border border-slate-100 rounded-xl text-[10px] text-slate-400 font-light">
                  <strong className="block text-slate-700 font-bold mb-1">Origin Profile:</strong>
                  Manufactured strictly in Europe. Complies fully with European directive EN 81-20/50 elevator regulations.
                </div>
              </div>
            </div>

            {/* Sword Partner */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col justify-between hover:border-orange-500/30 transition-all duration-300 shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl" />
              <div className="space-y-4">
                <div className="inline-flex px-3 py-1 bg-slate-950/5 rounded-full text-xs font-bold text-slate-600">
                  China
                </div>
                <h3 className="text-xl font-bold text-slate-900">SWORD ELEVATORS</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Sword Elevator is one of the largest elevator and escalator manufacturers and technical service suppliers in China. Sword delivers extensive specialized products engineered for modern high-rise development grids.
                </p>
                <div className="p-3 bg-white border border-slate-100 rounded-xl text-[10px] text-slate-400 font-light">
                  <strong className="block text-slate-700 font-bold mb-1">Global Certification:</strong>
                  Products bear Europe CE safety seal, Russia GOST standard certification and national ISO standard metrics.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Section: Comprehensive Filterable Project Dashboard (Slides 17-22 & 26-34) */}
      <section id="projects" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-[#f37021] uppercase tracking-widest block mb-2">Corporate Database</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
                Our Project Accomplishments &amp; SLA Portfolio
              </h2>
              <p className="text-slate-600 mt-2 font-light max-w-2xl text-sm">
                Explore our exhaustive list of completed installations, active construction sites, and preventive maintenance service agreements across East Africa.
              </p>
            </div>

            {/* Engineering Dashboard Stats Block */}
            <div className="bg-slate-950 text-white p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-center border border-slate-900 shadow-xl w-full lg:max-w-2xl">
              <div className="flex gap-6 items-center justify-between w-full md:w-auto border-r border-slate-900 pr-6">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-extrabold">
                    {lang === "en" ? "Completed Installations" : "የተጠናቀቁ ተከላዎች"}
                  </span>
                  <span className="text-2xl font-black text-[#f37021] font-display leading-tight">
                    {statsSummary.completed} {lang === "en" ? "Lifts" : "ሊፍቶች"}
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-900" />
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-extrabold">
                    {lang === "en" ? "Active SLA Care" : "ንቁ የጥገና ስምምነት"}
                  </span>
                  <span className="text-2xl font-black text-white font-display leading-tight">
                    {statsSummary.maintenance} {lang === "en" ? "Sites" : "ጣቢያዎች"}
                  </span>
                </div>
              </div>

              {/* Brands Distribution Indicators */}
              <div className="flex-1 w-full space-y-2">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-extrabold">
                  {lang === "en" ? "Sourced Brand Share" : "የብራንድ ስርጭት ስታቲስቲክስ"}
                </span>
                <div className="space-y-1.5 text-[10px]">
                  {/* Fuji */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between font-mono text-[9px] text-slate-400">
                      <span>FUJI PRECISION (JAPAN TECH)</span>
                      <span className="text-orange-500 font-bold">80%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#f37021] h-full rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>
                  {/* Orona */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between font-mono text-[9px] text-slate-400">
                      <span>ORONA (SPAIN / EU)</span>
                      <span className="text-amber-500 font-bold">12%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "12%" }} />
                    </div>
                  </div>
                  {/* Sword */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between font-mono text-[9px] text-slate-400">
                      <span>SWORD / OTHERS</span>
                      <span className="text-blue-500 font-bold">8%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: "8%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Filtering Toolbar */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm mb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Search input */}
              <div className="md:col-span-5 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search project name, location or brand..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 focus:bg-white text-slate-800 font-medium"
                />
              </div>

              {/* Status filter tabs */}
              <div className="md:col-span-4 flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                {[
                  { id: "All", label: "All" },
                  { id: "Completed", label: "Completed" },
                  { id: "Ongoing", label: "Ongoing" },
                  { id: "Maintenance", label: "SLA Care" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id as any)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      statusFilter === tab.id 
                        ? "bg-slate-950 text-white shadow-sm" 
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Brand filter dropdown */}
              <div className="md:col-span-3">
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-700 focus:outline-none focus:border-orange-500 focus:bg-white"
                >
                  <option value="All">All Brands Sourced</option>
                  <option value="Fuji">Fuji Precision (Japan)</option>
                  <option value="Sword">Sword (China)</option>
                  <option value="Orona">Orona (Spain)</option>
                  <option value="GiantKONE">GiantKONE</option>
                  <option value="JUJI">JUJI</option>
                </select>
              </div>

            </div>

            {/* Quick Helper Filter Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Quick Searches:</span>
              {[
                { label: "Tsihay (25 Lifts)", query: "Tsihay" },
                { label: "Bole Adey", query: "Adey" },
                { label: "Kazanchis", query: "Kazanchis" },
                { label: "Felewuha", query: "Felewuha" },
                { label: "Car Stacker lifts", query: "staking" }
              ].map((badge, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(badge.query)}
                  className="bg-slate-50 hover:bg-orange-50 hover:text-[#f37021] text-slate-600 font-medium px-2.5 py-1 rounded-md border border-slate-200 transition-colors"
                >
                  {badge.label}
                </button>
              ))}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-red-500 font-bold hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Grid Results */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((p, idx) => (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:border-orange-500/20"
                >
                  <div className="space-y-4">
                    
                    {/* Card Top: Brand & Status */}
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-0.5 bg-slate-100 rounded-md text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        {p.brand}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === "Completed" 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : p.status === "Ongoing" 
                          ? "bg-amber-50 text-amber-700 border border-amber-200" 
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          p.status === "Completed" ? "bg-green-500" : p.status === "Ongoing" ? "bg-amber-500" : "bg-blue-500"
                        }`} />
                        {p.status === "Maintenance" ? "SLA Maintenance" : p.status}
                      </span>
                    </div>

                    {/* Building Name */}
                    <div>
                      <h4 className="text-base font-extrabold text-slate-950 tracking-tight leading-snug font-display">
                        {p.name}
                      </h4>
                      {p.amharicName && (
                        <span className="block text-xs text-slate-400 font-medium font-amharic mt-0.5">
                          {p.amharicName}
                        </span>
                      )}
                    </div>

                    {/* Project Specifications List */}
                    <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-light">Location:</span>
                        <span className="font-semibold text-slate-700 text-right">{p.location}</span>
                      </div>
                      {p.floors && (
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-light">Structure Height:</span>
                          <span className="font-semibold text-slate-700 text-right">{p.floors}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-light">Load Capacity:</span>
                        <span className="font-semibold text-slate-700 text-right">{p.capacity}</span>
                      </div>
                    </div>

                  </div>

                  {/* Card Bottom: Units Counter & Details */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-light leading-relaxed max-w-[70%]">
                      {p.details || "Comprehensive elevator supply & setup."}
                    </span>
                    <div className="bg-slate-900 text-white rounded-lg px-2.5 py-1 text-center flex-shrink-0 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-[#f37021]" />
                      <span className="text-xs font-black font-display">{p.units} {p.units === 1 ? "Unit" : "Units"}</span>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-light">No matching projects found. Try checking spelling or using a different quick badge filter.</p>
            </div>
          )}

        </div>
      </section>

      {/* Section: Interactive Photo Gallery of Handed Over Systems */}
      <section id="gallery" className="py-24 bg-slate-950 text-white relative border-b border-slate-900 overflow-hidden">
        {/* Abstract background grid */}
        <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f37021]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#f37021] uppercase tracking-widest block mb-2">
              {lang === "en" ? "Interactive Photo Gallery" : "የስራዎቻችን ማዕከለ-ስዕላት"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              {lang === "en" ? "Representative Completed Project Showcase" : "የተጠናቀቁ ፕሮጀክቶች እውነተኛ ምስሎች"}
            </h2>
            <p className="text-slate-400 mt-4 font-light leading-relaxed">
              {lang === "en" 
                ? "Browse actual photos showcasing our high-end passenger cabins, panoramic glass systems, integrated controller cabinets, and heavy-duty generators sourced from global leaders."
                : "ከዓለም መሪ አምራቾች ያቀረብናቸውንና የገጠምናቸውን የሊፍት ካቢኔዎች፥ የመቆጣጠሪያ ሲስተሞች እና የኃይል ጄነሬተሮች እውነተኛ ፎቶዎች ይመልከቱ።"}
            </p>
          </div>

          {/* Gallery Category Navigation/Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "all", en: "All Showcase", am: "ሙሉ ማሳያ", icon: Layers },
              { id: "passenger", en: "Passenger Cabins", am: "የሰው ማመላለሻ", icon: Building },
              { id: "panoramic", en: "Panoramic Glass", am: "ፓኖራሚክ መስታወት", icon: Eye },
              { id: "systems", en: "Systems & Install", am: "መቆጣጠሪያ እና ተከላ", icon: Cpu },
              { id: "power", en: "Backup Power", am: "ጄነሬተሮች", icon: Zap }
            ].map((cat) => {
              const IconComp = cat.icon;
              const isActive = galleryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setGalleryFilter(cat.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive 
                      ? "bg-[#f37021] text-white shadow-lg shadow-orange-500/20 animate-pulse-subtle" 
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  {lang === "en" ? cat.en : cat.am}
                </button>
              );
            })}
          </div>

          {/* Dynamic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredGalleryItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.originalIndex}
                  onClick={() => setSelectedGalleryImage(item.originalIndex)}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl hover:border-[#f37021]/50 cursor-pointer transition-all duration-300 hover:shadow-orange-500/5"
                >
                  {/* Next.js Image Component */}
                  <Image
                    src={item.url}
                    alt={lang === "en" ? item.title_en : item.title_am}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20 opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                  
                  {/* Centered Zoom Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Maximize className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Top-Left Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f37021]" />
                      {item.category === "passenger" ? (lang === "en" ? "Passenger" : "ሰው ማመላለሻ") :
                       item.category === "panoramic" ? (lang === "en" ? "Panoramic" : "ፓኖራሚክ") :
                       item.category === "systems" ? (lang === "en" ? "System" : "ሲስተም") :
                       (lang === "en" ? "Generator" : "ጄነሬተር")}
                    </span>
                  </div>

                  {/* Bottom Information Details */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-20">
                    <h3 className="text-base font-extrabold text-white tracking-tight leading-snug font-display group-hover:text-[#f37021] transition-colors duration-300">
                      {lang === "en" ? item.title_en : item.title_am}
                    </h3>
                    <p className="text-xs text-slate-400 font-light line-clamp-2 mt-1.5 leading-relaxed">
                      {lang === "en" ? item.desc_en : item.desc_am}
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>{lang === "en" ? "Sourced System Specification" : "የስርዓቱ ዝርዝር መግለጫ"}</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-400" /> EN 81 Compliant
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Lightbox Modal Overlay for Selected Gallery Image */}
      <AnimatePresence>
        {selectedGalleryImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/98 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto"
            onClick={() => setSelectedGalleryImage(null)}
          >
            {/* Close instruction top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-slate-500 text-[10px] uppercase tracking-widest font-mono hidden md:block">
              {lang === "en" ? "Press Esc or Click anywhere to Close" : "ለመዝጋት የትም ቦታ ላይ ይጫኑ"}
            </div>

            {/* Inner Interactive Board Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-12 self-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button top right */}
              <button
                onClick={() => setSelectedGalleryImage(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-950/80 hover:bg-[#f37021] text-white border border-slate-800/80 transition-all hover:scale-105 shadow-xl cursor-pointer animate-in fade-in duration-300"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Container (Grid 7-cols) */}
              <div className="md:col-span-7 relative aspect-[4/3] md:aspect-auto md:h-[520px] bg-black">
                <Image
                  src={GALLERY_ITEMS[selectedGalleryImage].url}
                  alt={lang === "en" ? GALLERY_ITEMS[selectedGalleryImage].title_en : GALLERY_ITEMS[selectedGalleryImage].title_am}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-contain"
                />
                
                {/* Horizontal Navigation Buttons inside Image viewport */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const prevIdx = (selectedGalleryImage - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
                      setSelectedGalleryImage(prevIdx);
                    }}
                    className="w-10 h-10 rounded-full bg-slate-950/80 border border-slate-800 hover:border-[#f37021] text-white flex items-center justify-center transition-all hover:bg-slate-900 shadow-xl pointer-events-auto cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextIdx = (selectedGalleryImage + 1) % GALLERY_ITEMS.length;
                      setSelectedGalleryImage(nextIdx);
                    }}
                    className="w-10 h-10 rounded-full bg-slate-950/80 border border-slate-800 hover:border-[#f37021] text-white flex items-center justify-center transition-all hover:bg-slate-900 shadow-xl pointer-events-auto cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Context Details Panel (Grid 5-cols) */}
              <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800">
                <div className="space-y-6">
                  {/* Category Pill Tag */}
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f37021] animate-ping" />
                      {GALLERY_ITEMS[selectedGalleryImage].category.toUpperCase()} SOLUTION
                    </span>
                  </div>

                  {/* Headings */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-black font-display text-white tracking-tight leading-snug">
                      {lang === "en" ? GALLERY_ITEMS[selectedGalleryImage].title_en : GALLERY_ITEMS[selectedGalleryImage].title_am}
                    </h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed mt-3">
                      {lang === "en" ? GALLERY_ITEMS[selectedGalleryImage].desc_en : GALLERY_ITEMS[selectedGalleryImage].desc_am}
                    </p>
                  </div>

                  {/* Sourced Specifications Card */}
                  <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">
                      {lang === "en" ? "System Specifications" : "የስርዓቱ ቴክኒካዊ መግለጫ"}
                    </span>
                    <strong className="text-white text-xs block leading-relaxed font-mono">
                      {lang === "en" ? GALLERY_ITEMS[selectedGalleryImage].specs_en : GALLERY_ITEMS[selectedGalleryImage].specs_am}
                    </strong>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold mt-1">
                      <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      {lang === "en" ? "Fully EN 81 Standards Certified" : "የደህንነት መስፈርቶች (EN 81) የተረጋገጠለት"}
                    </div>
                  </div>
                </div>

                {/* Form Integration CTA Trigger Button */}
                <div className="pt-8 border-t border-slate-850 mt-8">
                  <button
                    onClick={() => handleInquiryForGalleryItem(selectedGalleryImage)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#f37021] hover:bg-[#d65103] text-white text-xs font-bold uppercase tracking-wider py-4 px-4 rounded-xl transition-all shadow-lg shadow-orange-500/10 hover:scale-[1.02] duration-200"
                  >
                    {lang === "en" ? "Inquire For This System Setup" : "ስለዚህ ሲስተም ዋጋ ይጠይቁ"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[9px] text-slate-500 mt-2.5">
                    {lang === "en" 
                      ? "*Transfers technical config to contact form below & scrolls view down."
                      : "*ቴክኒካዊ መግለጫውን ወደ መጠየቂያ ፎርሙ በማዛወር ገጹን ወደዚያ ያሸጋግረዋል።"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section: Credentials, Accreditations & Letters (Slides 35-39) */}
      <section id="credentials" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#f37021] uppercase tracking-widest block mb-2">Accreditations &amp; Feedback</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
              Licensed Compliance &amp; Client Testimonials
            </h2>
            <p className="text-slate-600 mt-4 font-light leading-relaxed">
              We represent real certified engineering prowess. Read through our official manufacturer authorizations and appreciative letters from corporate clients.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            
            {/* Column 1: Verification Credentials */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-[#f37021]" />
                Official Factory Training &amp; Certificates
              </h3>

              {/* Fuji Precision Certification */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Suzhou FUJI Precision Elevator Co., Ltd</h4>
                    <span className="text-[10px] text-slate-400 block font-light">Official Authorized Partner Letter</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-orange-100 text-[#f37021] rounded text-[10px] font-bold uppercase tracking-wider">
                    Valid Mar 2026 - Mar 2027
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  This authorizes <strong>Shining Star Electro Mechanical Work</strong> to sell, install, commission and maintain FUJI passenger elevators, freight elevators, panoramas, escalators &amp; moving walks in Ethiopia.
                </p>
                <div className="border-t border-slate-200/60 pt-3 text-[10px] text-slate-400 flex justify-between">
                  <span>Certificate ID: NO. 202404130013</span>
                  <span>Origin: Japan Tech / China Factory</span>
                </div>
              </div>

              {/* Sicher Elevator SRH Training */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">SRH Safe Reach Certification</h4>
                    <span className="text-[10px] text-slate-400 block font-light">Level 1 Commissioning &amp; Installation Training</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-slate-950 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                    Sicher Elevator Co. Ltd.
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  Our chief engineer <strong>Dibekulu Admit</strong> of MRL Engineering &amp; Trading PLC has successfully completed Sicher Elevator installation &amp; commissioning training, verifying full qualifications to configure traction systems up to 1600KG speed 1.75m/s and escalators.
                </p>
                <div className="border-t border-slate-200/60 pt-3 text-[10px] text-slate-400 flex justify-between">
                  <span>Certificate No: SRH-T-R&amp;D-2018070004</span>
                  <span>Date Issued: 2018.7.7</span>
                </div>
              </div>

            </div>

            {/* Column 2: Client Appreciation Letters Quotes */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#f37021]" />
                Letters of Appreciation
              </h3>

              {/* Slider / Scrolling list of quotes */}
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                
                {[
                  {
                    client: "AFRO-TSION Construction PLC",
                    project: "Road Research Center (RRC) Building & Facilities Project",
                    date: "February 3, 2025",
                    quote: "This is to certify that Shining Star successfully completed the maintenance, testing, and handover of two (2) Hyundai elevator units. The services were carried out with the highest level of technical competence, professionalism, and strict adherence to safety and operational standards. We highly appreciate their dedication and collaborative approach."
                  },
                  {
                    client: "LEGO STAR HOTEL",
                    project: "Supply & SLA Maintenance Support",
                    date: "November 4, 2023",
                    quote: "We would like to express our sincere appreciation for your service to us as one of our most reliable regular suppliers and maintenance partners. Ever since we signed our contract, you have provided the highest quality products with even better customer service. Your commitment to excellence inspired our own team."
                  },
                  {
                    client: "FEAS Trading PLC (Haile Eshetu - Gen. Manager)",
                    project: "Elevator Installations",
                    date: "December 22, 2025",
                    quote: "I am writing to express my profound satisfaction for the exceptional services that your company has provided me. As a regular user of elevators, I can honestly say that your installations are undoubtedly some of the best in the market. From prompt installation to routine maintenance and efficient repair, you delivered top-notch solutions."
                  },
                  {
                    client: "Dandirose Building Rental",
                    project: "Supply & Commissioning",
                    date: "July 18, 2025",
                    quote: "We would like to express our sincere appreciation for the outstanding service provided by SHINING STAR. The company has successfully completed the supply, installation, testing, and commissioning of two (2) FUJI elevator units with a high level of professionalism and technical excellence."
                  },
                  {
                    client: "Tolip Olympia Hotel (Assefa Gebeye - Gen. Manager)",
                    project: "Elevator Modernization Case Study",
                    date: "December 22, 2025",
                    quote: "Tolip Olympia Hotel entrusted Shining Star with the modernization of two elevators, and we are very pleased with the results. The upgraded elevators offer smoother operation, improved safety, reduced noise, and a modern appearance that enhances our guests' experience."
                  }
                ].map((letter, index) => (
                  <div key={index} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl relative">
                    <div className="absolute top-4 right-4 text-slate-300 font-serif text-5xl select-none leading-none">”</div>
                    <p className="text-xs text-slate-600 font-light leading-relaxed italic pr-4 mb-4">
                      "{letter.quote}"
                    </p>
                    <div className="border-t border-slate-200/60 pt-3">
                      <span className="block text-xs font-extrabold text-slate-900 leading-tight">{letter.client}</span>
                      <span className="block text-[10px] text-slate-400 font-light mt-0.5">{letter.project} &bull; {letter.date}</span>
                    </div>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Section: Interactive Elevator Specification Estimator */}
      <section id="estimator" className="py-24 bg-slate-950 text-white border-b border-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f37021]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#f37021] uppercase tracking-widest block mb-2">
              {lang === "en" ? "Interactive Specification Tool" : "በይነተገናኝ የሊፍት መግለጫ ማስያ"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight leading-tight">
              {lang === "en" ? "Calculate & Configure Your Building's Lifts" : "የህንጻዎን ሊፍት ያዋቅሩ እና ያሰሉ"}
            </h2>
            <p className="text-slate-400 mt-4 font-light leading-relaxed text-sm">
              {lang === "en" 
                ? "Answer a few quick architectural questions about your high-rise structure, operate our real-time 2D lift shaft simulator, and get certified motor suggestions."
                : "ስለ ህንጻዎ ጥቂት መረጃዎችን ያስገቡ፥ የእውነተኛ ጊዜ ሊፍት ማስመሰያውን ያንቀሳቅሱ እና ፍጹም የሆነውን የሊፍት ፍላጎቶች እና የሞተር ዲዛይን ምክሮችን ያግኙ።"}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Configuration Inputs */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Sliders className="w-5 h-5 text-[#f37021]" />
                {lang === "en" ? "Design Parameters" : "የንድፍ መለኪያዎች"}
              </h3>
              
              <div className="space-y-5">
                {/* Building Type */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    {lang === "en" ? "Building Type" : "የህንጻው አይነት"}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: "commercial", label_en: "Commercial / Office", label_am: "ለንግድ / ለቢሮ" },
                      { id: "residential", label_en: "Apartment / Hotel", label_am: "ለመኖሪያ / ለሆቴል" },
                      { id: "industrial", label_en: "Industrial / Bed Lift", label_am: "ለኢንዱስትሪ / ለሆስፒታል" }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setEstBuildingType(type.id)}
                        className={`py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border text-left flex justify-between items-center ${
                          estBuildingType === type.id 
                            ? "bg-[#f37021] text-white border-[#f37021] shadow-md shadow-orange-500/10" 
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                        }`}
                      >
                        <span>{lang === "en" ? type.label_en : type.label_am}</span>
                        {estBuildingType === type.id && <Check className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floors Count Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold uppercase tracking-wider text-slate-400">
                      {lang === "en" ? "Building Stories (Floors)" : "የፎቆች ብዛት"}
                    </label>
                    <span className="font-bold text-[#f37021] bg-slate-800 px-2.5 py-0.5 rounded-md text-xs">
                      {estFloors} {lang === "en" ? "Floors" : "ፎቆች"}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min={2} 
                    max={16} 
                    value={estFloors}
                    disabled={isSimulating}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setEstFloors(val);
                      if (currentSimFloor > val) {
                        setCurrentSimFloor(val);
                      }
                    }}
                    className="w-full accent-[#f37021] cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none disabled:opacity-50"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                    <span>G+1 ({lang === "en" ? "2 Floors" : "2 ፎቅ"})</span>
                    <span>G+8 ({lang === "en" ? "9 Floors" : "9 ፎቅ"})</span>
                    <span>G+15 ({lang === "en" ? "16 Floors" : "16 ፎቅ"})</span>
                  </div>
                </div>

                {/* Elevator Nominal Load */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    {lang === "en" ? "Nominal Load Capacity" : "የመጫን አቅም"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { cap: 450, text: "450 KG (6 P)" },
                      { cap: 630, text: "630 KG (8 P)" },
                      { cap: 800, text: "800 KG (10 P)" },
                      { cap: 1000, text: "1000 KG (13 P)" }
                    ].map(item => (
                      <button
                        key={item.cap}
                        onClick={() => setEstCapacity(item.cap)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold uppercase text-center transition-all border ${
                          estCapacity === item.cap 
                            ? "bg-[#f37021] text-white border-[#f37021]" 
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                        }`}
                      >
                        {item.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cabin Aesthetic Style */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    {lang === "en" ? "Cabin Aesthetic Finish" : "የካቢን ውበት ዲዛይን"}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: "passenger", label_en: "Stainless Steel Standard", label_am: "ስታንለስ ስቲል ስታንዳርድ" },
                      { id: "panoramic", label_en: "Panoramic Glass Cap", label_am: "ፓኖራሚክ መስታወት ካፕ" },
                      { id: "home", label_en: "Luxury Custom Trim", label_am: "ቅንጡ ብጁ ዲዛይን" }
                    ].map(style => (
                      <button
                        key={style.id}
                        onClick={() => setEstStyle(style.id)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border text-left flex justify-between items-center ${
                          estStyle === style.id 
                            ? "bg-[#f37021] text-white border-[#f37021]" 
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                        }`}
                      >
                        <span>{lang === "en" ? style.label_en : style.label_am}</span>
                        {estStyle === style.id && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: 2D Interactive Lift Shaft Simulator */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-between min-h-[500px]">
              
              {/* Digital Indicator & Status Display */}
              <div className="w-full bg-slate-950 border border-slate-800 px-4 py-3 rounded-2xl flex justify-between items-center text-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-500 tracking-wider font-bold uppercase">
                    {isSimulating ? (simTargetFloor > currentSimFloor ? "UP" : "DOWN") : "STATIONARY"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-400 uppercase font-bold mr-1">FLOOR</span>
                  <div className="bg-slate-900 px-3 py-1 border border-slate-800 text-orange-500 font-extrabold text-sm rounded-md shadow-inner">
                    {currentSimFloor === 1 ? "G" : `L${currentSimFloor - 1}`}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-bold">
                  {simDoorOpen ? "DOORS OPEN" : "DOORS CLOSED"}
                </div>
              </div>

              {/* The Elevator Shaft Grid */}
              <div className="relative w-full h-[320px] bg-slate-950 border-x-4 border-slate-800 rounded-xl my-4 overflow-hidden flex">
                
                {/* Horizontal floor gridlines */}
                <div className="absolute inset-0 pointer-events-none px-4">
                  {Array.from({ length: estFloors }).map((_, i) => {
                    const floorIndex = i + 1; // 1 to estFloors
                    const isSelected = floorIndex === currentSimFloor;
                    // Exact percentage matching cabin bottom (scale from 8% to 84%)
                    const bottomPos = ((floorIndex - 1) / (estFloors - 1)) * 76 + 8;
                    return (
                      <div 
                        key={i} 
                        className="absolute left-4 right-4 flex items-center justify-between border-b border-slate-900/40 text-[8px] font-mono leading-none pb-0.5"
                        style={{ bottom: `${bottomPos}%` }}
                      >
                        <span className={isSelected ? "text-orange-500 font-bold" : "text-slate-700"}>
                          {floorIndex === 1 ? "G" : `L${floorIndex - 1}`}
                        </span>
                        <div className="flex-1 border-t border-dashed border-slate-850/60 mx-2" />
                        <span className={isSelected ? "text-orange-500 font-bold" : "text-slate-700"}>
                          {((floorIndex - 1) * 3).toFixed(1)}m
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Vertical Cable representation */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-slate-700 to-slate-900 pointer-events-none" />

                {/* Animated Cabin Container */}
                <motion.div 
                  className="absolute left-1/2 -translate-x-1/2 w-20 h-10 bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-orange-500 rounded-lg shadow-2xl shadow-orange-500/20 flex flex-col justify-between p-1 z-10 cursor-pointer overflow-hidden"
                  animate={{ 
                    bottom: `${((currentSimFloor - 1) / (estFloors - 1)) * 76 + 8}%`
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 70,
                    damping: 20
                  }}
                >
                  {/* Inside Cabin indicator lights */}
                  <div className="flex justify-between items-center text-[7px] font-mono px-1">
                    <span className="text-orange-400 font-bold">{currentSimFloor === 1 ? "G" : `L${currentSimFloor-1}`}</span>
                    <div className="flex gap-0.5">
                      <span className={`w-1 h-1 rounded-full ${isSimulating ? "bg-amber-500 animate-ping" : "bg-emerald-500"}`} />
                      <span className={`w-1 h-1 rounded-full ${simDoorOpen ? "bg-emerald-500" : "bg-red-500"}`} />
                    </div>
                  </div>

                  {/* double sliding doors animation */}
                  <div className="relative flex-1 bg-slate-950 border border-slate-800 rounded mt-0.5 flex overflow-hidden">
                    {/* Glass backdrop if panoramic */}
                    {estStyle === "panoramic" && (
                      <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="text-[6px] text-cyan-400 font-bold opacity-60">GLASS CAP</span>
                      </div>
                    )}
                    {/* Sliding Left Door */}
                    <div 
                      className="absolute inset-y-0 left-0 w-1/2 bg-slate-700 border-r border-slate-600 transition-transform duration-500 shadow-inner"
                      style={{ transform: simDoorOpen ? "translateX(-90%)" : "translateX(0)" }}
                    />
                    {/* Sliding Right Door */}
                    <div 
                      className="absolute inset-y-0 right-0 w-1/2 bg-slate-700 border-l border-slate-600 transition-transform duration-500 shadow-inner"
                      style={{ transform: simDoorOpen ? "translateX(90%)" : "translateX(0)" }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Call Floor Controls pad */}
              <div className="w-full space-y-2">
                <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider text-center">
                  {lang === "en" ? "CALL ELEVATOR CAB TO FLOOR" : "ሊፍቱን ለመጥራት ፎቅ ይምረጡ"}
                </span>
                <div className="flex flex-wrap justify-center gap-1.5 max-h-[100px] overflow-y-auto p-1 bg-slate-950/50 border border-slate-850 rounded-xl custom-scrollbar">
                  {Array.from({ length: estFloors }).map((_, idx) => {
                    const fl = idx + 1;
                    const isActive = currentSimFloor === fl;
                    const isTarget = simTargetFloor === fl && isSimulating;
                    return (
                      <button
                        key={fl}
                        disabled={isSimulating}
                        onClick={() => handleSimulateElevator(fl)}
                        className={`w-7 h-7 rounded-full font-mono text-[10px] font-bold flex items-center justify-center transition-all ${
                          isActive 
                            ? "bg-[#f37021] text-white shadow-md shadow-orange-500/20" 
                            : isTarget
                              ? "bg-amber-500 text-slate-950 animate-pulse font-black"
                              : "bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-50"
                        }`}
                      >
                        {fl === 1 ? "G" : `L${fl - 1}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Column 3: Recommended Technical Outputs */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-6 self-stretch flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2 border-b border-slate-800 pb-3 mb-5">
                  <Cpu className="w-5 h-5 text-[#f37021]" />
                  {lang === "en" ? "System Specifications" : "የስርዓቱ ቴክኒካዊ መግለጫ"}
                </h3>

                <div className="space-y-4">
                  {/* Recommended Speed */}
                  <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-2xl">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      {lang === "en" ? "Recommended Speed" : "የሚመከር ፍጥነት"}
                    </span>
                    <strong className="text-white text-sm block mt-1">
                      {estFloors <= 4 
                        ? "1.0 m/s (VVVF Geared)" 
                        : estFloors <= 10 
                          ? "1.6 m/s (VVVF Gearless)" 
                          : "2.0 m/s (High Speed Gearless)"}
                    </strong>
                  </div>

                  {/* Load Capacity in Persons */}
                  <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-2xl">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      {lang === "en" ? "Cabin Capacity" : "የመጫን አቅም መለኪያ"}
                    </span>
                    <strong className="text-white text-sm block mt-1">
                      {Math.round(estCapacity / 75)} {lang === "en" ? "Persons Max" : "ሰው ከፍተኛ"} ({estCapacity}KG)
                    </strong>
                  </div>

                  {/* Motor Assembly Suggestions */}
                  <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-2xl">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      {lang === "en" ? "Suggested Motor Assembly" : "የሚመከር ሞተር"}
                    </span>
                    <strong className="text-[#f37021] text-sm block mt-1">
                      {estStyle === "panoramic" 
                        ? "PMSM Gearless (Suzhou FUJI Precision tech)" 
                        : "VVVF Integrated System"}
                    </strong>
                  </div>

                  {/* Compliant Design Standards */}
                  <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-2xl">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      {lang === "en" ? "Design Compliance" : "የደህንነት መስፈርቶች"}
                    </span>
                    <strong className="text-emerald-400 text-xs block mt-1 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      EN 81-20/50 Safety Standard Guaranteed
                    </strong>
                  </div>
                </div>
              </div>

              {/* Apply / Select Config Proposal Trigger */}
              <div className="pt-6 border-t border-slate-800 mt-6">
                <button 
                  onClick={handleApplyConfig}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#f37021] hover:bg-[#d65103] text-white text-xs font-bold uppercase tracking-wider py-4 px-4 rounded-xl transition-all shadow-lg shadow-orange-500/10 hover:scale-[1.02] duration-200"
                >
                  {lang === "en" ? "Apply Config & Request Quote" : "አወቃቀሩን ተግብር እና ዋጋ ጠይቅ"}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="block text-[9px] text-slate-500 text-center mt-2.5 leading-relaxed">
                  {lang === "en" 
                    ? "*Compiles parameters directly into inquiry state and moves view to submission portal."
                    : "*ያዋቀሩትን መለኪያ በቀጥታ ወደ መጠየቂያ ፎርሙ በመውሰድ ገጹን ወደዚያ ያሸጋግረዋል።"}
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Section: Main Corporate Inquiry Portal (Form & Physical Contact) */}
      <section id="inquiry-portal" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Side: Detailed office & contact stats */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold text-[#f37021] uppercase tracking-widest block mb-2 font-display">Contract &amp; Supply</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
                  Initiate An Engineering Dialogue
                </h2>
                <p className="text-slate-600 mt-4 font-light text-sm leading-relaxed">
                  Our chief engineering estimators are standing by to process your building specs, compile certified CAD schematics, and coordinate safe structural implementations in Addis Ababa or regionally.
                </p>
              </div>

              {/* Direct Info Blocks */}
              <div className="space-y-6">
                
                {/* Physical Location */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 leading-none">Main Corporate Headquarters</h4>
                    <span className="block text-sm text-slate-900 font-bold mt-1.5 leading-relaxed">
                      Bole Sub city, Woreda 03, Addis Ababa, Ethiopia <br />
                      Bole Medhanialem, DandiRose Building, 4th Floor, Office No. 405
                    </span>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 leading-none">Engineering &amp; Sales Proposals</h4>
                    <span className="block text-sm text-slate-900 font-bold mt-1.5">
                      shiningstarlink@gmail.com <br />
                      info@shiningstarlink.com
                    </span>
                  </div>
                </div>

                {/* Direct Telephone Arrays */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 leading-none">Director Hotlines (Call or Telegram)</h4>
                    <span className="block text-sm text-slate-900 font-bold mt-1.5 space-y-1">
                      <span className="block">&bull; +251 985 064 087</span>
                      <span className="block">&bull; +251 989 077 777</span>
                      <span className="block">&bull; +251 911 675 505</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Emergency Call-out Box */}
              <div className="bg-slate-950 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-slate-900">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f37021]/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-2 text-[#f37021] text-xs font-bold uppercase tracking-wider mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  24/7 Lift Breakdown Extraction Line
                </div>
                <h4 className="text-xl font-bold font-display tracking-tight mb-2">Emergency Rescue Dispatch</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light mb-6">
                  In the event of localized building grid failure or lift suspension anomalies, our expert crew is dispatched with original components instantly. Dial our hotline.
                </p>
                <a 
                  href="tel:+251985064087"
                  className="inline-flex items-center gap-2 bg-[#f37021] hover:bg-[#d65103] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  Initiate Rescue Dispatch
                </a>
              </div>

            </div>

            {/* Right Side: Corporate Inquiry Form */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-8 sm:p-12 rounded-3xl">
              <h3 className="text-xl font-bold text-slate-950 font-display mb-2">Project Intake Form</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed mb-6">
                Please compile your details and expected building floors config. Our registered mechanical estimators will compile a formal quote within 24 hours.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-6">
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="name">Your Name</label>
                    <input 
                      id="name"
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] text-slate-800"
                      placeholder="e.g. Dibekulu Admit"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="company">Company / Client Name</label>
                    <input 
                      id="company"
                      type="text" 
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] text-slate-800"
                      placeholder="e.g. Tsihay Real Estate Development"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="email">Email Address</label>
                    <input 
                      id="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] text-slate-800"
                      placeholder="e.g. info@shiningstarlink.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="phone">Phone Number</label>
                    <input 
                      id="phone"
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] text-slate-800"
                      placeholder="e.g. +251 985 064 087"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-4 gap-4">
                  {/* Service type */}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="serviceType">Service Requirement</label>
                    <select 
                      id="serviceType"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021]"
                    >
                      <option value="elevator-install">New Elevator Supply &amp; Installation</option>
                      <option value="elevator-modernize">VVVF Modernization &amp; Retrofits</option>
                      <option value="elevator-maintenance">SLA Routine Preventive Maintenance</option>
                      <option value="electromechanical">Mechanical HVAC / Building Electrical</option>
                      <option value="power-generator">Heavy Duty Generator / ATS supply</option>
                    </select>
                  </div>

                  {/* Height */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="floorsConfig">Floors Count</label>
                    <input 
                      id="floorsConfig"
                      type="number"
                      value={formData.floorsConfig}
                      onChange={(e) => setFormData({...formData, floorsConfig: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] text-slate-800 text-center font-bold"
                    />
                  </div>

                  {/* Target Capacity */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="capacityConfig">Target Capacity</label>
                    <input 
                      id="capacityConfig"
                      type="text"
                      value={formData.capacityConfig}
                      onChange={(e) => setFormData({...formData, capacityConfig: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] text-slate-800 text-center font-bold"
                      placeholder="e.g. 800kg"
                    />
                  </div>
                </div>

                {/* Message / Specs */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="message">Project Scope &amp; Details</label>
                  <textarea 
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021]"
                    placeholder="Describe building layout details, preferred manufacturer (Fuji, Orona, Sword), timeline, or load capacities..."
                  />
                </div>

                {/* Submit Trigger */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-[#f37021] disabled:bg-slate-400 text-white font-bold uppercase tracking-wider py-4 px-6 rounded-xl text-sm transition-all shadow-md duration-300 hover:scale-[1.01]"
                  >
                    {isSubmitting ? "Transmitting Proposal Request..." : "Submit Proposal Request"}
                    <ArrowRight className="w-4 h-4 text-[#f37021]" />
                  </button>
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs leading-relaxed animate-in fade-in duration-200">
                    <strong className="block mb-1 font-bold">🎉 Request Transmitted Successfully!</strong>
                    {statusMessage}
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs leading-relaxed animate-in fade-in duration-200">
                    <strong className="block mb-1 font-bold">❌ Submission Failed</strong>
                    {statusMessage}
                  </div>
                )}

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* Main Corporate Footer with Social Grid */}
      <footer className="mt-auto bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-900">
            
            {/* Logo and Intro col */}
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-[#f37021] to-[#d65103] rounded-lg flex items-center justify-center text-white">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <span className="text-base font-bold tracking-tight text-white block leading-tight font-display">
                    SHINING STAR
                  </span>
                  <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase block">
                    ELECTRO MECHANICAL WORK
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm">
                Shining Star is Ethiopia's certified electro-mechanical contractor, specializing in luxury vertical transport supply, China factory trained technicians, and robust emergency breakdown support.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-200">"Star of Elevation"</span>
              </div>
            </div>

            {/* Sourced Lift Brands */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-display">Sourced Elevator Tech</h4>
              <ul className="space-y-2 text-xs font-light">
                <li><span className="text-slate-400 font-medium">Fuji Precision (Japan Technology)</span></li>
                <li><span className="text-slate-400 font-medium font-display">Orona Elevators (Europe / Spain)</span></li>
                <li><span className="text-slate-400 font-medium">Sword Elevator Systems (China)</span></li>
                <li><span className="text-slate-400 font-medium">GiantKONE Traction assemblies</span></li>
              </ul>
            </div>

            {/* Corporate Address Quick Links */}
            <div className="md:col-span-4 space-y-4 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-display">Contact Directory</h4>
              <p className="font-light leading-relaxed text-slate-400">
                Office: Bole Medhanialem, DandiRose Building, 4th Floor, office no 405. <br />
                Addis Ababa, Ethiopia
              </p>
              <div className="space-y-1 text-slate-300 font-bold">
                <span className="block">Hotline: +251 985 064 087</span>
                <span className="block">Email: info@shiningstarlink.com</span>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-slate-600">
            <span>&copy; {new Date().getFullYear()} Shining Star Electro Mechanical Work. Built by scanning the 2026 Company Profile.</span>
            <span>Addis Ababa, Ethiopia</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
