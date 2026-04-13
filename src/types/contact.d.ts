import { LucideIcon } from "lucide-react";
import { type IconType } from "react-icons";

export interface ContactInfoItemProps {
  icon: LucideIcon;
  title: string;
  content: string;
  href?: string;
  delay?: number;
}

export interface SocialIconLinkProps {
  href: string;
  title: string;
  icon: IconType;
}

export interface ContactPageData {
  coreValues: CoreValueItemProps[];
  contactInfo: ContactInfoItemProps[];
  socialLinks: SocialIconLinkProps[];
}
