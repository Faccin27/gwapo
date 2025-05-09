import React from "react";
import { cn } from "@/lib/utils";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Gwapo Logo"
                className="h-24 w-24"
              />
              <h2 className="text-white text-2xl font-bold">
                GW<span className="text-gwapo">APO</span>
              </h2>
            </div>
            <p className="text-gray-300 mb-6">
              
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon="facebook" />
              <SocialIcon href="#" icon="twitter" />
              <SocialIcon href="#" icon="instagram" />
              <SocialIcon href="#" icon="linkedin" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <FooterLink href="#services">Web Development</FooterLink>
              <FooterLink href="#services">Visual Identity</FooterLink>
              <FooterLink href="#services">RPA Solutions</FooterLink>
              <FooterLink href="#services">UI/UX Design</FooterLink>
              <FooterLink href="#services">E-Commerce Solutions</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="#home">Home</FooterLink>
              <FooterLink href="#services">Services</FooterLink>
              <FooterLink href="#projects">Projects</FooterLink>
              <FooterLink href="#before-after">Before/After</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="text-gwapo mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span className="text-gray-300">Joaseba - SC</span>
              </li>
              <li className="flex items-start">
                <div className="text-gwapo mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                  </svg>
                </div>
                <span className="text-gray-300">+44 12 3456 7890</span>
              </li>
              <li className="flex items-start">
                <div className="text-gwapo mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect width="16" height="12" x="4" y="6" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <span className="text-gray-300">info@gwapo.uk</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} GWAPO. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper components
const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <li>
    <a
      href={href}
      className="text-gray-300 hover:text-gwapo transition-colors inline-block py-1"
    >
      {children}
    </a>
  </li>
);

const SocialIcon: React.FC<{ href: string; icon: string }> = ({
  href,
  icon,
}) => {
  const getIconSvg = () => {
    switch (icon) {
      case "facebook":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        );
      case "instagram":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
        );
      case "linkedin":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect width="4" height="12" x="2" y="9"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <a
      href={href}
      className={cn(
        "bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center",
        "hover:bg-gwapo transition-colors duration-300"
      )}
    >
      {getIconSvg()}
    </a>
  );
};

export default Footer;
