import React, { FC } from 'react'
import { Container } from '@components/ui'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight } from '@components/icons'
import Button from '@components/ui/Button'
import cn from 'clsx'
import Link from 'next/link'

interface Props {
  title?: string
  description?: string
  mediaUrl?: string
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
  mediaSize = 'sm',
  mediaType = 'image',
  theme = 'light',
  cta = 'Click me',
  link = '#',
}) => {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [width])

  return (
    <div
      className={cn(
        'md:flex md:flex-row',
        theme === 'dark' ? 'bg-accent-0' : 'bg-accent-8'
      )}
    >
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
          'md:h-auto'
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
            muted
            className={'h-full w-full object-cover'}
          />
        )}
      </div>
      <Container>
        <div className={'flex flex-col gap-4 py-16 md:py-32 mx-auto md:ml-2'}>
          <h2
            className={cn(
              'font-extrabold text-4xl leading-none tracking-tight md:text-6xl md:max-w-xl md:text-left -mt-3',
              theme === 'dark' ? 'text-accent-9' : 'text-accent-1'
            )}
          >
            {title}
          </h2>
          <div
            className={cn(
              'mt-4 text-xl leading-8 text-accent-7 mb-4 lg:max-w-4xl',
              theme === 'dark' ? 'text-accent-7' : 'text-accent-2'
            )}
          >
            <p>{description}</p>
          </div>
          {cta && link && (
            <Button
              className="md:max-w-sm"
              variant={theme === 'dark' ? 'flat' : 'ghost'}
            >
              Click me
            </Button>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Content
