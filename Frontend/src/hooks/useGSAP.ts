
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useGSAP = () => {
  const ref = useRef<HTMLElement>(null);

  const fadeIn = (element: HTMLElement, delay = 0, duration = 0.8) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration, delay, ease: "power2.out" }
    );
  };

  const slideIn = (element: HTMLElement, direction = 'left', delay = 0, duration = 0.8) => {
    const startX = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
    const startY = direction === 'up' ? -100 : direction === 'down' ? 100 : 0;
    
    gsap.fromTo(element,
      { opacity: 0, x: startX, y: startY },
      { opacity: 1, x: 0, y: 0, duration, delay, ease: "power2.out" }
    );
  };

  const bounceIn = (element: HTMLElement, delay = 0, duration = 0.8) => {
    gsap.fromTo(element,
      { opacity: 0, scale: 0.3 },
      { opacity: 1, scale: 1, duration, delay, ease: "back.out(1.7)" }
    );
  };

  const floatAnimation = (element: HTMLElement) => {
    gsap.to(element, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  };

  const rotateAnimation = (element: HTMLElement) => {
    gsap.to(element, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "none"
    });
  };

  return {
    ref,
    fadeIn,
    slideIn,
    bounceIn,
    floatAnimation,
    rotateAnimation
  };
};
