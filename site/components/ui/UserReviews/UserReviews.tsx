import React, { FC } from 'react'
import { Container } from '@components/ui'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import styles from './UserReviews.module.css'
import ReactPlayer from 'react-player'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import Button from '@components/ui/Button'
import cn from 'clsx'
import Link from 'next/link'

const reviews = [
  {
    video: '/videos/user1.mp4',
    product: 'Canon R6',
    description: 'Our best allrounder',
  },
  {
    video: '/videos/review1.mp4',
    product: 'Canon R5',
    description: 'Our best allrounder',
  },
  {
    video: '/videos/user3.mp4',
    product: 'Canon R5',
    description: 'Our best allrounder',
  },
]

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

const UserReviews: FC<Props> = ({
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

  const [isMuted, setIsMuted] = useState(true)

  return (
    <div
      className={cn(
        'md:flex md:flex-row',
        theme === 'dark' ? 'bg-accent-0' : 'bg-accent-8'
      )}
    >
      <Container>
        <div
          className={
            'flex flex-col justify-center gap-4 py-8 md:py-32 mx-auto md:ml-6'
          }
        >
          <h2
            className={cn(
              'font-bold text-center text-4xl leading-snug tracking-tight md:text-6xl md:max-w-xl md:text-left -mt-3',
              theme === 'dark' ? 'text-accent-9' : 'text-accent-1'
            )}
          >
            {title}
          </h2>
          <div
            className={cn(
              'mt-4 text-xl text-center leading-8 text-accent-7 mb-4 lg:max-w-4xl lg:text-left',
              theme === 'dark' ? 'text-accent-7' : 'text-accent-2'
            )}
          >
            <p>{description}</p>
          </div>
        </div>
      </Container>
      <>
        <Swiper
          navigation={true}
          slidesPerView={1}
          autoHeight={true}
          effect={'fade'}
          fadeEffect={{
            crossFade: true,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <div
                  className={cn(
                    'relative w-full',
                    mediaSize === 'sm'
                      ? 'h-[30vh]'
                      : mediaSize === 'md'
                      ? 'h-[40vh]'
                      : mediaSize === 'lg'
                      ? 'h-[70vh]'
                      : '',
                    'lg:h-[60vh]'
                  )}
                >
                  <ReactPlayer
                    url={
                      review.video ||
                      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                    }
                    muted={isMuted || !isActive}
                    playing={isActive}
                    autoPlay={isActive}
                    loop={isActive}
                    controls={false}
                    playsInline={isActive}
                    height={'100%'}
                    width={'100%'}
                    className={'h-full w-full object-cover'}
                  />
                  <button
                    className={
                      'absolute w-12 h-12 left-4 bottom-[108px] bg-accent-0 opacity-70 p-3 rounded-md'
                    }
                    onClick={() => {
                      setIsMuted(!isMuted)
                    }}
                  >
                    <img
                      width={48}
                      height={48}
                      src={
                        isMuted
                          ? '/images/icons/volume-off.svg'
                          : '/images/icons/volume-on.svg'
                      }
                    />
                  </button>
                  <div className={styles.product}>
                    <span>
                      <strong>{review.product}</strong>
                      <p>{review.description}</p>
                    </span>
                    <Button
                      variant="slim"
                      style={{ paddingLeft: '1.5em', paddingRight: '1.5em' }}
                    >
                      See product
                    </Button>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  )
}

export default UserReviews
