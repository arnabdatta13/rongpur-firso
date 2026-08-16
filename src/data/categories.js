export const OLYMPIAD_AGE_GROUPS = [
  "Class 1-2",
  "Class 3-4",
  "Class 5-6",
  "Class 7-8",
  "Class 9-10",
  "Class 11-12"
];

export const GENERAL_AGE_GROUPS = [
  "Class 1-2",
  "Class 3-4",
  "Class 5-6",
  "Class 7-8",
  "Class 9-10",
  "Class 11-12",
  "University"
];

export const CATEGORIES = [
  {
    id: "olympiads",
    title: "Olympiads",
    subtitle: "Solo Competition Only",
    badge: "Solo Only",
    description: "Test your analytical skills in Mathematics and Science Olympiads.",
    icon: "Brain",
    type: "olympiad",
    isTeamAllowed: false,
    maxTeamSize: 1,
    ageGroups: OLYMPIAD_AGE_GROUPS,
    pricingType: "olympiad_combo",
    subcategories: [
      { id: "math", name: "Mathematics Olympiad", fee: 500 },
      { id: "science", name: "Science Olympiad", fee: 500 }
    ],
    comboPackage: {
      name: "Both Olympiads (Combo Package)",
      fee: 800,
      savings: 200,
      badge: "Combo Package — Save 200 BDT"
    }
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship & Projects",
    subtitle: "Team or Solo Participation",
    badge: "Solo / Team (Max 5)",
    description: "Pitch your innovations in tech, startup, green tech, and health innovations.",
    icon: "Lightbulb",
    type: "entrepreneurship",
    isTeamAllowed: true,
    maxTeamSize: 5,
    ageGroups: GENERAL_AGE_GROUPS,
    pricingType: "per_member_fixed",
    baseFee: 500,
    additionalMemberFee: 500,
    subcategories: [
      { id: "jr_startup", name: "Junior Startup Challenge" },
      { id: "blue_ent", name: "Blue Entrepreneurship" },
      { id: "green_ent", name: "Green Entrepreneurship" },
      { id: "health_tech", name: "HealthTech Entrepreneurship" },
      { id: "robo_tech", name: "RoboTech Entrepreneurship" },
      { id: "soft_tech", name: "SoftTech Entrepreneurship" }
    ]
  },
  {
    id: "robotics",
    title: "Direct Robotics Categories",
    subtitle: "Team or Solo Participation",
    badge: "Direct Event Selection",
    description: "Compete directly with your robots in racing, soccer, sumo, and maze solving.",
    icon: "Bot",
    type: "robotics",
    isTeamAllowed: true,
    maxTeamSize: 5,
    ageGroups: GENERAL_AGE_GROUPS,
    pricingType: "per_member_robotics",
    baseFee: 800,
    additionalMemberFee: 400,
    events: [
      { id: "line_follower", name: "Line Follower Robots" },
      { id: "sumo_robots", name: "Sumo Robots" },
      { id: "maze_solving", name: "Maze Solving Robot" },
      { id: "drone_racing", name: "Drone Rally Racing" },
      { id: "robo_soccer", name: "Robo Soccer / FootBot" }
    ]
  }
];
