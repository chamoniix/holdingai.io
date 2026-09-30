export type ServiceKey = 'aiStrategy' | 'productDesign' | 'development' | 'dataAnalytics';

export const servicesData: {
  icon: string;
  key: ServiceKey;
  image: string;
  gradient: string;
}[] = [
  {
    icon: 'BrainCircuit',
    key: 'aiStrategy',
    image: '/images/assets/IMG_Services_01.jpg',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    icon: 'PenTool',
    key: 'productDesign',
    image: '/images/assets/IMG_Services_02.jpg',
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    icon: 'Code2',
    key: 'development',
    image: '/images/assets/IMG_Services_03.jpg',
    gradient: 'from-orange-500/20 to-red-500/20'
  },
  {
    icon: 'LineChart',
    key: 'dataAnalytics',
    image: '/images/assets/IMG_Services_04.jpg',
    gradient: 'from-green-500/20 to-emerald-500/20'
  }
]
