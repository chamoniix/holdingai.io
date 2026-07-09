import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initScrollAnimations = () => {
  // Text stagger reveal
  gsap.utils.toArray('.text-stagger').forEach((container: any) => {
    const lines = container.querySelectorAll('span')
    gsap.fromTo(lines,
      { opacity: 0, y: 60, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
        }
      }
    )
  })
  
  // Image parallax
  gsap.utils.toArray('.parallax-image').forEach((img: any) => {
    gsap.to(img, {
      y: -80,
      scale: 1.1,
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    })
  })
  
  // Progress line
  gsap.utils.toArray('.progress-section').forEach((section: any) => {
    const progress = section.querySelector('.progress-bar')
    gsap.to(progress, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true
      }
    })
  })
}
