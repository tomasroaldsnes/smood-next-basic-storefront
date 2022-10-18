import React, {
  CSSProperties,
  DetailedHTMLProps,
  FC,
  HtmlHTMLAttributes,
} from 'react'
import { Container } from '@components/ui'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ArrowRight } from '@components/icons'
import Button from '@components/ui/Button'
import cn from 'clsx'
import s from './Hero.module.css'
import Link from 'next/link'

interface Props {
  title?: string
  description?: string
  customStyle?: React.CSSProperties
  image?: string
  imageDesktop?: string
  blurPlaceholder?: string
  blurPlaceholderDesktop?: string
  differentOnDesktop?: boolean
  cta?: string
  link?: string
}

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`)
    media.addListener(updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true)
    }

    return () => media.removeListener(updateTarget)
  }, [])

  return targetReached
}

const HeroImage: FC<Props> = ({
  title,
  image,
  differentOnDesktop = false,
  blurPlaceholder,
  imageDesktop,
  blurPlaceholderDesktop,
  cta,
  link,
}) => {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [width])

  const isBreakpoint = useMediaQuery(768)
  return (
    <div className="flex flex-col -mt-[74px] relative h-[80vh] w-screen justify-center items-center background bg-cover">
      {!differentOnDesktop && (
        <Image
          priority
          src={image || '/images/camera1.jpg'}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={title}
          placeholder="blur"
          blurDataURL={blurPlaceholder}
        />
      )}
      {differentOnDesktop && isBreakpoint && (
        <Image
          priority
          src={image || '/images/camera1.jpg'}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={title}
          placeholder="blur"
          blurDataURL={blurPlaceholder}
        />
      )}
      {differentOnDesktop && !isBreakpoint && (
        <Image
          priority
          src={imageDesktop || '/images/camera1.jpg'}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={title}
          placeholder="blur"
          blurDataURL={blurPlaceholderDesktop}
        />
      )}
      <div className="flex flex-col gap-5 justify-center items-left z-10 absolute left-4 bottom-8 lg:left-12 lg:bottom-16 lg:gap-8">
        <p className="font-bold text-3xl text-accent-1 leading-none text-left lg:text-6xl">
          {title}
        </p>
        <Button theme="light" variant="outlineSlim">
          {cta}
        </Button>
      </div>
    </div>
  )
}

export default HeroImage
