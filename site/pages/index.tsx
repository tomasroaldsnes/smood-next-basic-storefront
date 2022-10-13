import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import {
  Grid,
  Marquee,
  Hero,
  HeroImage,
  Content,
  UserReviews,
  CollectionSlider,
} from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(categories)
  return (
    <>
      <HeroImage
        title="Snap. Shot. Drop."
        image="/images/camera2.jpg"
        blurPlaceholder="/images/camera2.jpg"
        imageDesktop="/images/camera3.jpg"
        blurPlaceholderDesktop="/images/camera3.jpg"
        cta="See products"
      />
      <Content
        title="We used to hate shaving too"
        description="But now we dont. Get the super bladed something now."
        mediaSize="md"
        theme="light"
        mediaUrl="/images/game-2.jpg"
        mediaType="image"
        cta="Purchase now"
      />
      <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid>
      <Content
        title="We used to hate shaving too"
        description="But now we dont. Get the super bladed something now."
        mediaSize="md"
        theme="dark"
        mediaType="video"
        cta="Purchase now"
      />
      <CollectionSlider />
      <UserReviews
        title="Reviews"
        description="See what customers are saying about our products."
        mediaSize="lg"
        theme="dark"
      />
      <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout
