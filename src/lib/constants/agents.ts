import { Agent } from '@/lib/types/agent';

export const INITIAL_AGENTS: Agent[] = [
  {
    role: "architect",
    name: "Architect Agent",
    description: "Designs the overall project structure and component hierarchy",
    capabilities: ["Project planning", "Directory structure", "Dependency management"],
  },
  {
    role: "component-generator",
    name: "Component Generator",
    description: "Generates React components and their implementations",
    capabilities: ["React", "TypeScript", "Component patterns"],
  },
  {
    role: "styling",
    name: "Styling Agent",
    description: "Handles component styling and visual design",
    capabilities: ["TailwindCSS", "Responsive design", "Accessibility"],
  },
  {
    role: "testing",
    name: "Testing Agent",
    description: "Creates test cases and ensures code quality",
    capabilities: ["Unit testing", "Integration testing", "Test coverage"],
  },
  {
    role: "content",
    name: "Content Agent",
    description: "Generates and optimizes content",
    capabilities: ["SEO optimization", "Content strategy", "Multilingual support"],
  },
  {
    role: "performance",
    name: "Performance Agent",
    description: "Optimizes application performance",
    capabilities: ["Image optimization", "Code splitting", "Bundle optimization"],
  },
];