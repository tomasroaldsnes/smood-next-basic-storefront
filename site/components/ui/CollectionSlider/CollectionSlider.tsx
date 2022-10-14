import React, { FC } from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from '@components/ui/Button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'

interface Categories {
  name: string
  path: string
  cta: string
  imageUrl: string
}

interface Props {
  collections?: Array<Categories>
}

const _collections: Array<Categories> = [
  {
    name: 'Popular',
    path: '/most-popular',
    cta: 'See collection',
    imageUrl: '/images/camera2.jpg',
  },
  {
    name: 'Wilds',
    path: '/most-popular',
    cta: 'See collection',
    imageUrl: '/images/camera7.jpg',
  },
  {
    name: 'Beginner',
    path: '/most-popular',
    cta: 'See collection',
    imageUrl: '/images/camera8.jpg',
  },
]

const CollectionSlider: FC<Props> = ({ collections }) => {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [width])

  return (
    <Swiper
      slidesPerView={width > 720 ? 3 : 1.2}
      freeMode={true}
      effect={'slide'}
      modules={[FreeMode]}
      className="mySwiper"
    >
      {_collections.map((collection, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col relative h-[50vh] lg:h-[70vh] w-full justify-center items-center">
            <Image
              priority
              src={collection.imageUrl || '/images/camera2.jpg'}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={collection.name}
            />
            <div className="flex flex-col gap-5 justify-center items-left z-10 absolute left-4 bottom-8 lg:left-12 lg:bottom-16 lg:gap-8">
              <p className="font-bold text-3xl text-accent-0 leading-none text-left lg:text-4xl">
                {collection.name}
              </p>
              <Button
                href={collection.path}
                width={180}
                theme="light"
                variant="outlineSlim"
              >
                {collection.cta}
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CollectionSlider
