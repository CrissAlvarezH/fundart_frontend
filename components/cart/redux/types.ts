

export interface PhoneBrandRef {
    id: number
    name: string
    brand: string
}

export interface Discount {
    id: number
    name: string
    rate: number
    valid_until: string
}

export interface PhoneCase {
    id: number
    price: number
    sale_price: number
    discount?: Discount
    inventory_status: string
    phone_brand_ref: PhoneBrandRef
    case_type: string
    case_scaffold_img: string
    is_active: boolean
}

export type ImagePhoneCaseId = number

export interface ImagePhoneCase {
    id: ImagePhoneCaseId
    thumbnail: string
    image_preview: string
    image: number
    image_description: string
    phone_case: PhoneCase
    tags: string[]
}

export interface CartProduct {
    imagePhoneCase: ImagePhoneCase
    quantity: number
}
