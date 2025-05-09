"use client";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface ReadyMadeSiteProps {
  title: string;
  description: string;
  image: string;
  price: string;
  originalPrice?: string;
  features: string[];
  index: number;
}

const ReadyMadeSite: React.FC<ReadyMadeSiteProps> = ({
  title,
  description,
  image,
  price,
  originalPrice,
  features,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [index]);

  const { t } = useLanguage();

  return (
    <Card
      ref={cardRef}
      className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 neo-glass"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
        />
        {originalPrice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Sale!
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 mb-4 text-sm">{description}</p>

        <div className="mb-4">
          <ul className="text-sm text-gray-300">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center mb-1">
                <svg
                  className="w-4 h-4 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-end justify-between">
          <div>
            {originalPrice && (
              <span className="text-gray-400 line-through mr-2 text-sm">
                {originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-gwapo">{price}</span>
          </div>

          <Button className="bg-gwapo-gradient hover:opacity-90 text-white">
            View Demo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ReadyMadeSites: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;

    if (title) {
      gsap.fromTo(
        title,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const readyMadeSites = [
    {
      title: "Modern E-commerce Template",
      description:
        "A complete e-commerce solution with product catalog, cart, and checkout.",
      image: "/images/nakai.png",
      price: "R$: 599",
      originalPrice: "R$: 999",
      features: [
        "Responsive Design",
        "Product Catalog",
        "Shopping Cart",
        "Payment Processing",
        "Admin Dashboard",
      ],
    },
    {
      title: "Professional Portfolio",
      description: "Showcase your work with this elegant portfolio template.",
      image: "/images/nakai.png",
      price: "R$: 299",
      features: [
        "Project Gallery",
        "About Section",
        "Contact Form",
        "Blog Integration",
        "Social Media Links",
      ],
    },
    {
      title: "Restaurant Website",
      description:
        "Perfect for restaurants, cafes, and food delivery services.",
      image: "/images/nakai.png",
      price: "R$: 399",
      originalPrice: "R$: 699",
      features: [
        "Menu Display",
        "Online Reservations",
        "Location Map",
        "Photo Gallery",
        "Testimonials",
      ],
    },
  ];

  return (
    <section
      id="ready-made-sites"
      ref={sectionRef}
      className="py-20 bg-gray-800 text-white"
    >
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <h6 className="text-gwapo font-medium mb-2">
            {t("ready-made-title")}{" "}
          </h6>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {t("ready-made-subtitle")}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            {t("ready-made-desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {readyMadeSites.map((site, index) => (
            <ReadyMadeSite
              key={index}
              title={site.title}
              description={site.description}
              image={site.image}
              price={site.price}
              originalPrice={site.originalPrice}
              features={site.features}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadyMadeSites;
