// Shared by Studio and the portfolio so preset keys stay in sync.
export const extraSkillPresets = [
  { title: "React Query", value: "reactQuery", icon: "SiReactquery" },
  { title: "Redux", value: "redux", icon: "SiRedux" },
  { title: "Recharts", value: "recharts", icon: "ChartNoAxesCombined" },
  { title: "CI/CD", value: "cicd", icon: "Workflow" },
  { title: "AWS", value: "aws", icon: "fa6/FaAws" },
  { title: "Deployment", value: "deployment", icon: "Rocket" },
  { title: "Jest", value: "jest", icon: "SiJest" },
  { title: "Unit Testing", value: "unitTesting", icon: "TestTubeDiagonal" },
  { title: "Integration Testing", value: "integrationTesting", icon: "Blocks" },
  { title: "WebSockets", value: "websockets", icon: "Radio" },
  { title: "RAG", value: "rag", icon: "BrainCircuit" },
  { title: "Vector Database", value: "vectorDb", icon: "DatabaseZap" },
  { title: "Postman", value: "postman", icon: "SiPostman" },
] as const;

export const extraSkillIconNames: Record<string, string> = Object.fromEntries(
  extraSkillPresets.map(({ value, icon }) => [value, icon]),
);
