import { HeroImage, Content, UserReviews } from '@components/ui'
import { Layout } from '@components/common'
import React from 'react'
import { Data, HeroType, ContentType, UserReviewType } from 'types'

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

export async function getStaticPaths() {
  const res = await fetch(`${baseUrl}/api/campaigns`, { headers: _headers })
  const campaigns = await res.json()

  const paths = campaigns.data.map((campaign: Data) => ({
    params: {
      id: campaign.id.toString(),
    },
  }))

  return { paths, fallback: false }
}

interface Params {
  params: {
    id: string
  }
}

export async function getStaticProps({ params }: Params) {
  const res = await fetch(
    `${baseUrl}/api/campaigns/${params.id}?populate=deep,10`,
    { headers: _headers }
  )
  const { data } = await res.json()

  return {
    props: {
      data,
    },
  }
}

interface Props {
  data: Data
}

export default function Campaign({ data }: Props) {
  const hero: HeroType = data?.attributes?.Hero
  const content: Array<ContentType> = data?.attributes?.Content
  const userReviews: UserReviewType = data?.attributes?.UserReview
  return (
    <>
      {hero && (
        <HeroImage
          title={hero.title}
          image={hero.image.data.attributes.url}
          blurPlaceholder={hero.placeholder.data.attributes.url}
          link={hero.link}
          cta={hero.cta}
        />
      )}

      {content.length > 0 &&
        content.map((c, index) => (
          <Content
            key={c.id || index}
            title={c.title}
            description={c.description}
            mediaSize={c.mediaSize}
            mediaUrl={c.media.data.attributes.url}
            mediaType={c.mediaType}
            theme={c.theme}
            reverse={index % 2 == 1}
            cta={c.cta}
            link={c.link}
          />
        ))}

      {userReviews && (
        <UserReviews
          title={userReviews.title}
          description={userReviews.description}
          mediaSize={userReviews.mediaSize}
          theme={userReviews.theme}
          reviews={userReviews.Review}
        />
      )}
    </>
  )
}

Campaign.Layout = Layout
