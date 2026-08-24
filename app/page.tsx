"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Flame,
  Award,
  Truck,
  Eye,
  Hammer,
  FileCheck,
  UserCheck,
  Compass,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calculator,
  Camera,
  Handshake,
  Sparkles,
  Activity
} from "lucide-react";
import Image from "next/image";
import { CompanyLogo, CompanyLogoIcon } from "@/components/CompanyLogo";

// Pre-defined premium stock images of elevators & modern architecture with referrers
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
  passengerElevator: "/products/passenger-elevator.jpg",
  panoramicElevator: "/products/panoramic-elevator.jpg",
  freightElevator: "/products/freight-elevator.jpg",
  carLift: "/products/car-lift.jpg",
  carStacking: "/products/car-stacking.jpg",
  carPlatform: "/products/car-platform.jpg",
  homeElevator: "/products/home-elevator.jpg",
  escalator: "/products/escalator.jpg",
  movingWalk: "/products/moving-walk.jpg",
  generator: "/products/generator.jpg",
  industrialPanel: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
  teamwork: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
};

// Comprehensive Projects Dataset extracted directly from PDF Pages 17-22 and 26-34
interface ProjectLifecycle {
  stage: "Procurement" | "Structural Work" | "Commissioning";
  progressPercent: number; // 0 - 100%
  currentTask?: string;
  expectedHandover?: string;
}

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
  lifecycle?: ProjectLifecycle;
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
  {
    name: "Get-AS (Getas) International",
    amharicName: "ጌታስ ኢንተርናሽናል",
    location: "Ayat Area, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 1,
    status: "Completed",
    floors: "G+8",
    details: "Supply, installation, testing & commissioning of 1 elevator unit"
  },

  // Ongoing Projects (Slides 31-33 + Recent Additions)
  {
    name: "Soliyana Real Estate",
    amharicName: "ሶሊያና ሪል እስቴት",
    location: "Addis Ababa, Ethiopia",
    brand: "Fuji",
    capacity: "630KG / 8 Persons",
    units: 3,
    status: "Ongoing",
    floors: "B+G+14 = 16 Floors",
    details: "Supply and installation of 3 elevator units (630KG, B+G+14)",
    lifecycle: {
      stage: "Structural Work",
      progressPercent: 65,
      currentTask: "Hoistway guide rails, bracket anchoring & landing door header erection",
      expectedHandover: "Q4 2026"
    }
  },
  {
    name: "Gelay Apartment",
    amharicName: "ገላይ አፓርትመንት",
    location: "Addis Ababa, Ethiopia",
    brand: "Fuji",
    capacity: "800KG / 10 Persons (Panoramic Glass)",
    units: 1,
    status: "Ongoing",
    floors: "G+8 = 9 Floors",
    details: "Supply and installation of 1 panoramic glass elevator (800KG, G+8)",
    lifecycle: {
      stage: "Structural Work",
      progressPercent: 70,
      currentTask: "Panoramic curved glass cab mounting & hoistway brackets setup",
      expectedHandover: "Q3 2026"
    }
  },
  {
    name: "BHA Real Estate",
    amharicName: "ቢኤችኤ ሪል እስቴት",
    location: "Addis Ababa, Ethiopia",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 2,
    status: "Ongoing",
    floors: "G+B+16 & 2B+G+14",
    details: "Supply and installation of 2 elevators (Tower 1: G+B+16, Tower 2: 2B+G+14)",
    lifecycle: {
      stage: "Structural Work",
      progressPercent: 60,
      currentTask: "Dual-shaft plumb-line calibration, traction motor placement & bracket mounting",
      expectedHandover: "Q4 2026"
    }
  },
  {
    name: "RG and Families Real Estate",
    location: "Bole Adey Abeba Stadium, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 2,
    status: "Ongoing",
    floors: "2B+G+17 = 20 Floors",
    details: "Elevator supply, 2 installations, testing & commissioning",
    lifecycle: {
      stage: "Structural Work",
      progressPercent: 70,
      currentTask: "Hoistway guide rails & machine room traction unit mounting",
      expectedHandover: "Q3 2026"
    }
  },
  {
    name: "Fisik Real Estate",
    location: "Wolo Sefer, Addis Ababa",
    brand: "Fuji / Staking",
    capacity: "1000KG / 13 Persons & Car lifts",
    units: 18,
    status: "Ongoing",
    floors: "2B+G+16 = 19 Floors",
    details: "Elevator supply and installation (2 passenger lifts + 15 staking car lifts + 1 car platform lift)",
    lifecycle: {
      stage: "Structural Work",
      progressPercent: 60,
      currentTask: "15 car-stacking frameworks & 2 passenger shaft structural erection",
      expectedHandover: "Q4 2026"
    }
  },
  {
    name: "Matrix Real Estate",
    location: "Wolo Sefer, Addis Ababa",
    brand: "Fuji",
    capacity: "800KG / 10 Persons",
    units: 1,
    status: "Ongoing",
    floors: "B+G+9 = 11 Floors",
    details: "Elevator supply, installation, testing & commissioning 1 unit",
    lifecycle: {
      stage: "Commissioning",
      progressPercent: 88,
      currentTask: "VVVF drive fine-tuning & EN 81-20 safety gear brake tests",
      expectedHandover: "Q2 2026"
    }
  },
  {
    name: "Enetafetu Real Estate",
    location: "Figa, Addis Ababa",
    brand: "Fuji",
    capacity: "450KG / 6 Persons",
    units: 1,
    status: "Ongoing",
    floors: "G+6 = 7 Floors",
    details: "Elevator supply, 1 installation, testing & commissioning",
    lifecycle: {
      stage: "Commissioning",
      progressPercent: 92,
      currentTask: "Final load sensor balancing & ECA authority handover inspection",
      expectedHandover: "Q2 2026"
    }
  },
  {
    name: "Hintsa Building",
    location: "Bisrate Gebereal, Addis Ababa",
    brand: "Fuji",
    capacity: "630KG / 8 Persons & Car lift",
    units: 3,
    status: "Ongoing",
    floors: "G+11",
    details: "Supply and installation of 2 passenger lifts and 1 car lift",
    lifecycle: {
      stage: "Structural Work",
      progressPercent: 65,
      currentTask: "Passenger elevator car assembly & hydraulic car lift mechanism setup",
      expectedHandover: "Q3 2026"
    }
  },
  {
    name: "Africon Real Estate",
    amharicName: "አፍሪኮን ሪል እስቴት",
    location: "22 Area, Addis Ababa",
    brand: "Fuji",
    capacity: "450KG (6 Persons) & 1150KG (15 Persons)",
    units: 2,
    status: "Ongoing",
    floors: "B+G+14 = 16 Floors",
    details: "Elevator supply, 2 installations, testing & commissioning (450KG passenger + 1150KG stretcher/bed lift)",
    lifecycle: {
      stage: "Procurement",
      progressPercent: 40,
      currentTask: "Factory shipping customs clearance & shaft pit waterproofing inspection",
      expectedHandover: "Q4 2026"
    }
  },
  {
    name: "Hamracon Construction",
    location: "Bole Arabesa, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 3,
    status: "Ongoing",
    floors: "2B+G+10",
    details: "Elevator supply, 3 units installation, testing & commissioning",
    lifecycle: {
      stage: "Structural Work",
      progressPercent: 75,
      currentTask: "Counterweight stacking & landing door header synchronizations",
      expectedHandover: "Q3 2026"
    }
  },
  {
    name: "Mulush Construction",
    location: "Bole Arabesa, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 3,
    status: "Ongoing",
    floors: "2B+G+10",
    details: "Elevator supply, 3 units installation, testing & commissioning",
    lifecycle: {
      stage: "Procurement",
      progressPercent: 35,
      currentTask: "Import container staging & preliminary plumb-line shaft alignment",
      expectedHandover: "Q4 2026"
    }
  },
  {
    name: "ANTEM Building",
    amharicName: "አንተም ህንፃ",
    location: "Bole Arabesa, Addis Ababa",
    brand: "Fuji",
    capacity: "1000KG / 13 Persons",
    units: 3,
    status: "Ongoing",
    floors: "2B+G+10",
    details: "Elevator supply, 3 units installation, testing & commissioning",
    lifecycle: {
      stage: "Structural Work",
      progressPercent: 72,
      currentTask: "3-unit guide rail alignment & electrical traveling cable drop",
      expectedHandover: "Q3 2026"
    }
  },
  {
    name: "Dugda Construction",
    amharicName: "ዱግዳ ኮንስትራክሽን",
    location: "Felewuha, Addis Ababa",
    brand: "Fuji Precision",
    capacity: "1600KG / 21 Persons (Panoramic)",
    units: 1,
    status: "Ongoing",
    floors: "2B+G+6 = 9 Floors",
    details: "Elevator supply, 1 panoramic unit installation, testing & commissioning",
    lifecycle: {
      stage: "Commissioning",
      progressPercent: 82,
      currentTask: "Panoramic curved glass cab mounting & smoothness acceleration profiling",
      expectedHandover: "Q3 2026"
    }
  },

  // Preventive Maintenance & Services (Slides 33-34 + Recent Contracts)
  {
    name: "Getu Commercial Center",
    amharicName: "ጌቱ ኮሜርሻል ሴንተር",
    location: "Bole Road (Africa Avenue), Addis Ababa",
    brand: "Standard / Multi-Brand",
    capacity: "Commercial Passenger",
    units: 2,
    status: "Maintenance",
    details: "Comprehensive safety inspection, routine lubrication and 24/7 breakdown service (2 elevators)"
  },
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
    heroSubtitle: "Founded in 2018 by electrical engineer Dibekulu Admit Tagele, Shining Star Electro Mechanical Work delivers world-class elevator, escalator, car-stacking systems, and generators with unparalleled safety standards across Ethiopia and East Africa.",
    configureBtn: "Configure Your System",
    browseProjects: "Browse Projects",
    compLifts: "Completed Lifts",
    ongoingProj: "Ongoing Projects",
    activeMaint: "Active Maintenance",
    groupExp: "Group Experience",
    navHome: "Home",
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
    lifecycleProgress: "Project Lifecycle",
    lifecycleProcurement: "Procurement",
    lifecycleStructural: "Structural Work",
    lifecycleCommissioning: "Commissioning",
    activePhaseLabel: "Active Phase",
    estHandoverLabel: "Target Handover",
  },
  am: {
    heroBadge: "የኢትዮጵያ ቀዳሚ ሊፍት መገጣጠሚያ ድርጅት",
    heroTitle: "የከፍታ ኮከብ፡",
    heroTitleSpan: "አስተማማኝ የሊፍት",
    heroTitleEnd: " አገልግሎቶች",
    heroSubtitle: "በ2018 እ.ኤ.አ በኤሌክትሪካል መሃንዲስ ዲበኩሉ አድሚት ታገለ የተመሰረተው ሻይኒንግ ስታር ኤሌክትሮ መካኒካል ስራዎች፥ በኢትዮጵያ እና በምስራቅ አፍሪካ ወደር የለሽ የደህንነት ደረጃዎችን የጠበቁ የሊፍት፣ የእስካሌተር፣ የመኪና ማቆሚያ (ካር ስታኪንግ) እና የጄነሬተር አቅርቦት እና ተከላ አገልግሎት ይሰጣል።",
    configureBtn: "ሲስተምዎን ያዋቅሩ",
    browseProjects: "ስራዎቻችንን ይመልከቱ",
    compLifts: "የተጠናቀቁ ሊፍቶች",
    ongoingProj: "በመሰራት ላይ ያሉ",
    activeMaint: "ንቁ ጥገና",
    groupExp: "የቡድን ልምድ",
    navHome: "መነሻ",
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
    lifecycleProgress: "የፕሮጀክት ሂደት ደረጃ",
    lifecycleProcurement: "አቅርቦትና ግዥ",
    lifecycleStructural: "መዋቅራዊ ተከላ",
    lifecycleCommissioning: "ሙከራና ርክክብ",
    activePhaseLabel: "ያለበት ደረጃ",
    estHandoverLabel: "የሚጠናቀቅበት",
  }
};

