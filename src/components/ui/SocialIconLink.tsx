import { SocialIconLinkProps } from "@/src/types/contact";

export default function SocialIconLink({
  href,
  title,
  icon: Icon,
}: SocialIconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="w-10 h-10 bg-[#faf8f5] rounded-full flex items-center justify-center shrink-0 hover:bg-[#8b6914] group transition-colors"
    >
      <Icon className="w-5 h-5 text-[#8b6914] group-hover:text-white transition-colors" />
    </a>
  );
}
