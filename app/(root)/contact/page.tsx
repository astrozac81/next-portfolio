import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import GithubRedirectCard from "@/components/contact/github-redirect-card";
import { ContactForm } from "@/components/forms/contact-form";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.contact.metadata.title,
  description: pagesConfig.contact.metadata.description,
};

const CONTACT_INFO = [
  {
    label: "Email",
    value: "isaac.laurent77@gmail.com",
    href: "mailto:isaac.laurent77@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/isaaclaurent",
    href: "https://linkedin.com/in/isaaclaurent",
  },
];

function ContactInfoCard() {
  return (
    <div className="mb-8 p-6 rounded-xl shadow-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      <ul className="space-y-2">
        {CONTACT_INFO.map((info) => (
          <li key={info.label}>
            <span className="font-medium">{info.label}: </span>
            <a
              href={info.href}
              className="text-blue-600 dark:text-blue-400 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {info.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ContactPage() {
  return (
    <PageContainer
      title={pagesConfig.contact.title}
      description={pagesConfig.contact.description}
    >
      <ContactInfoCard />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8 border border-neutral-200 dark:border-neutral-800">
          <ContactForm />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <GithubRedirectCard />
        </div>
      </div>
    </PageContainer>
  );
}
