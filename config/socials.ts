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
    username: "AstroZac",
    icon: Icons.gitHub,
    link: "https://github.com/astrozac81",
  },
  {
    name: "Discord",
    username: "Astrozac",
    icon: Icons.discord,
    link: "https://discord.com/invite/_zac.attack_",
  },
  {
    name: "Telegram",
    username: "@Isaac Laurent",
    icon: Icons.telegram,
    link: "https://t.me/kittycoin903",
  },
  {
    name: "Gmail",
    username: "@Isaac Laurent",
    icon: Icons.gmail,
    link: "mailto:isaac.laurent77@gmail.com",
  },
];
