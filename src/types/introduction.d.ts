export interface CoreValueItemProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  isLast?: boolean;
}

export interface ListItemProps {
  label: string;
  markerColorClass?: string;
  textColorClass?: string;
  delay?: number;
}

export interface StatItemProps {
  value: string;
  label: string;
  delay: number;
}

export interface FactoryImageProps {
  src: string;
  alt: string;
}