const GALLERY_ITEMS = [
  {
    url: IMAGES.passengerElevator,
    category: "passenger",
    title_en: "Premium Passenger Elevator Cabins",
    title_am: "ዘመናዊ የሰው ማመላለሻ ሊፍት ካቢኔዎች",
    desc_en: "Sleek stainless steel interior with smart touchscreen control panel, voice annunciator, and energy-saving LED ambient lighting.",
    desc_am: "ቀልጣፋ የስማርት ቁጥጥር ሲስተም እና የኤልኢዲ መብራት ያለው ዘመናዊ የስታንለስ ስቲል ሊፍት።",
    specs_en: "Capacity: 450KG - 1600KG (6 - 21 Persons) | Speed: 1.0 - 4.0 m/s | FUJI & Orona PMSM Gearless",
    specs_am: "የመጫን አቅም፡ 450 - 1600 ኪሎግራም | ፍጥነት፡ 1.0 - 4.0 ሜ/ሰ | ብራንድ፡ ፉጂ እና ኦሮና ጊየርለስ",
  },
  {
    url: IMAGES.panoramicElevator,
    category: "panoramic",
    title_en: "High-Visibility Panoramic Glass Cabins",
    title_am: "ፓኖራሚክ የመስታወት ሊፍት",
    desc_en: "Stunning scenic 180° to 360° observation views with laminated safety tempered glass and aerodynamic steel framework.",
    desc_am: "ለዕይታ ምቹ የሆነ ከፍተኛ ጥንካሬ ካለው የተጠናከረ መስታወት እና ብረት የተሰራ ውብ ሊፍት።",
    specs_en: "Compliance: EN 81-20/50 | Cabin Type: Round / Square Panoramic Glass | MRL Configuration",
    specs_am: "ደህንነት፡ EN 81-20/50 | የካቢን አይነት፡ ክብ/አራት ማዕዘን ፓኖራሚክ መስታወት",
  },
  {
    url: IMAGES.freightElevator,
    category: "passenger",
    title_en: "Industrial Freight & Hospital Bed Lifts",
    title_am: "የሆስፒታል እና የከባድ እቃዎች ማመላለሻ ሊፍት",
    desc_en: "Rugged high-capacity cabin reinforced with stainless steel checkered floor plates, anti-collision bumper rails, and wide door openings.",
    desc_am: "ለሆስፒታል አልጋዎች እና ለከባድ የፋብሪካ እቃዎች ተስማሚ የሆነ ጥንካሬ ያለው ሰፊ ሊፍት።",
    specs_en: "Capacity: 1000KG - 5000KG | Leveling Accuracy: ±3mm | Center / Side Multi-Panel Opening",
    specs_am: "አቅም፡ 1000 - 5000 ኪሎ | ትክክለኛ ወለል መቆሚያ፡ ±3ሚሜ | ሰፊ በር",
  },
  {
    url: IMAGES.carLift,
    category: "vehicular",
    title_en: "Automotive Car Lift (Vehicle Elevator)",
    title_am: "የመኪና ማመላለሻ ሊፍት (ካር ሊፍት)",
    desc_en: "Heavy-duty enclosed vehicular elevator cab with front-and-rear through doors and dual car operating panels (COP) accessible from the driver's seat.",
    desc_am: "ሁለት የቁጥጥር ፓነል እና የፊትና ኋላ መውጫ በር ያለው ጠንካራ መኪናዎችን በፎቆች መካከል የማመላለሻ ሊፍት።",
    specs_en: "Capacity: 3000KG - 5000KG | Dual Cabin COPs | Photoelectric Positioning Sensors | Traction / Hydraulic",
    specs_am: "የክብደት አቅም፡ 3000 - 5000 ኪሎ | ባለ ሁለት COP መቆጣጠሪያ | የሴፍቲ ሴንሰር",
  },
  {
    url: IMAGES.carStacking,
    category: "vehicular",
    title_en: "Automated Multi-Tier Car Stacking Parking System",
    title_am: "ባለብዙ ፎቅ አውቶማቲክ የመኪና ማቆሚያ ሲስተም (ካር ስታኪንግ)",
    desc_en: "Automated hydraulic and mechanical vertical stacking arrays designed to double or triple parking bay capacity with motorized sliding pallets.",
    desc_am: "የመኪና ማቆሚያ ቦታ እጥረትን የሚቀርፍ ባለ 2 እና 3 ፎቅ አውቶማቲክ የመኪና ማቆሚያ ሲስተም።",
    specs_en: "2-Tier / 3-Tier Stacking | 2500KG per bay | Anti-Drop Mechanical Safety Hooks | Cycle Time: <45s",
    specs_am: "ባለ 2 እና 3 ደረጃ | 2500 ኪሎ በአንድ መኪና | ሜካኒካል የደህንነት መቆለፊያዎች",
  },
  {
    url: IMAGES.carPlatform,
    category: "vehicular",
    title_en: "Hydraulic Car Platform & Scissor Vehicle Lift",
    title_am: "የመኪና ማንሻ ሃይድሮሊክ ፕላትፎርም (ካር ፕላትፎርም)",
    desc_en: "Heavy-duty scissor or dual-column vehicle elevating platform providing direct access between driveways and underground parking without space-wasting ramps.",
    desc_am: "ራምፕ ሳይሰራ መኪናዎችን በቀላሉ ወደ ምድር ቤት ማቆሚያ የሚያወርድና የሚያወጣ የሃይድሮሊክ ፕላትፎርም።",
    specs_en: "Capacity: 3000KG - 6000KG | Heavy Scissor / Hydraulic Ram | Perimeter Safety Trip Edges | Pit / Surface Mount",
    specs_am: "አቅም፡ 3000 - 6000 ኪሎ | ሃይድሮሊክ ሲስተም | የደህንነት ዳርቻ ሴንሰሮች",
  },
  {
    url: IMAGES.homeElevator,
    category: "passenger",
    title_en: "Villa & Residential Home Elevators",
    title_am: "የቪላ እና የመኖሪያ ቤት ሊፍቶች",
    desc_en: "Ultra-quiet, space-efficient private luxury residential elevators with shallow pit depth and emergency automatic rescue device (ARD).",
    desc_am: "ለመኖሪያ ቤቶች እና ቪላዎች ተስማሚ የሆነ ድምጽ አልባ፣ አነስተኛ ቦታ የሚወስድ ዘመናዊ ሊፍት።",
    specs_en: "Capacity: 250KG - 400KG (3-5 Persons) | Speed: 0.4 m/s | 220V Single-Phase / 380V Three-Phase",
    specs_am: "አቅም፡ 250 - 400 ኪሎ | ፍጥነት፡ 0.4 ሜ/ሰ | 220V/380V የኤሌክትሪክ ፍጆታ",
  },
  {
    url: IMAGES.escalator,
    category: "systems",
    title_en: "Heavy-Traffic Commercial Escalators",
    title_am: "የገበያ አዳራሽና የህዝብ መወጣጫ ደረጃ (ኤስካሌተር)",
    desc_en: "Continuous flow passenger transit systems equipped with variable frequency idle speed sensors, stainless steel balustrades, and skirt lighting.",
    desc_am: "ለገበያ ማዕከላት፣ ለባቡር ጣቢያዎች እና ለአውሮፕላን ማረፊያዎች ተስማሚ የሆነ አስተማማኝ ኤስካሌተር።",
    specs_en: "Inclination: 30° / 35° | Step Width: 800mm - 1000mm | Speed: 0.5 m/s | Eco-Energy Saving Drive",
    specs_am: "አንግል፡ 30° / 35° | የስቴፕ ስፋት፡ 800 - 1000ሚሜ | የሃይል ቁጣባ ቴክኖሎጂ",
  },
  {
    url: IMAGES.movingWalk,
    category: "systems",
    title_en: "Horizontal & Inclined Moving Walkways",
    title_am: "አግድም እና ዘንበል ያሉ ተንቀሳቃሽ መንገዶች (ትራቭሌተር)",
    desc_en: "Smooth, continuous horizontal transportation for shopping carts and baggage handling across large commercial and transit complexes.",
    desc_am: "በገበያ አዳራሾች ውስጥ ጋሪዎችንና እቃዎችን ይዞ ለመንቀሳቀስ የሚያስችል ተንቀሳቃሽ መንገድ።",
    specs_en: "Angle: 0° - 12° | Width: 1000mm - 1400mm | Anti-Slip Pallet Surface | Heavy-Duty Truss",
    specs_am: "አንግል፡ 0° - 12° | ስፋት፡ 1000 - 1400ሚሜ | የማያንሸራትት ወለል",
  },
  {
    url: IMAGES.generator,
    category: "power",
    title_en: "High-Capacity Backup Diesel Generator Sets & ATS",
    title_am: "ከፍተኛ አቅም ያለው የናፍጣ ጄኔሬተር እና ATS ፓነል",
    desc_en: "Reliable prime emergency power backup units with automatic transfer switch (ATS) to ensure continuous elevator and building operations during outages.",
    desc_am: "የኤሌክትሪክ መቆራረጥ ሲያጋጥም ሊፍቶች እንዳይቆሙ በአጭር ሰከንዶች ውስጥ አውቶማቲክ የሀይል ሽግግር (ATS) የሚያደርግ ጄነሬተር።",
    specs_en: "Sourced Brands: Perkins / Cummins / Stamford | Capacity: 50kVA - 1500kVA | ATS Transfer: <5s",
    specs_am: "ብራንዶች፡ ፐርኪንስ / ካሚንስ | አቅም፡ 50kVA - 1500kVA | የምላሽ ሰዓት፡ <5 ሰከንድ",
  },
  {
    url: IMAGES.industrialPanel,
    category: "systems",
    title_en: "Integrated Electrical & VVVF Microprocessor Cabinet",
    title_am: "የኤሌክትሮኒክስ ቁጥጥር እና የVVVF ካቢኔ",
    desc_en: "Precision engineering featuring energy-saving VVVF frequency converters, 32-bit dual microprocessors, and smart leveling logic.",
    desc_am: "የሃይል ፍጆታን የሚቀንስ የVVVF ፍሪኩዌንሲ መለወጫ እና ስማርት ፕሮሰሰር የያዘ የቁጥጥር ሳጥን።",
    specs_en: "Power Savings: >48% | PMSM Synchronous Gearless Support | Dual Safety Loop Interlocks",
    specs_am: "የሃይል ቁጠባ፡ >48% | ጊየርለስ ሲስተም ድጋፍ | ከፍተኛ ደህንነት",
  },
  {
    url: IMAGES.teamwork,
    category: "systems",
    title_en: "On-Site Mechanical Installation & SLA Service",
    title_am: "የመስክ ተከላ እና ጥራት ቁጥጥር ምህንድስና",
    desc_en: "Licensed Shining Star electromechanical engineering team installing structural guide rails and laser plumb lines with micro-millimeter precision.",
    desc_am: "የሻይኒንግ ስታር መሃንዲሶች የሊፍት መመሪያ ሀዲዶችን በከፍተኛ ጥንቃሬ እና ሌዘር ጥንቃቄ ሲተክሉ።",
    specs_en: "Engineering Standard: Grade-1 Registered Contractor | 24/7 Rapid Response Maintenance",
    specs_am: "የምህንድስና ደረጃ፡ የደረጃ-1 ኤሌክትሮ መካኒካል ተቋራጭ | የ24/7 ፈጣን ጥገና",
  }
];

