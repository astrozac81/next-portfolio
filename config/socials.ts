import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@Isaac Laurent",
    icon: Icons.gitHub,
    link: "https://github.com/Isaac-Laurent",
  },
  {
    name: "Discord",
    username: "@Isaac Laurent",
    icon: Icons.discord,
    link: "https://discord.com/invite/isaaclaurent",
  },
  {
    name: "Telegram",
    username: "@Isaac Laurent",
    icon: Icons.telegram,
    link: "https://t.me/isaaclaurent",
  },
  {
    name: "Gmail",
    username: "@Isaac Laurent",
    icon: Icons.gmail,
    link: "mailto:isaaclaurent@gmail.com",
  },
];
