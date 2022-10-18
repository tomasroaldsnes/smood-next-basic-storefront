import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import ProductTag from '../SmoodProductTag'
import Swatch from '../Swatch'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
  className?: string
  product: Product
  theme?: 'light' | 'dark'
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  theme = 'light',
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.light]: theme === 'light', [s.dark]: theme === 'dark' },
    /* { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' }, */
    className
  )
  console.log(product)
  return (
    <>
      <Link href={`/product/${product.slug}`}>
        <a className={rootClassName} aria-label={product.name}>
          {variant === 'default' && (
            <>
              {process.env.COMMERCE_WISHLIST_ENABLED && (
                <WishlistButton
                  className={s.wishlistButton}
                  productId={product.id}
                  variant={product.variants[0] as any}
                />
              )}
              <ProductTag name={product.name} price={`${price}`} />
              <Swiper
                slidesPerView={1}
                pagination={{
                  dynamicBullets: true,
                }}
                effect={'slide'}
                modules={[Pagination]}
                className="mySwiper"
              >
                {product.images.map((image) => (
                  <SwiperSlide>
                    <div className={s.imageContainer}>
                      <div>
                        <Image
                          alt={product.name || 'Product Image'}
                          className={s.productImage}
                          src={image?.url || placeholderImg}
                          height={540}
                          width={540}
                          quality="85"
                          layout="responsive"
                          {...imgProps}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
          <div className="flex flex-row gap-2 px-3 py-2 mt-3">
            {product.options
              .find((opt) => opt.displayName === 'color')
              ?.values.map((v) => (
                <span
                  className="w-3 h-3 border-[1px] border-accent-9 rounded-full"
                  style={{ backgroundColor: v.hexColors ? v.hexColors[0] : '' }}
                ></span>
              ))}
          </div>
        </a>
      </Link>
    </>
  )
}

export default ProductCard
