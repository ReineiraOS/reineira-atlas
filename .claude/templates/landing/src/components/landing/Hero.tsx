'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { m, useInView, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <section ref={sectionRef} className="relative pt-28 sm:pt-28 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-black">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <m.h1
            className="text-[36px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-semibold text-white leading-[1.12] sm:leading-[1.05] tracking-[-0.035em] mb-6 sm:mb-8"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              ease: 'easeOut',
            }}
          >
            Confidential payments, built to scale.
          </m.h1>

          <m.p
            className="text-[20px] sm:text-[22px] lg:text-[26px] text-white/60 leading-[1.5] mb-10 sm:mb-12 max-w-2xl mx-auto"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              ease: 'easeOut',
            }}
          >
            Accept USDC and USDT payments, confidentially. Non-custodial, compliant, programmable.
          </m.p>

          <m.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              ease: 'easeOut',
            }}
          >
            <a
              href="https://app.privara.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 text-base font-medium rounded-full transition-all hover:opacity-90 cursor-pointer bg-accent-teal text-foreground"
            >
              Start for free
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full whitespace-nowrap transition-colors text-white/70 hover:text-white border border-white/20 hover:border-white/40"
            >
              Contact sales
            </Link>
          </m.div>
        </div>
      </div>
    </section>
  )
}
