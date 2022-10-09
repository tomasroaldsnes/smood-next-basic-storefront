import React, {
  CSSProperties,
  DetailedHTMLProps,
  FC,
  HtmlHTMLAttributes,
} from 'react'
import { Container } from '@components/ui'
import { useState, useEffect } from 'react'
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
  cta?: string
  link?: string
}

const Hero: FC<Props> = ({
  title,
  description,
  image,
  customStyle,
  cta,
  link,
}) => {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [width])

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset)
    // clean up code
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-accent-0" style={customStyle}>
      <Container>
        <div className={s.root}>
          <div className={s.content}>
            <h2 className={s.title}>{title}</h2>
            <div className={s.description}>
              <p>{description}</p>
            </div>
            {cta && width > 720 && (
              <Button width={320} variant="flat">
                {cta}
              </Button>
            )}
          </div>
          <div className={s.image}>
            <Image
              src={image || '/images/gameboy.png'}
              alt="Hero title"
              layout="fill"
              objectFit="cover"
            />
          </div>
          {cta && width < 720 && <Button variant="ghost">{cta}</Button>}
        </div>
        {offset < 24 && (
          <div className={s.down}>
            <Image
              src={'/images/icons/down.svg'}
              alt="Hero title"
              width={32}
              height={32}
            />
          </div>
        )}
      </Container>
    </div>
  )
}

export default Hero
