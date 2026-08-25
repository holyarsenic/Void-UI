import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const PRODUCT_LINKS = [
  { label: "Showcase", href: "#showcase" },
  { label: "enroll in", href: "#enroll" },
];

const RESOURCE_LINKS = [
  { label: "Documentation", href: "#" },
  { label: "GitHub", href: "https://github.com/holyarsenic/void-ui" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const FOOTER_LINK =
  "text-sm text-white/35 transition-colors hover:text-white";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border border-white/20 pt-14 pb-5 md:pt-20">

      <div className="relative w-full px-6 pb-7 sm:px-10 md:px-20">

        <div className="grid grid-cols-1 gap-14 pb-15 md:grid-cols-12 md:gap-10 lg:gap-20">
          <div className="md:col-span-6 lg:col-span-5">
            <Link href="/" className="flex gap-2 items-center">
              <Image
                src="/Logo.svg"
                alt="Void UI"
                width={406}
                height={120}
                className="h-10 w-auto"
              />
              <h4 className="font-theme text-2xl">Void UI</h4>
            </Link>

            <p className="mt-6 max-w-sm text-sm text-white/35">
              The modern design system for converting ambitious ideas into flawless, high-impact digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-6 lg:col-span-7">
            <div>
              <h4 className="mb-5 text-sm font-medium text-white/60 uppercase">
                Product
              </h4>

              <ul className="space-y-3.5">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.label}>
                    <a 
                      key={link.label}
                      href={link.href} 
                      className={FOOTER_LINK}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-medium text-white/60 uppercase">
                Resources
              </h4>

              <ul className="space-y-3.5">
                {RESOURCE_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      key={link.label}
                      href={link.href}
                      className={FOOTER_LINK}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-medium text-white/60 uppercase">
                Legal
              </h4>

              <ul className="space-y-3.5">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a 
                      key={link.label}
                      href={link.href} 
                      className={FOOTER_LINK}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-7 md:flex-row">
          <p className="text-xs text-white/60">
            © {currentYear} Void UI. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://x.com/holyarsenic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-white"
              aria-label="X"
            >
              <FaXTwitter className="text-xl"/>
            </a>

            <a
              href="https://github.com/holyarsenic/void-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-white"
              aria-label="GitHub"
            >
              <FaGithub className="text-xl"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;