export default function HomePage() {
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  // Language state (en = English, am = Amharic)
  const [lang, setLang] = useState<"en" | "am">("en");

  // Global theme state
  const [theme, setTheme] = useState<"light">("light");

  // Enforce light theme mode
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", "light");
  }, []);

  // Elevator simulator states
  const [currentSimFloor, setCurrentSimFloor] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simTargetFloor, setSimTargetFloor] = useState<number>(1);
  const [simDoorOpen, setSimDoorOpen] = useState<boolean>(true);

  // Active tabs for different information modules
  const [activeAboutTab, setActiveAboutTab] = useState<"overview" | "leadership" | "values" | "prequal">("overview");
  const [activeProductTab, setActiveProductTab] = useState<"elevators" | "vehicular" | "escalators" | "power">("elevators");
  
  // Projects state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "Ongoing" | "Maintenance">("All");
  const [brandFilter, setBrandFilter] = useState<string>("All");

  // Photo Gallery state
  const [galleryFilter, setGalleryFilter] = useState<"all" | "passenger" | "panoramic" | "vehicular" | "systems" | "power">("all");
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

  // Smooth scroll helper for internal navigation and buttons
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const cleanId = id.replace(/^#/, "");
    const targetElement = document.getElementById(cleanId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = cleanId;
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
    setTimeout(() => {
      scrollToSection("inquiry-portal");
    }, 100);
  };

  // Pre-fill form from selected product card
  const handleInquiryForProduct = (productName: string, serviceType: string, specs: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: serviceType || "elevator-install",
      message: `Direct inquiry regarding ${productName}:
- Specifications: ${specs}
- Required Services: Supply, Structural Shaft Installation, Testing & Commissioning

Please provide formal engineering layout drawings, lead time quotation, and schedule a site evaluation.`
    }));

    setTimeout(() => {
      scrollToSection("inquiry-portal");
    }, 50);
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
            <a 
              href="tel:+251987077777" 
              className="flex items-center gap-1.5 hover:text-[#f37021] transition-colors cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#f37021]" />
              {TRANSLATIONS[lang].emergencyHotline} <strong className="text-white hover:underline">+251 987 077 777</strong> / <strong className="text-white hover:underline">+251 911 675 505</strong>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
          
          {/* Corporate Brand Identity */}
          <button 
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center group transition-transform hover:scale-[1.02] cursor-pointer text-left shrink-0"
            aria-label="Shining Star Electro-Mechanical Home"
          >
            <CompanyLogo variant="badge" />
          </button>

          {/* Desktop Navigation - Grouped Structure */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* 1. HOME */}
            <button 
              type="button" 
              onClick={() => {
                setProductsDropdownOpen(false);
                setAboutDropdownOpen(false);
                scrollToSection("home");
              }} 
              className="px-3 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-[#f37021] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              {TRANSLATIONS[lang].navHome}
            </button>

            {/* 2. OVERVIEW */}
            <button 
              type="button" 
              onClick={() => {
                setProductsDropdownOpen(false);
                setAboutDropdownOpen(false);
                scrollToSection("about");
              }} 
              className="px-3 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-[#f37021] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              {TRANSLATIONS[lang].navOverview}
            </button>

            {/* 3. PRODUCT & SERVICES (Dropdown with Spec Estimator) */}
            <div 
              className="relative"
              onMouseEnter={() => {
                setProductsDropdownOpen(true);
                setAboutDropdownOpen(false);
              }}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button 
                type="button" 
                onClick={() => {
                  setProductsDropdownOpen(!productsDropdownOpen);
                  setAboutDropdownOpen(false);
                }}
                className={`px-3 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  productsDropdownOpen ? "text-[#f37021] bg-orange-50" : "text-slate-700 hover:text-[#f37021] hover:bg-slate-100"
                }`}
                aria-expanded={productsDropdownOpen}
              >
                {TRANSLATIONS[lang].navProducts}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? "rotate-180 text-[#f37021]" : "text-slate-400"}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setProductsDropdownOpen(false);
                      scrollToSection("products");
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-orange-50/80 transition-colors cursor-pointer flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-orange-100 text-[#f37021] shrink-0 mt-0.5 group-hover:bg-[#f37021] group-hover:text-white transition-colors">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#f37021]">All Products & Solutions</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-orange-100 text-[#f37021] rounded">10+</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Passenger lifts, panoramic, car stackers & escalators</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProductsDropdownOpen(false);
                      scrollToSection("estimator");
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-orange-50/80 transition-colors cursor-pointer flex items-start gap-3 group mt-1"
                  >
                    <div className="p-2 rounded-lg bg-orange-100 text-[#f37021] shrink-0 mt-0.5 group-hover:bg-[#f37021] group-hover:text-white transition-colors">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#f37021]">Spec & Cost Estimator</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-700 rounded">Interactive</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Calculate elevator capacity, floors & budget sizing</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 4. PROJECT PORTFOLIO */}
            <button 
              type="button" 
              onClick={() => {
                setProductsDropdownOpen(false);
                setAboutDropdownOpen(false);
                scrollToSection("projects");
              }} 
              className="px-3 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-[#f37021] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              {TRANSLATIONS[lang].navPortfolio}
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-[#f37021] border border-orange-200">
                {PROJECTS_DATA.length}
              </span>
            </button>

            {/* 5. ABOUT US (Dropdown: Partners, Gallery, Certifications) */}
            <div 
              className="relative"
              onMouseEnter={() => {
                setAboutDropdownOpen(true);
                setProductsDropdownOpen(false);
              }}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button 
                type="button" 
                onClick={() => {
                  setAboutDropdownOpen(!aboutDropdownOpen);
                  setProductsDropdownOpen(false);
                }}
                className={`px-3 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  aboutDropdownOpen ? "text-[#f37021] bg-orange-50" : "text-slate-700 hover:text-[#f37021] hover:bg-slate-100"
                }`}
                aria-expanded={aboutDropdownOpen}
              >
                About Us
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? "rotate-180 text-[#f37021]" : "text-slate-400"}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setAboutDropdownOpen(false);
                      scrollToSection("partners");
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-orange-50/80 transition-colors cursor-pointer flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-orange-100 text-[#f37021] shrink-0 mt-0.5 group-hover:bg-[#f37021] group-hover:text-white transition-colors">
                      <Handshake className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-[#f37021] block">{TRANSLATIONS[lang].navPartners}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Authorized OEM partnerships: Fuji, IGV & Blain</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAboutDropdownOpen(false);
                      scrollToSection("gallery");
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-orange-50/80 transition-colors cursor-pointer flex items-start gap-3 group mt-1"
                  >
                    <div className="p-2 rounded-lg bg-orange-100 text-[#f37021] shrink-0 mt-0.5 group-hover:bg-[#f37021] group-hover:text-white transition-colors">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-[#f37021] block">{TRANSLATIONS[lang].navGallery}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">On-site mechanical installation & completed lifts</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAboutDropdownOpen(false);
                      scrollToSection("credentials");
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-orange-50/80 transition-colors cursor-pointer flex items-start gap-3 group mt-1"
                  >
                    <div className="p-2 rounded-lg bg-orange-100 text-[#f37021] shrink-0 mt-0.5 group-hover:bg-[#f37021] group-hover:text-white transition-colors">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-[#f37021] block">{TRANSLATIONS[lang].navCertifications}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Grade-1 Contractor License, TIN & ISO compliance</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Quick Contact & Action Portal */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button 
              type="button"
              onClick={() => scrollToSection("inquiry-portal")}
              className="inline-flex items-center gap-2 bg-slate-950 dark:bg-slate-800 hover:bg-[#f37021] dark:hover:bg-[#f37021] text-xs font-bold uppercase tracking-wider py-3 px-4 xl:py-3.5 xl:px-6 rounded-xl transition-all shadow-md hover:shadow-lg duration-300 text-white cursor-pointer active:scale-95 whitespace-nowrap"
            >
              {TRANSLATIONS[lang].getProposal}
              <ArrowRight className="w-4 h-4 text-[#f37021] group-hover:text-white" />
            </button>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#f37021] transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer with Grouped Menu List */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-5 px-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-2">
              {/* 1. HOME */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection("home");
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer group"
              >
                <span className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 group-hover:text-[#f37021] transition-colors">
                  {TRANSLATIONS[lang].navHome}
                </span>
              </button>

              {/* 2. OVERVIEW */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection("about");
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer group"
              >
                <span className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 group-hover:text-[#f37021] transition-colors">
                  {TRANSLATIONS[lang].navOverview}
                </span>
              </button>

              {/* 3. PRODUCT & SERVICES */}
              <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-xl p-2.5 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
                  {TRANSLATIONS[lang].navProducts}
                </span>
                <div className="flex flex-col gap-1 pl-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToSection("products");
                    }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-[#f37021]" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#f37021]">
                        All Products & Solutions
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-[#f37021]">10+</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToSection("estimator");
                    }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <Calculator className="w-3.5 h-3.5 text-[#f37021]" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#f37021]">
                        Spec & Cost Estimator
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Interactive</span>
                  </button>
                </div>
              </div>

              {/* 4. PROJECT PORTFOLIO */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection("projects");
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer group"
              >
                <span className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 group-hover:text-[#f37021] transition-colors">
                  {TRANSLATIONS[lang].navPortfolio}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-100 text-[#f37021] border border-orange-200">
                  {PROJECTS_DATA.length} Projects
                </span>
              </button>

              {/* 5. ABOUT US */}
              <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-xl p-2.5 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
                  About Us
                </span>
                <div className="flex flex-col gap-1 pl-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToSection("partners");
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-left transition-colors cursor-pointer group"
                  >
                    <Handshake className="w-3.5 h-3.5 text-[#f37021]" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#f37021]">
                      {TRANSLATIONS[lang].navPartners}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToSection("gallery");
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-left transition-colors cursor-pointer group"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#f37021]" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#f37021]">
                      {TRANSLATIONS[lang].navGallery}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToSection("credentials");
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-left transition-colors cursor-pointer group"
                  >
                    <Award className="w-3.5 h-3.5 text-[#f37021]" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#f37021]">
                      {TRANSLATIONS[lang].navCertifications}
                    </span>
                  </button>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 my-1" />
              
              <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/60">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">24/7 Breakdown Hotline</span>
                  <div className="flex flex-wrap items-center gap-x-2 text-xs font-bold text-slate-900 dark:text-white">
                    <a href="tel:+251987077777" className="hover:text-[#f37021]">+251 987 077 777</a>
                    <span className="text-slate-300">/</span>
                    <a href="tel:+251911675505" className="hover:text-[#f37021]">+251 911 675 505</a>
                  </div>
                </div>
                <Clock className="w-4 h-4 text-[#f37021]" />
              </div>

              <button 
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection("inquiry-portal");
                }} 
                className="bg-[#f37021] hover:bg-[#d65103] text-white font-bold py-3 px-4 rounded-xl text-center transition-all shadow-md text-xs uppercase tracking-wider cursor-pointer active:scale-95 mt-1 flex items-center justify-center gap-2"
              >
                {TRANSLATIONS[lang].getProposal}
                <ArrowRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-slate-950 text-white overflow-hidden py-24 sm:py-32 xl:py-40 flex items-center">
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
              className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-orange-500/15 border border-orange-500/30 rounded-full text-[#f37021] text-xs font-bold tracking-wider uppercase mb-8 backdrop-blur-md shadow-lg shadow-orange-500/10"
            >
              <CompanyLogoIcon className="w-4 h-4" color="#f37021" cutoutColor="transparent" />
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
              <button 
                type="button"
                onClick={() => scrollToSection("estimator")}
                className="inline-flex items-center justify-center gap-2 bg-[#f37021] hover:bg-[#d65103] text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 duration-200 cursor-pointer"
              >
                {TRANSLATIONS[lang].configureBtn}
                <Sliders className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-semibold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all hover:border-slate-700 active:scale-95 duration-200 cursor-pointer"
              >
                {TRANSLATIONS[lang].browseProjects} ({PROJECTS_DATA.length})
                <ArrowRight className="w-4 h-4" />
              </button>
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
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/30 rounded-lg p-1 flex items-center justify-center">
                    <CompanyLogoIcon className="w-full h-full" color="#f37021" cutoutColor="transparent" />
                  </div>
                  <span className="text-xs font-bold text-[#f37021] uppercase tracking-widest block">Corporate Profile</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
                  Shining Star Electro Mechanical Work
                </h2>
                <div className="w-16 h-1.5 bg-[#f37021] rounded-full mt-4" />
              </div>

              <p className="text-slate-600 leading-relaxed font-light text-base">
                An industry leading vertical transportation and electromechanical solution company based in Addis Ababa, Ethiopia. We serve residential, commercial, industrial and public infrastructure sectors.
              </p>

              {/* Leadership Spotlight Cards with Direct Profile Pictures */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    {lang === "am" ? "የስራ አስፈፃሚ አመራሮች" : "Executive Management"}
                  </h3>
                  <button 
                    onClick={() => setActiveAboutTab("leadership")}
                    className="text-[11px] font-bold text-[#f37021] hover:underline"
                  >
                    {lang === "am" ? "ሁሉንም ይመልከቱ" : "View Details →"}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                  {/* CEO */}
                  <div className="bg-slate-50 hover:bg-orange-50/30 border border-slate-200/80 hover:border-orange-200 p-3 rounded-2xl flex items-center gap-3 transition-all">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-[#f37021]/30 shadow-sm flex-shrink-0 bg-slate-200">
                      <img 
                        src="/team/dibekulu.jpg" 
                        alt="Dibekulu Admit" 
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                          {lang === "am" ? "ዲበኩሉ አድሚት" : "Dibekulu Admit"}
                        </h4>
                        <span className="px-1.5 py-0.2 bg-[#f37021]/10 text-[#f37021] text-[9px] font-bold rounded">CEO</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium truncate">
                        {lang === "am" ? "መሥራችና ዋና ሥራ አስፈፃሚ (EE)" : "Founder & CEO, EE"}
                      </p>
                    </div>
                  </div>

                  {/* General Manager */}
                  <div className="bg-slate-50 hover:bg-orange-50/30 border border-slate-200/80 hover:border-orange-200 p-3 rounded-2xl flex items-center gap-3 transition-all">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-slate-300 shadow-sm flex-shrink-0 bg-slate-200">
                      <img 
                        src="/team/rodas.jpg" 
                        alt="Rodas Tesfaye" 
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                          {lang === "am" ? "ሮዳስ ተስፋዬ" : "Rodas Tesfaye"}
                        </h4>
                        <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 text-[9px] font-bold rounded">GM</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium truncate">
                        {lang === "am" ? "ጠቅላላ ሥራ አስኪያጅ" : "General Manager"}
                      </p>
                    </div>
                  </div>

                  {/* Technical Manager */}
                  <div className="bg-slate-50 hover:bg-orange-50/30 border border-slate-200/80 hover:border-orange-200 p-3 rounded-2xl flex items-center gap-3 transition-all">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-slate-300 shadow-sm flex-shrink-0 bg-slate-200">
                      <img 
                        src="/team/shimeles.jpg" 
                        alt="Shimeles Admit" 
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                          {lang === "am" ? "ሽመልስ አድሚት" : "Shimeles Admit"}
                        </h4>
                        <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 text-[9px] font-bold rounded">Tech</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium truncate">
                        {lang === "am" ? "ቴክኒክ ሥራ አስኪያጅ" : "Technical Manager"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Tab-based detailed documentation */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Navigation Tabs */}
              <div className="flex flex-wrap border-b border-slate-200 gap-4 sm:gap-6">
                {[
                  { id: "overview", label: lang === "am" ? "አጠቃላይ እይታ" : "Overview" },
                  { id: "leadership", label: lang === "am" ? "የአመራር አካላት" : "Executive Leadership" },
                  { id: "values", label: lang === "am" ? "ተልዕኮ እና እሴቶች" : "Mission & Values" },
                  { id: "prequal", label: lang === "am" ? "ቅድመ-ብቃት" : "Pre-Qualification" },
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
                            Founded in 2018 by <strong>Dibekulu Admit Tagele</strong>, an experienced electrical engineer with extensive technical expertise in elevator maintenance, retrofitting, and international installations.
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

                  {activeAboutTab === "leadership" && (
                    <div className="space-y-6">
                      <div>
                        <span className="text-xs font-bold text-[#f37021] uppercase tracking-widest block mb-1">
                          {lang === "am" ? "የኩባንያው ከፍተኛ አመራር" : "Corporate Governance"}
                        </span>
                        <h3 className="text-xl font-bold text-slate-950 font-display">
                          {lang === "am" ? "የስራ አስፈፃሚ አመራር አካላት" : "Executive Management Team"}
                        </h3>
                        <p className="text-slate-600 text-sm font-light leading-relaxed mt-1">
                          {lang === "am" 
                            ? "የሻይኒንግ ስታር ኤሌክትሮ ሜካኒካል መሪዎች በኢትዮጵያና ዓለም አቀፍ ደረጃ በከፍተኛ የኢንጂነሪንግ ጥራትና ደህንነት ይመራሉ::" 
                            : "Directing Shining Star with proven electromechanical expertise, stringent EN 81 safety protocols, and client-first project execution across Ethiopia."}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-5">
                        {/* Dibekulu Admit */}
                        <div className="bg-white border border-slate-200 hover:border-orange-300 rounded-2xl overflow-hidden shadow-sm transition-all group">
                          <div className="aspect-square relative overflow-hidden bg-slate-100">
                            <img 
                              src="/team/dibekulu.jpg" 
                              alt="Dibekulu Admit Tagele" 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#f37021] text-white text-[10px] font-bold rounded-full shadow">
                              Founder &amp; CEO
                            </div>
                          </div>
                          <div className="p-4 space-y-2">
                            <h4 className="font-bold text-slate-900 text-base leading-tight">
                              {lang === "am" ? "ዲበኩሉ አድሚት ታገለ" : "Dibekulu Admit Tagele"}
                            </h4>
                            <p className="text-[#f37021] text-xs font-semibold">
                              {lang === "am" ? "መሥራችና ዋና ሥራ አስፈፃሚ (EE)" : "Founder & Chief Executive Officer (EE)"}
                            </p>
                            <p className="text-slate-500 text-xs font-light leading-relaxed">
                              {lang === "am" 
                                ? "የኤሌክትሪካል ኢንጂነሪንግ ባለሙያ፣ በቻይና በSicher / SRH ሊፍት ፋብሪካ የተረጋገጠ የስልጠና የምስክር ወረቀት ያለው።"
                                : "Electrical Engineer certified in China factory elevator commissioning (SRH/Sicher Level 1) with 8+ years experience."}
                            </p>
                          </div>
                        </div>

                        {/* Rodas Tesfaye */}
                        <div className="bg-white border border-slate-200 hover:border-orange-300 rounded-2xl overflow-hidden shadow-sm transition-all group">
                          <div className="aspect-square relative overflow-hidden bg-slate-100">
                            <img 
                              src="/team/rodas.jpg" 
                              alt="Rodas Tesfaye" 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full shadow">
                              General Manager
                            </div>
                          </div>
                          <div className="p-4 space-y-2">
                            <h4 className="font-bold text-slate-900 text-base leading-tight">
                              {lang === "am" ? "ሮዳስ ተስፋዬ" : "Rodas Tesfaye"}
                            </h4>
                            <p className="text-[#f37021] text-xs font-semibold">
                              {lang === "am" ? "ጠቅላላ ሥራ አስኪያጅ" : "General Manager"}
                            </p>
                            <p className="text-slate-500 text-xs font-light leading-relaxed">
                              {lang === "am"
                                ? "የአቅርቦት ሰንሰለት፣ የኦፕሬሽን ስራዎች፣ የደንበኞች ግንኙነት እና የፕሮጀክት አስተዳደር መሪ።"
                                : "Overseeing operations, international procurement logistics, commercial relations, and client contract delivery."}
                            </p>
                          </div>
                        </div>

                        {/* Shimeles Admit */}
                        <div className="bg-white border border-slate-200 hover:border-orange-300 rounded-2xl overflow-hidden shadow-sm transition-all group">
                          <div className="aspect-square relative overflow-hidden bg-slate-100">
                            <img 
                              src="/team/shimeles.jpg" 
                              alt="Shimeles Admit" 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full shadow">
                              Technical Manager
                            </div>
                          </div>
                          <div className="p-4 space-y-2">
                            <h4 className="font-bold text-slate-900 text-base leading-tight">
                              {lang === "am" ? "ሽመልስ አድሚት" : "Shimeles Admit"}
                            </h4>
                            <p className="text-[#f37021] text-xs font-semibold">
                              {lang === "am" ? "ቴክኒክ ሥራ አስኪያጅ" : "Technical Manager"}
                            </p>
                            <p className="text-slate-500 text-xs font-light leading-relaxed">
                              {lang === "am"
                                ? "የሳይት ተከላ ስራዎች፣ የመዋቅር ደህንነት ምርመራዎች (EN 81) እና የጥገና ስራዎች ቴክኒካል ኃላፊ።"
                                : "Directing mechanical alignment, on-site structural installations, safety testing, and preventive maintenance teams."}
                            </p>
                          </div>
                        </div>
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
            <span className="text-xs font-bold text-[#f37021] uppercase tracking-widest block mb-2">
              {lang === "en" ? "Our Engineering Range" : "የኢንጂነሪንግ አገልግሎቶቻችን"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
              {lang === "en" ? "Elevator Systems, Car Lifts & Building Solutions" : "የሊፍት ሲስተሞች፥ የመኪና ሊፍቶች እና የህንጻ አገልግሎቶች"}
            </h2>
            <p className="text-slate-600 mt-4 font-light leading-relaxed">
              {lang === "en" 
                ? "We supply, install, test, commission, modernize, and maintain high-precision vertical transport solutions — from passenger elevators to car lifts, stacking parking systems, and heavy-duty car platforms."
                : "ከመንገደኞች ሊፍት ጀምሮ እስከ መኪና ሊፍት፣ የመኪና ስታኪንግ ፓርኪንግ ሲስተሞች እና የመኪና ፕላትፎርሞች ድረስ ጥራት ያላቸውን የቁልቁል እና አግድም ትራንስፖርት መፍትሄዎችን እናቀርባለን።"}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "elevators", label: lang === "en" ? "Passenger & Panoramic Lifts" : "የመንገደኞች እና ፓኖራሚክ ሊፍቶች", icon: Layers },
              { id: "vehicular", label: lang === "en" ? "Car Lifts, Stacking & Platforms" : "የመኪና ሊፍቶች እና ስታኪንግ", icon: Sliders },
              { id: "escalators", label: lang === "en" ? "Escalators & Moving Walks" : "ኤስካሌተሮች እና ተንቀሳቃሽ መንገዶች", icon: Maximize },
              { id: "power", label: lang === "en" ? "Power & Building Services" : "ጄኔሬተር እና የህንጻ አገልግሎቶች", icon: Zap }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveProductTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer active:scale-95 duration-150 ${
                    activeProductTab === tab.id 
                      ? "bg-slate-950 text-white border-slate-950 shadow-md shadow-slate-950/10" 
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
              
              {/* Category 1: Elevators */}
              {activeProductTab === "elevators" && (
                <>
                  {/* Passenger Elevators */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/40 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                        <Image 
                          src="/products/passenger-elevator.jpg" 
                          alt="Passenger Elevator" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#f37021] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                          FUJI / Sigma Series
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-slate-300 font-medium font-amharic block">የመንገደኞች ሊፍት</span>
                          <h3 className="text-base font-bold tracking-tight">Passenger Elevators</h3>
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          Equipped with state-of-the-art Permanent Magnet Synchronous Motors (PMSM) and Variable Voltage Variable Frequency (VVVF) regenerative drives. Reduces building electrical consumption by up to 48%.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Capacity Range:</span>
                            <span className="text-slate-800">450kg - 1600kg (6-21 P)</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Rated Speed:</span>
                            <span className="text-slate-800">1.0 m/s - 4.0 m/s</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Intelligent 8-car group dispatching algorithm</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Machine Room-Less (MRL) &amp; MR configurations</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Automatic rescue device (ARD) during power failure</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleInquiryForProduct("Passenger Elevators", "elevator-install", "Capacity: 450kg-1600kg, Speed: 1.0-4.0 m/s, PMSM Gearless VVVF")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-[#f37021] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        {lang === "en" ? "Request Quote & Specs" : "ዋጋ እና መግለጫ ይጠይቁ"}
                      </button>
                    </div>
                  </div>

                  {/* Panoramic Glass Elevators */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/40 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                        <Image 
                          src="/products/panoramic-elevator.jpg" 
                          alt="Panoramic Glass Elevator" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#f37021] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                          Observation Luxury
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-slate-300 font-medium font-amharic block">ፓኖራሚክ የመስታወት ሊፍት</span>
                          <h3 className="text-base font-bold tracking-tight">Panoramic / Observation Elevators</h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          Elevates building prestige with floor-to-ceiling laminated safety glass observation pods. Designed for upscale hotels, high-end commercial towers, shopping malls, and corporate headquarters.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Capsule Shapes:</span>
                            <span className="text-slate-800">Semi-Circular, Hex, Square</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Glass Class:</span>
                            <span className="text-slate-800">12mm Double Safety Laminated</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Frameless 270° and 360° sightline aesthetics</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Architectural LED accent &amp; under-car lighting</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Outdoor weather-sealed and atrium configurations</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleInquiryForProduct("Panoramic Glass Elevators", "elevator-install", "Panoramic Glass Capsule, 630kg-1250kg, Circular/Hex Design, MRL")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-[#f37021] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {lang === "en" ? "Request Quote & Specs" : "ዋጋ እና መግለጫ ይጠይቁ"}
                      </button>
                    </div>
                  </div>

                  {/* Freight & Hospital Lifts */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/40 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                        <Image 
                          src="/products/freight-elevator.jpg" 
                          alt="Freight and Hospital Bed Elevator" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#f37021] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                          Heavy-Duty Industrial
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-slate-300 font-medium font-amharic block">የእቃ እና የሆስፒታል ሊፍት</span>
                          <h3 className="text-base font-bold tracking-tight">Freight &amp; Hospital Bed Elevators</h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          Engineered for heavy payload logistics, factories, warehouses, and hospital patient stretchers with millimeter-precise leveling to prevent cart tipping and seamless gurney transfers.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Load Range:</span>
                            <span className="text-slate-800">1000kg to 5000kg</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Door Opening:</span>
                            <span className="text-slate-800">2-Panel / 4-Panel Center/Side</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Checkered stainless steel anti-skid floor plates</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Heavy-duty hardwood/rubber bumper crash rails</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Priority medical emergency override control mode</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleInquiryForProduct("Freight & Hospital Bed Elevators", "elevator-install", "Payload: 1000kg-5000kg, Deep Cabin Dimension, Heavy-Duty Rails")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-[#f37021] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Building className="w-3.5 h-3.5" />
                        {lang === "en" ? "Request Quote & Specs" : "ዋጋ እና መግለጫ ይጠይቁ"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Category 2: Vehicular Solutions (Car Lifts, Car Stacking, Car Platforms) */}
              {activeProductTab === "vehicular" && (
                <>
                  {/* Car Lift (Automotive Elevator) */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/40 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                        <Image 
                          src="/products/car-lift.jpg" 
                          alt="Car Lift Automotive Elevator" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#f37021] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                          Vehicular Transport
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-slate-300 font-medium font-amharic block">የመኪና ሊፍት (አውቶሞቲቭ ኤሌቬተር)</span>
                          <h3 className="text-base font-bold tracking-tight">Car Lift (Automotive Elevator)</h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          Full-cabin enclosed vertical automobile elevators engineered for luxury car dealerships, high-density residential towers, and multi-story commercial parking basements.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Load Rating:</span>
                            <span className="text-slate-800">3000kg to 5000kg</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Drive System:</span>
                            <span className="text-slate-800">Hydraulic / Heavy Traction</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Dual-side car operating panels for driver ease</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Front &amp; rear through-door walk-through design</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> High-precision optical positioning and wheel guide stops</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleInquiryForProduct("Car Lift (Automotive Elevator)", "elevator-install", "Load: 3000kg-5000kg, Cabin size: 3m x 6m, Dual COP, Hydraulic/Traction")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-[#f37021] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        {lang === "en" ? "Request Car Lift Specs" : "የመኪና ሊፍት መግለጫ ይጠይቁ"}
                      </button>
                    </div>
                  </div>

                  {/* Car Stacking System */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/40 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                        <Image 
                          src="/products/car-stacking.jpg" 
                          alt="Car Stacking Automated Parking System" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#f37021] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                          Multi-Tier Parking
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-slate-300 font-medium font-amharic block">የመኪና ስታኪንግ ፓርኪንግ ሲስተም</span>
                          <h3 className="text-base font-bold tracking-tight">Car Stacking Parking Systems</h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          Automated puzzle and 2-post / 4-post vehicle stacking systems that double or triple parking bay capacity within existing building footprints. Installed in major Addis Ababa developments.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Stacking Levels:</span>
                            <span className="text-slate-800">2-Tier to 6-Tier Puzzle</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Lifting Time:</span>
                            <span className="text-slate-800">&lt; 45 Seconds</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> PLC microprocessor smart access card/keypad</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Anti-drop mechanical safety locking claws</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Photoelectric sensors detecting car boundaries</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleInquiryForProduct("Car Stacking Parking Systems", "elevator-install", "Multi-Tier 2-4 levels, PLC controlled, 2500kg per bay capacity")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-[#f37021] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Building className="w-3.5 h-3.5" />
                        {lang === "en" ? "Request Stacking Specs" : "የስታኪንግ መግለጫ ይጠይቁ"}
                      </button>
                    </div>
                  </div>

                  {/* Car Platform */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/40 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                        <Image 
                          src="/products/car-platform.jpg" 
                          alt="Car Platform Scissor and Hydraulic Lift" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#f37021] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                          Hydraulic Platform
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-slate-300 font-medium font-amharic block">የመኪና ፕላትፎርም ሊፍት (ሲዘር/ሃይድሮሊክ)</span>
                          <h3 className="text-base font-bold tracking-tight">Car Platform (Hydraulic / Scissor)</h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          Heavy-duty open-deck hydraulic scissor and guide-rail vehicle lifting platforms designed for basement-to-street transitions without requiring long concrete vehicle ramps.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Platform Size:</span>
                            <span className="text-slate-800">Custom (up to 6m x 3.2m)</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Travel Height:</span>
                            <span className="text-slate-800">Up to 12 meters (3-4 floors)</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Low pit depth requirements saving construction costs</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Heavy-gauge diamond steel anti-skid platform surface</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Hydraulic burst valve and emergency lowering valve</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleInquiryForProduct("Car Platform (Hydraulic / Scissor)", "elevator-install", "Hydraulic scissor platform, 3500kg-5000kg, custom pit depth")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-[#f37021] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Maximize className="w-3.5 h-3.5" />
                        {lang === "en" ? "Request Platform Specs" : "የፕላትፎርም መግለጫ ይጠይቁ"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Category 3: Escalators & Moving Walks */}
              {activeProductTab === "escalators" && (
                <>
                  {/* Commercial Escalators */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/40 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                        <Image 
                          src="/products/escalator.jpg" 
                          alt="Commercial Escalator" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#f37021] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                          Continuous Transit
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-slate-300 font-medium font-amharic block">የንግድ ኤስካሌተር</span>
                          <h3 className="text-base font-bold tracking-tight">Commercial Escalators</h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          Continuous, high-traffic vertical transport systems designed for shopping malls, international airport terminals, rail stations, and busy exhibition centers.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Inclination:</span>
                            <span className="text-slate-800">30° and 35° Angles</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Step Width:</span>
                            <span className="text-slate-800">800mm and 1000mm</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Smart radar passenger sensors with eco idle-speed mode</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Skirt guard safety brushes &amp; LED comb illumination</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Anti-reversal and broken drive chain safety triggers</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleInquiryForProduct("Commercial Escalators", "escalator-walk", "Step width: 800/1000mm, 30/35 degree angle, VVVF Eco-drive")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-[#f37021] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Maximize className="w-3.5 h-3.5" />
                        {lang === "en" ? "Request Escalator Specs" : "የኤስካሌተር መግለጫ ይጠይቁ"}
                      </button>
                    </div>
                  </div>

                  {/* Moving Walks */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/40 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                        <Image 
                          src="/products/moving-walk.jpg" 
                          alt="Moving Walkway Travelator" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#f37021] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                          Horizontal Transit
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-slate-300 font-medium font-amharic block">ተንቀሳቃሽ መንገድ (ትራቬሌተር)</span>
                          <h3 className="text-base font-bold tracking-tight">Moving Walkways (Travelators)</h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          Horizontal and inclined moving sidewalks facilitating smooth passenger flow with luggage carts, strollers, and shopping trolleys across large transit corridors.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Slope Profile:</span>
                            <span className="text-slate-800">0° (Flat) or 10° - 12° Inclined</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Pallet Width:</span>
                            <span className="text-slate-800">1000mm to 1400mm</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Grooved anti-slip die-cast aluminum pallets</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Shopping cart wheel locking synchronization</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Indoor and weather-proof outdoor design editions</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleInquiryForProduct("Moving Walkways (Travelators)", "escalator-walk", "Pallet: 1000mm-1400mm, Incline: 0-12 degrees, Trolley compatible")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-[#f37021] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Maximize className="w-3.5 h-3.5" />
                        {lang === "en" ? "Request Walkway Specs" : "የተንቀሳቃሽ መንገድ መግለጫ ይጠይቁ"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Category 4: Power & Building Services */}
              {activeProductTab === "power" && (
                <>
                  {/* Heavy Duty Generators */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/40 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                        <Image 
                          src="/products/generator.jpg" 
                          alt="Industrial Diesel Generator and ATS Panel" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#f37021] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                          Backup Power
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-slate-300 font-medium font-amharic block">ኢንዱስትሪያል ጄኔሬተር እና ኤቲኤስ ፓነል</span>
                          <h3 className="text-base font-bold tracking-tight">Diesel Generators &amp; ATS Panels</h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          Supply, installation, synchronization and maintenance of prime and standby diesel generators (Perkins, Cummins engines) integrated with sub-5-second Automatic Transfer Switch (ATS) panels.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Power Range:</span>
                            <span className="text-slate-800">50 kVA to 2000 kVA</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">ATS Transfer:</span>
                            <span className="text-slate-800">&lt; 5 Seconds Transition</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Soundproof weatherproof acoustic attenuating canopy</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Seamless elevator automatic rescue synchronization</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> DeepSea / ComAp smart digital monitoring controllers</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleInquiryForProduct("Diesel Generators & ATS Panels", "power-generator", "Rating: 50-2000 kVA, Perkins/Cummins, Soundproof Canopy, Fast ATS")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-[#f37021] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        {lang === "en" ? "Request Power Specs" : "የጄኔሬተር መግለጫ ይጠይቁ"}
                      </button>
                    </div>
                  </div>

                  {/* Mechanical HVAC Systems */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/40 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                        <Image 
                          src={IMAGES.industrialPanel} 
                          alt="Commercial HVAC Ventilation and Ducting" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#f37021] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                          Climate &amp; Air
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-slate-300 font-medium font-amharic block">ሜካኒካል ኤችቪኤሲ እና አየር ማናፈሻ</span>
                          <h3 className="text-base font-bold tracking-tight">Mechanical HVAC Systems</h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          Commercial ventilation design, fresh air intake, stairwell pressurization, and smoke extraction exhaust systems matching international life safety codes.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Air Volume:</span>
                            <span className="text-slate-800">5,000 - 80,000 CFM</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Filtration:</span>
                            <span className="text-slate-800">Multi-Stage HEPA / MERV</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Fire-rated smoke damper and shaft exhaust integration</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> CNC precision galvanized sheet metal duct fabrications</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Vibration isolation mounting for low-noise operation</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleInquiryForProduct("Mechanical HVAC Systems", "general-engineering", "Stairwell pressurization, smoke extraction, multi-zone ducting")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-[#f37021] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        {lang === "en" ? "Request HVAC Specs" : "የኤችቪኤሲ መግለጫ ይጠይቁ"}
                      </button>
                    </div>
                  </div>

                  {/* Structural Shafts & Electrical Distribution */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-orange-500/40 hover:shadow-md transition-all group">
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                        <Image 
                          src={IMAGES.teamwork} 
                          alt="External Steel Elevator Shafts and Electrical Works" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#f37021] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                          Turnkey Engineering
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-slate-300 font-medium font-amharic block">የብረት ሊፍት ሳጥን እና ኤሌክትሪክ ዝርጋታ</span>
                          <h3 className="text-base font-bold tracking-tight">Steel Shafts &amp; Main Distribution</h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          Turnkey certified structural steel elevator shaft construction for existing buildings, electrical busway installations, main distribution boards (MDB), and earthing systems.
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Steel Shafts:</span>
                            <span className="text-slate-800">External &amp; Internal Clad</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-light block text-[10px]">Protection:</span>
                            <span className="text-slate-800">Lightning &amp; Surge Class I/II</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Structural load calculations stamped by licensed engineers</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Galvanized steel cable ladder trays and trunking</li>
                          <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#f37021] flex-shrink-0" /> Complete turnkey compliance with Ethiopian building code</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                      <button 
                        type="button"
                        onClick={() => handleInquiryForProduct("Structural Steel Shafts & Electrical Distribution", "general-engineering", "External steel elevator shaft fabrication, MDB wiring, earthing")}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-[#f37021] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 duration-150 flex items-center justify-center gap-2"
                      >
                        <Hammer className="w-3.5 h-3.5" />
                        {lang === "en" ? "Request Structural Specs" : "የመዋቅር መግለጫ ይጠይቁ"}
                      </button>
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
                { label: "Soliyana (3 Lifts)", query: "Soliyana" },
                { label: "BHA Real Estate", query: "BHA" },
                { label: "Gelay Panoramic", query: "Gelay" },
                { label: "Africon (14 Floors)", query: "Africon" },
                { label: "Getu Commercial", query: "Getu" },
                { label: "Dugda", query: "Dugda" },
                { label: "ANTEM Building", query: "ANTEM" },
                { label: "Tsihay (25 Lifts)", query: "Tsihay" }
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

                    {/* Project Lifecycle Progress Module for Ongoing Projects */}
                    {p.status === "Ongoing" && p.lifecycle && (
                      <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/90 rounded-xl p-3 border border-slate-200/70 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-[#f37021]" />
                            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                              {TRANSLATIONS[lang].lifecycleProgress}
                            </span>
                          </div>
                          <span className="text-[10px] font-extrabold text-[#f37021] bg-orange-100/90 px-2 py-0.5 rounded-full border border-orange-300/60">
                            {p.lifecycle.progressPercent}%
                          </span>
                        </div>

                        {/* Visual Progress Bar Track */}
                        <div className="relative py-1">
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#f37021] to-amber-500 rounded-full transition-all duration-500"
                              style={{ width: `${p.lifecycle.progressPercent}%` }}
                            />
                          </div>

                          {/* 3 Milestone Node Indicators */}
                          <div className="flex justify-between items-start mt-2">
                            {/* Milestone 1: Procurement */}
                            <div className="flex flex-col items-start max-w-[32%]">
                              <div className="flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${
                                  p.lifecycle.progressPercent >= 30 ? "bg-[#f37021]" : "bg-slate-300"
                                } ${p.lifecycle.stage === "Procurement" ? "ring-2 ring-orange-400 animate-pulse" : ""}`} />
                                <span className={`text-[9.5px] leading-tight ${
                                  p.lifecycle.stage === "Procurement"
                                    ? "text-[#f37021] font-bold"
                                    : p.lifecycle.progressPercent > 35
                                    ? "text-slate-700 font-semibold"
                                    : "text-slate-400"
                                }`}>
                                  {TRANSLATIONS[lang].lifecycleProcurement}
                                </span>
                              </div>
                            </div>

                            {/* Milestone 2: Structural Work */}
                            <div className="flex flex-col items-center max-w-[36%] text-center">
                              <div className="flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${
                                  p.lifecycle.progressPercent >= 60 ? "bg-[#f37021]" : "bg-slate-300"
                                } ${p.lifecycle.stage === "Structural Work" ? "ring-2 ring-orange-400 animate-pulse" : ""}`} />
                                <span className={`text-[9.5px] leading-tight ${
                                  p.lifecycle.stage === "Structural Work"
                                    ? "text-[#f37021] font-bold"
                                    : p.lifecycle.progressPercent > 75
                                    ? "text-slate-700 font-semibold"
                                    : "text-slate-400"
                                }`}>
                                  {TRANSLATIONS[lang].lifecycleStructural}
                                </span>
                              </div>
                            </div>

                            {/* Milestone 3: Commissioning */}
                            <div className="flex flex-col items-end max-w-[32%] text-right">
                              <div className="flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${
                                  p.lifecycle.progressPercent >= 85 ? "bg-[#f37021]" : "bg-slate-300"
                                } ${p.lifecycle.stage === "Commissioning" ? "ring-2 ring-orange-400 animate-pulse" : ""}`} />
                                <span className={`text-[9.5px] leading-tight ${
                                  p.lifecycle.stage === "Commissioning"
                                    ? "text-[#f37021] font-bold"
                                    : p.lifecycle.progressPercent >= 100
                                    ? "text-slate-700 font-semibold"
                                    : "text-slate-400"
                                }`}>
                                  {TRANSLATIONS[lang].lifecycleCommissioning}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Current Task Detail */}
                        {p.lifecycle.currentTask && (
                          <div className="pt-2 border-t border-slate-200/80 flex items-start gap-1.5 text-[10px] text-slate-600">
                            <Wrench className="w-3 h-3 text-[#f37021] flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">
                              <strong className="text-slate-800">{TRANSLATIONS[lang].activePhaseLabel}: </strong>
                              {p.lifecycle.currentTask}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

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
              { id: "vehicular", en: "Car Lifts & Stacking", am: "የመኪና ሊፍት እና ስታኪንግ", icon: Sliders },
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
                      <a href="tel:+251987077777" className="block hover:text-[#f37021] transition-colors">&bull; +251 987 077 777</a>
                      <a href="tel:+251911675505" className="block hover:text-[#f37021] transition-colors">&bull; +251 911 675 505</a>
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
                  href="tel:+251987077777"
                  className="inline-flex items-center gap-2 bg-[#f37021] hover:bg-[#d65103] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  Initiate Rescue Dispatch (+251 987 077 777)
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
                      placeholder="e.g. +251 987 077 777"
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
              <CompanyLogo variant="badge" textColor="text-white" />
              <p className="text-xs text-slate-400 leading-relaxed font-bold max-w-sm">
                Shining Star is Ethiopia's certified electro-mechanical contractor, specializing in luxury vertical transport supply, China factory trained technicians, and robust emergency breakdown support.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#f37021]">"Star of Elevation"</span>
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
                <span className="block">Hotline: +251 987 077 777 / +251 911 675 505</span>
                <span className="block">Email: info@shiningstarlink.com</span>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-slate-600">
            <span>&copy; {new Date().getFullYear()} Shining Star Electro Mechanical Work.</span>
            <span>Addis Ababa, Ethiopia</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
