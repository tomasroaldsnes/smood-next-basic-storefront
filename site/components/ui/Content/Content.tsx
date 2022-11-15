import React, { FC } from 'react'
import { Container, Button } from '@components/ui'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import cn from 'clsx'
import Link from 'next/link'

interface Props {
  title?: string
  description?: string
  mediaUrl?: string
  reverse?: boolean
  mediaType?: 'image' | 'video'
  mediaSize?: 'sm' | 'md' | 'lg'
  theme?: 'dark' | 'light'
  cta?: string
  link?: string
}

const Content: FC<Props> = ({
  title,
  description,
  mediaUrl,
  reverse = false,
  mediaSize = 'sm',
  mediaType = 'image',
  theme = 'light',
  cta,
  link,
}) => {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [width])

  return (
    <div
      className={cn(
        'md:flex md:flex-row',
        reverse ? 'lg:flex-row-reverse' : '',
        theme === 'dark' ? 'bg-accent-8' : 'bg-accent-0'
      )}
    >
      {mediaUrl && (
        <div
          className={cn(
            'relative w-full',
            mediaSize === 'sm'
              ? 'h-[30vh]'
              : mediaSize === 'md'
              ? 'h-[40vh]'
              : mediaSize === 'lg'
              ? 'h-[60vh]'
              : '',
            'md:h-[632px]'
          )}
        >
          {mediaType === 'image' ? (
            <Image
              src={mediaUrl || '/images/game-1.jpg'}
              alt="Hero title"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <video
              src={
                mediaUrl ||
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
              }
              controls={false}
              autoPlay
              loop
              muted
              playsInline
              className={'h-full w-full object-cover'}
            />
          )}
        </div>
      )}
      <Container>
        <div
          className={cn(
            'flex flex-col gap-4 md:py-32 mx-auto md:ml-6',
            mediaUrl ? 'py-16' : 'py-12'
          )}
        >
          <h2
            className={cn(
              'font-extrabold text-4xl leading-none tracking-tight md:text-6xl md:max-w-xl md:text-left lg:-mt-3',
              theme === 'dark' ? 'text-accent-1' : 'text-accent-9'
            )}
          >
            {title}
          </h2>
          <div
            className={cn(
              'mt-4 text-xl leading-8 text-accent-7 mb-4 lg:max-w-4xl',
              theme === 'dark' ? 'text-accent-2' : 'text-accent-7'
            )}
          >
            <p>{description}</p>
          </div>
          {cta && link && (
            <Button
              className="md:max-w-sm"
              variant={theme === 'dark' ? 'ghost' : 'ghost'}
            >
              {cta}
            </Button>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Content
