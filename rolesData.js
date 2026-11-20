// Roles and Hierarchy Structure
const SYSTEM_ROLES = {
  CIVIL: "Civil Citizen",
  SPECIAL_GROUPS: [
    {
      group: "1. Electricity Supply Related",
      roles: [
        "Local Sub-station / NOCS Staff",
        "Line Team / Emergency Line Team",
        "Billing Team / Customer Centre Staff",
        "Meter Section Staff",
        "Prepaid / NOCS Cell Staff",
        "XEN (Executive Engineer) / Sub-station XEN",
        "Circle (SE - Superintending Engineer) Engineer",
        "Chief Engineer",
        "Grievance Redress Officer (GRO)",
        "Appellate Officer",
        "Power Division / BERC (Bangladesh Energy Regulatory Commission)"
      ]
    },
    {
      group: "2. Gas Supply Related",
      roles: [
        "Assistant Manager (Field/area office level handling complaints, repairs, and meters)",
        "Deputy Manager / Manager (Head of the area or zonal office)",
        "Deputy General Manager (DGM)",
        "General Manager (GM) (Division head at company head office)",
        "Deputy Managing Director (DMD) (Head of a region)",
        "Managing Director (MD) (Head of the gas company)",
        "Chairman, Petrobangla (Parent corporation)",
        "Secretary, Energy and Mineral Resources Division",
        "State Minister, Power, Energy and Mineral Resources",
        "Minister, Power, Energy and Mineral Resources"
      ]
    },
    {
      group: "3. Water Supply Related - WASA Cities (Dhaka, Chattogram, Khulna, Rajshahi, Sylhet)",
      roles: [
        "Assistant Engineer (Sohokari Prokowshali) (Field-level engineer in a zone/sub-division)",
        "Executive Engineer (Nirbahi Prokowshali) (Heads a MODS zone or division)",
        "Superintending Engineer (Tottwabodhayok Prokowshali)",
        "Chief Engineer (Prodhan Prokowshali) and Additional Chief Engineers",
        "Managing Director (MD), WASA",
        "Chairman, WASA Board",
        "Secretary, Local Government Division",
        "State Minister, LGRD",
        "Minister, LGRD (Local Government, Rural Development and Co-operatives)"
      ]
    },
    {
      group: "3. Water Supply Related - DPHE (Districts, Upazilas, Pourashavas)",
      roles: [
        "Assistant Engineer, DPHE (Upazila / Sub-Division level)",
        "Deputy Assistant Engineer, DPHE",
        "Executive Engineer, DPHE (District level)",
        "Superintending Engineer, DPHE (Circle / Zone regional oversight)",
        "Additional Chief Engineer, DPHE",
        "Chief Engineer, DPHE"
      ]
    },
    {
      group: "3. Water Supply Related - BWDB (River Floods, Embankments, and Irrigation)",
      roles: [
        "Assistant Engineer, BWDB",
        "Sub-Divisional Engineer, BWDB",
        "Executive Engineer, BWDB",
        "Superintending Engineer, BWDB",
        "Chief Engineer, BWDB",
        "Director General, BWDB",
        "Secretary, Water Resources Division",
        "Minister, Water Resources"
      ]
    },
    {
      group: "4. Citizen Rights Related",
      roles: [
        "Ward Councilor",
        "Zonal Councilor (City Corporation Zone) / UNO",
        "Pradhan Powder (City Corporation) / Municipal Councilor Officer",
        "Administration / Administrator",
        "Area, Local Government Department",
        "Minister/Advisor, Local Government, Rural Development and Cooperatives",
        "National Consumer Complaint Centre (NCCC) - Intake Desk",
        "Director General (DG) or Empowered Officer",
        "Divisional Deputy Director or District Assistant Director",
        "Investigating & Hearing Officer",
        "District Magistrate (Alternative Jurisdiction)"
      ]
    },
    {
      group: "5. Crime Sector",
      roles: [
        "OC (Station)",
        "Assistant Commissioner (AC) / ASP Circle DC (DMP Zone) / Additional Superintendent of Police",
        "Additional Police Commissioner / Superintendent of Police (SP)",
        "Police Commissioner (Metro) / DIG (Range)",
        "Inspector General of Police (IGP)",
        "Secretary, Public Safety Division, Ministry of Home Affairs",
        "Minister/Advisor, Ministry of Home Affairs"
      ]
    }
  ]
};

// Crime Categories
const CRIME_CATEGORIES = [
  "Murder",
  "Manslaughter (not murder)",
  "Causing death by negligence",
  "Rash or negligent driving",
  "Hurt/grievous hurt",
  "Acid attack (grievous)",
  "Kidnapping",
  "Wrongful confinement",
  "Theft",
  "Robbery / dacoity",
  "Extortion",
  "Cheating",
  "Criminal breach of trust",
  "Forgery",
  "Mischief / vandalize (damage)",
  "Trespass",
  "Defamation",
  "Criminal threat",
  "Insulting a woman's modesty",
  "Bribery by a public servant",
  "Fire or explosive negligence",
  "Sexual Assult / Rape / Molestation"
];

// Special auto-routing criteria for SP:
// In "Report Crime" cases, if citizen user selects any of the following:
// "Murder", "Involuntary Manslaughter (not murder)", "Causing death by negligence", "Acid attack (serious)", "Negligent use of fire or explosives", "Sexual Assult / Rape / Molestation"
// -> directly reach "Additional Police Commissioner / Superintendent of Police (SP)"
const SP_AUTO_ROUTED_CRIMES = [
  "Murder",
  "Manslaughter (not murder)",
  "Involuntary Manslaughter (not murder)",
  "Causing death by negligence",
  "Acid attack (grievous)",
  "Acid attack (serious)",
  "Fire or explosive negligence",
  "Negligent use of fire or explosives",
  "Sexual Assult / Rape / Molestation"
];

// 5 Categories for Report Problem
const PROBLEM_CATEGORIES = [
  "1. Citizen Rights Related",
  "2. Electricity Supply Related",
  "3. Gas Supply Related",
  "4. Water Supply Related"
];
