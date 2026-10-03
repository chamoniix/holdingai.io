export type ServiceKey = 'agents' | 'knowledge' | 'chatbots' | 'implementation' | 'consulting' | 'genai';

export const servicesData: {
  key: ServiceKey;
  image: string;
}[] = [
  { key: 'agents', image: '/images/projects/agents.jpg' },
  { key: 'knowledge', image: '/images/projects/knowledge.jpg' },
  { key: 'chatbots', image: '/images/projects/chatbots.jpg' },
  { key: 'implementation', image: '/images/projects/implementation.jpg' },
  { key: 'consulting', image: '/images/projects/consulting.jpg' },
  { key: 'genai', image: '/images/projects/genai.jpg' },
]
