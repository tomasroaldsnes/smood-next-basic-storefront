export interface Data {
    id: number
    attributes: Attributes
}

interface Attributes {
    description: string
    Hero: HeroType
    Content: Array<ContentType>
    UserReview: UserReviewType
}

interface ImageData {
    id: number
    attributes: {
        name: string
        alternativeText: string
        caption: string
        width: number
        height: number
        url: string
    }
}

export interface HeroType {
    title: string
    description: string
    style: string
    differentImageOnDesktop: boolean
    placeholder: {
        data: ImageData
    };
    cta: string
    link: string
    image: {
        data: ImageData
    };
}

export interface ContentType {
    id?: number
    title: string
    description: string
    theme: "light" | "dark"
    mediaType: "image" | "video"
    mediaSize: "sm" | "md" | "lg"
    differentImageOnDesktop: boolean
    cta: string
    link: string
    media: {
        data: ImageData
    };
}
export interface UserReviewType {
    id?: number
    title: string
    description: string
    theme: "light" | "dark"
    mediaSize: "sm" | "md" | "lg"
    Review: Array<Review>
}
export interface Review {
    id: number
	product: string
	description: string
	productLink: string
    video: {
        data: ImageData
    }
}
