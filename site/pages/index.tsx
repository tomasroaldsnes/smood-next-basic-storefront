import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { SmoodProductCard } from '@components/product'
import {
  Grid,
  HeroImage,
  Content,
  UserReviews,
  CollectionSlider,
  Container,
} from '@components/ui'
import { Data, HeroType, ContentType, UserReviewType } from 'types'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.API_CMS_URL
    : process.env.LOCALHOST_CMS_URL

const cms_bearer = process.env.CMS_BEARER_TOKEN || ''

let _headers: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${cms_bearer}`,
}

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
  })

  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const [...productDetails] = await Promise.all(
    products.map((product) =>
      commerce.getProduct({
        variables: { slug: product!.slug || '' },
        config,
        preview,
      })
    )
  )
  /*  const homepage_res = await fetch(`${baseUrl}/api/homepage?populate=deep,10`, {
    headers: _headers,
  })
  const { homepage } = await homepage_res.json() */
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      //homepage,
      products,
      productDetails,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  //homepage,
  products,
  productDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  //console.log(homepage)
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
        title="Free shipping available.
        100 day free returns.
        Limited lifetime warranty."
        description="We're passionate about our products and want you to be as well. If you buy one and it's not for you, you can return it with full refund."
        mediaSize="md"
        mediaUrl="/images/camera4.jpg"
        theme="dark"
        mediaType="image"
      />
      <Content
        title="Our best sellers"
        description="The most popular cameras for every adventure."
      />
      <Grid layout="products" variant="default">
        {productDetails.slice(0, 4).map((p: any, i: number) => (
          <SmoodProductCard
            key={p.product.id}
            product={p.product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid>
      <CollectionSlider />
      {/* <UserReviews
        title="Reviews"
        description="See what customers are saying about our products."
        mediaSize="lg"
        theme="dark"
      /> */}
      <Content
        title="Free shipping available.
        100 day free returns.
        Limited lifetime warranty."
        description="We're passionate about our products and want you to be as well. If you buy one and it's not for you, you can return it with full refund."
        mediaSize="md"
        mediaUrl="/images/camera4.jpg"
        theme="dark"
        mediaType="image"
      />
    </>
  )
}

Home.Layout = Layout
