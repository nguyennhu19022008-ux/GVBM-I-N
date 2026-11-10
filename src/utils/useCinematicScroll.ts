import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCinematicScroll() {
  useEffect(() => {
    // Check if prefers-reduced-motion is enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Background Parallax
      const heroBg = document.querySelector('.hero-bg-parallax');
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroBg.parentElement || document.body,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 2. Cinematic Section Scroll Reveals (Fade in & Slide up on scroll)
      const revealElements = document.querySelectorAll('.cinematic-scroll-reveal');
      revealElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 3. Staggered Leaders Cards Scroll Entrance
      const leaderCards = document.querySelectorAll('.leader-card-stagger');
      if (leaderCards.length > 0) {
        gsap.fromTo(
          leaderCards,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leaderCards[0].parentElement || leaderCards[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 4. Staggered Campaign Cards Scroll Entrance
      const campaignCards = document.querySelectorAll('.campaign-card-stagger');
      if (campaignCards.length > 0) {
        gsap.fromTo(
          campaignCards,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: campaignCards[0].parentElement || campaignCards[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 5. Archival Parallax Background Layers in other sections
      const parallaxLayers = document.querySelectorAll('.archival-parallax-bg');
      parallaxLayers.forEach((layer) => {
        gsap.to(layer, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: layer.parentElement || layer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // 6. Number Counter Animation for 4 Hero Stats
      const statElements = document.querySelectorAll('.stat-counter');
      statElements.forEach((statEl) => {
        const targetVal = statEl.getAttribute('data-target');
        if (targetVal) {
          const num = parseInt(targetVal, 10);
          if (!isNaN(num)) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: num,
              duration: 1.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: statEl,
                start: 'top 98%',
                toggleActions: 'play none none none',
              },
              onUpdate: () => {
                const prefix = statEl.getAttribute('data-prefix') || '';
                const suffix = statEl.getAttribute('data-suffix') || '';
                const formatted = Math.floor(obj.val).toString().padStart(targetVal.length > 1 ? 2 : 1, '0');
                statEl.textContent = `${prefix}${formatted}${suffix}`;
              },
            });
          }
        }
      });
    });

    // Refresh ScrollTrigger after DOM has fully settled
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);
}
