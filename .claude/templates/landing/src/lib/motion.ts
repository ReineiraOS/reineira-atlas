import type { Variants, Transition } from 'framer-motion'
import { EDITORIAL } from '@/content/directions'

const EASE = EDITORIAL.motionEase
const DURATION = EDITORIAL.motionDuration

export const MOTION = {
  duration: DURATION,
  ease: EASE,
  viewportMarginPx: EDITORIAL.viewportMarginPx,

  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: DURATION, ease: EASE } },
  } satisfies Variants,

  fadeSlideUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
  } satisfies Variants,

  staggerContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
  } satisfies Variants,

  staggerItem: {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  } satisfies Variants,

  textRevealContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  } satisfies Variants,

  textRevealWord: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  } satisfies Variants,
}

export function getStaggerTransition(delay = 0.07): Transition {
  return {
    duration: DURATION,
    ease: EASE as unknown as Transition['ease'],
    staggerChildren: delay,
  }
}

export function viewportOnce(marginPx?: number) {
  const value = marginPx ?? MOTION.viewportMarginPx
  return { once: true, margin: `${value}px` as `${number}px` }
}
