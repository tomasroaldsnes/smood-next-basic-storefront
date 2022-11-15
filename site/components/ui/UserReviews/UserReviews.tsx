import React, { FC } from 'react'
import { Review } from 'types'
import { Container } from '@components/ui'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import styles from './UserReviews.module.css'
import ReactPlayer from 'react-player'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Button from 'components/ui/Button'
import cn from 'clsx'

interface Props {
  title?: string
  description?: string
  mediaSize?: 'sm' | 'md' | 'lg'
  theme?: 'dark' | 'light'
  reviews: Array<Review>
}

const UserReviews: FC<Props> = ({
  title,
  description,
  mediaSize = 'sm',
  theme = 'light',
  reviews,
}) => {
  const [isMuted, setIsMuted] = useState(true)
  return (
    <div
      className={cn(
        'md:flex md:flex-row',
        theme === 'dark' ? 'bg-accent-8' : 'bg-accent-0'
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
              theme === 'dark' ? 'text-accent-1' : 'text-accent-9'
            )}
          >
            {title}
          </h2>
          <div
            className={cn(
              'mt-4 text-xl text-center leading-8 text-accent-7 mb-4 lg:max-w-4xl lg:text-left',
              theme === 'dark' ? 'text-accent-2' : 'text-accent-7'
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
          {reviews.length > 0 &&
            reviews.map((review) => (
              <SwiperSlide key={review.id}>
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
                    {
                      <ReactPlayer
                        url={review.video.data.attributes.url}
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
                    }
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
                        <strong className="text-accent-1">
                          {review?.product}
                        </strong>
                        <p className="text-accent-1">{review?.description}</p>
                      </span>
                      {
                        <Button
                          variant="slim"
                          href={review.productLink}
                          style={{
                            paddingLeft: '1.5em',
                            paddingRight: '1.5em',
                          }}
                        >
                          See product
                        </Button>
                      }
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
