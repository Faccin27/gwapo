"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en");
  };

  const handleNavigation = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-gray-900/90 backdrop-blur-md border-b border-white/10 py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Gwapo Logo"
              className="h-32 w-32"
            />
            <h2 className="text-white text-2xl font-bold">
              GW<span className="text-gwapo">APO</span>
            </h2>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#home"
            onClick={() => handleNavigation("home")}
            className={cn(
              "text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "home" && "text-gwapo font-medium"
            )}
          >
            {t("home")}
          </a>
          <a
            href="#before-after"
            onClick={() => handleNavigation("before-after")}
            className={cn(
              "text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "before-after" && "text-gwapo font-medium"
            )}
          >
            {t("before-after")}
          </a>
          <a
            href="#services"
            onClick={() => handleNavigation("services")}
            className={cn(
              "text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "services" && "text-gwapo font-medium"
            )}
          >
            {t("services")}
          </a>
          <a
            href="#process"
            onClick={() => handleNavigation("process")}
            className={cn(
              "text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "process" && "text-gwapo font-medium"
            )}
          >
            {t("process")}
          </a>
          <a
            href="#projects"
            onClick={() => handleNavigation("projects")}
            className={cn(
              "text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "projects" && "text-gwapo font-medium"
            )}
          >
            {t("projects")}
          </a>
          <a
            href="#ready-sites"
            onClick={() => handleNavigation("ready-sites")}
            className={cn(
              "text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "ready-sites" && "text-gwapo font-medium"
            )}
          >
            {t("ready")}
          </a>
          <a
            href="#contact"
            onClick={() => handleNavigation("contact")}
            className={cn(
              "text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "contact" && "text-gwapo font-medium"
            )}
          >
            {t("contact")}
          </a>
          <Button
            className="bg-gwapo-gradient hover:opacity-90 transition-opacity"
            onClick={() => handleNavigation("contact")}
          >
            {t("get-quote")}
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={toggleLanguage}
          >
            {language === "en" ? "PT" : "EN"}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10 mr-2"
            onClick={toggleLanguage}
          >
            {language === "en" ? "PT" : "EN"}
          </Button>
          <button
            className="text-gray-200 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out pt-20",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
          <a
            href="#home"
            className={cn(
              "text-xl font-medium text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "home" && "text-gwapo"
            )}
            onClick={() => handleNavigation("home")}
          >
            {t("home")}
          </a>
          <a
            href="#before-after"
            className={cn(
              "text-xl font-medium text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "before-after" && "text-gwapo"
            )}
            onClick={() => handleNavigation("before-after")}
          >
            {t("before-after")}
          </a>
          <a
            href="#services"
            className={cn(
              "text-xl font-medium text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "services" && "text-gwapo"
            )}
            onClick={() => handleNavigation("services")}
          >
            {t("services")}
          </a>
          <a
            href="#process"
            className={cn(
              "text-xl font-medium text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "process" && "text-gwapo"
            )}
            onClick={() => handleNavigation("process")}
          >
            {t("process")}
          </a>
          <a
            href="#projects"
            className={cn(
              "text-xl font-medium text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "projects" && "text-gwapo"
            )}
            onClick={() => handleNavigation("projects")}
          >
            {t("projects")}
          </a>
          <a
            href="#ready-sites"
            className={cn(
              "text-xl font-medium text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "ready-sites" && "text-gwapo"
            )}
            onClick={() => handleNavigation("ready-sites")}
          >
            {t("ready-sites")}
          </a>
          <a
            href="#contact"
            className={cn(
              "text-xl font-medium text-gray-200 hover:text-gwapo transition-colors",
              activeSection === "contact" && "text-gwapo"
            )}
            onClick={() => handleNavigation("contact")}
          >
            {t("contact")}
          </a>
          <Button
            className="bg-gwapo-gradient hover:opacity-90 transition-opacity w-full"
            onClick={() => handleNavigation("contact")}
          >
            {t("get-quote")}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
