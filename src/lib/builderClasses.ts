export interface BuilderClassOption {
  id: string;
  title: string;
  badge: string;
  description: string;
}

export const BUILDER_CLASSES: BuilderClassOption[] = [
  { id: 'terminal-wizard', title: 'TERMINAL WIZARD', badge: '🧙‍♂️', description: 'Executes root commands with pure magic' },
  { id: 'fullstack-alchemist', title: 'FULLSTACK ALCHEMIST', badge: '🧪', description: 'Transforms coffee into scalable MERN apps' },
  { id: 'ai-nomad', title: 'AI NOMAD', badge: '🤖', description: 'Fine-tuning LLMs on the beaches of Anjuna' },
  { id: 'vibe-coder', title: 'VIBE CODER', badge: '🌴', description: 'Ships production code to LO-FI beats' },
  { id: 'rust-whisperer', title: 'RUST WHISPERER', badge: '🦀', description: 'Zero-cost abstractions & zero memory leaks' },
  { id: 'pixel-architect', title: 'PIXEL ARCHITECT', badge: '🎨', description: 'Crafts UI so smooth it makes developers weep' },
  { id: 'smart-contract-ninja', title: 'SMART CONTRACT NINJA', badge: '⚡', description: 'Auditing bytecode at 3:00 AM' },
  { id: 'infra-titan', title: 'INFRA TITAN', badge: '☁️', description: 'Keeps Kubernetes clusters humming in 99.999% uptime' },
];

export const PRESET_STACKS = [
  'MERN Stack (MongoDB, Express, React, Node)',
  'Next.js • TypeScript • Tailwind CSS',
  'React • Node.js • PostgreSQL',
  'Python • PyTorch • FastAPI',
  'Rust • Solana • Anchor',
  'Full Stack JavaScript / TypeScript',
  'Flutter • Firebase • Dart',
  'Go • Docker • Microservices',
];

export const PRESET_VIBES = [
  'BUILD • SHIP • REPEAT',
  'GOA BEACH & LO-FI BEATS 🌴',
  'COFFEE TO CODE ☕',
  'NO SLEEP TILL PARADISE 🚀',
  'SHIPPING FROM GOA WITH LOVE ❤️',
  'DEBUGGING ON THE SHORE 🏖️',
];

export function generateRandomBuilderID(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `#HH26-${num}`;
}

export function getRandomBuilderClass(): BuilderClassOption {
  return BUILDER_CLASSES[Math.floor(Math.random() * BUILDER_CLASSES.length)];
}
