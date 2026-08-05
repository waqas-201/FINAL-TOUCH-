"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      root.classList.add("reduce-motion");
      return;
    }

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], main section:not(:first-child) .section-title, main section:not(:first-child) .eyebrow, .product-card, [data-stagger] > *",
      ),
    );

    revealTargets.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      const parent = element.parentElement;
      if (element.matches(".product-card") || parent?.hasAttribute("data-stagger")) {
        element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 3) * 30}ms`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "120px 0px 120px 0px", threshold: 0.01 },
    );
    revealTargets.forEach((element) => observer.observe(element));

    const parallaxTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;

    const updateScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--scroll-progress", `${Math.min(1, window.scrollY / max)}`);

      parallaxTargets.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom > -120 && rect.top < window.innerHeight + 120) {
          const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
          const speed = Number(element.dataset.parallax || "0.06");
          element.style.setProperty("--parallax-y", `${centerOffset * -speed}px`);
        }
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
