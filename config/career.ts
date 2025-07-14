import { ValidSkills } from "./constants";

export interface CareerExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
}

export const careerExperiences: CareerExperienceInterface[] = [
  {
    id: "freelancer",
    position: "Full Stack & Blockchain Engineer",
    company: "freelancer",
    location: "",
    startDate: new Date("2024-11-01"),
    endDate: "Present",
    description: [
      "Developed smart contracts for decentralized applications (dApps) and conducted security audits to ensure robustness",
      "Integrated blockchain technology with existing systems to streamline processes and enhance data transparency.",
      "Built scalable web applications with responsive front-end interfaces using modern frameworks like React and Angular",
      "Collaborated with cross-functional teams to analyze requirements, propose solutions, and deliver high-quality products on schedule",
    ],
    achievements: [
      "Designed and implemented end-to-end blockchain solutions using Ethereum and Hyperledger platforms",
      "Developed smart contracts for decentralized applications (dApps) and conducted security audits to ensure robustness",
      "Integrated blockchain technology with existing systems to streamline processes and enhance data transparency.",
      "Built scalable web applications with responsive front-end interfaces using modern frameworks like React and Angular",
      "Collaborated with cross-functional teams to analyze requirements, propose solutions, and deliver high-quality products on schedule",
    ],
    skills: ["Typescript", "React", "Next.js", "Node.js", "Python", "Nest.js", "Solidity", "Ethereum", "Hyperledger"],
    companyUrl: "https://www.freelancer.com/u/IsaacLaurent",
    logo: "/freelancer-icon.png",
  },
  {
    id: "gapgenmini",
    position: "Full Stack Developer",
    company: "Gapgenmini",
    location: "France, Paris",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2024-10-01"),
    description: [
      "Developed a full-stack web application for a mini-game using Next.js, Tailwind CSS, and TypeScript.",
      "Implemented authentication and authorization using NextAuth.js and JWT tokens.",
      "Created a responsive UI with a focus on user experience and performance.",
      "Developed a backend API using Node.js and express.js to handle game logic and data storage.",
    ],
    achievements: [
      "Lead the development of a cutting-edge web application from conception to deployment, utilizing a wide range of technologies including React, Node.js, and MongoDB.",
      "Collaborated with cross-functional teams to implement new features and enhancements on existing platforms, improving overall user experience and performance",
      "Designed and maintained scalable and efficient database schemas to support dynamic data-driven applications, ensuring optimal functionality and reliability",
      "Conducted thorough testing and debugging procedures to identify and resolve technical issues, resulting in a high-quality product with minimal defects.",
      "Stayed abreast of industry trends and best practices, continuously seeking opportunities to enhance skills and stay at the forefront of technology advancements.",
    ],
    skills: ["Next.js", "React", "Node.js", "AWS", "MongoDB", "Typescript", "Tailwind CSS", "express.js", "NextAuth.js", "JWT"],
    companyUrl: "https://www.capgemini.com",
    logo: "/capgemini.png",
  },
  {
    id: "capgemini",
    position: "Backend Developer",
    company: "Capgemini",
    location: "France, Paris",
    startDate: new Date("2018-09-01"),
    endDate: new Date("2022-12-31"),
    description: [
      "Developed a backend API using Node.js and express.js to handle game logic and data storage.",
      "Implemented authentication and authorization using NextAuth.js and JWT tokens.",
      "Created a responsive UI with a focus on user experience and performance.",
    ],
    achievements: [
      "Developed scalable and efficient backend systems using Node.js and MongoDB to handle large volumes of data processing",
      "Implemented RESTful APIs for communication between frontend and backend systems to ensure seamless user experience",
      "Collaborated with cross-functional teams to design and implement new features, modules, and services according to project requirements",
      "Conducted code reviews and contributed to continuous integration and deployment processes to ensure code quality and timely delivery of products",
      "Optimized database queries and performance to improve application responsiveness and decrease load times",
    ],
    skills: ["Node.js", "express.js", "MongoDB", "Typescript", "Next.js", "NextAuth.js", "JWT"],
    companyUrl: "https://www.capgemini.com",
    logo: "/capgemini.png",
  },
  {
    id: "epita",
    position: "EPITA",
    company: "University, Paris",
    location: "France, Paris",
    startDate: new Date("2013-04-01"),
    endDate: new Date("2018-08-31"),
    description: [
      "Developed a backend API using Node.js and express.js to handle game logic and data storage.",
      "Implemented authentication and authorization using NextAuth.js and JWT tokens.",
      "Created a responsive UI with a focus on user experience and performance.",
    ],
    achievements: [
      "Implemented strategic planning and execution for EPITA systems to meet organizational objectives and improve operational efficiency",
      "Conducted regular audits and assessments of EPITA processes to ensure compliance with regulatory requirements and best practices",
      "Collaborated with cross-functional teams to design and implement security measures to protect EPITA data and infrastructure",
      "Developed and delivered training programs for employees on EPITA policies, procedures, and best practices",
    ],
    skills: ["Node.js", "express.js", "MongoDB", "Typescript", "Next.js", "NextAuth.js", "JWT"],
    companyUrl: "https://www.epita.fr/en",
    logo: "/epita.png",
  },
];
