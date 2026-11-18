export type DiscoveryImage = {
  id: string
  url: string
  isPrimary: boolean
  orderIndex: number
}

export type DiscoveryCategory = {
  id: string
  name: string
  description: string | null
}

export type DiscoveryAuthor = {
  id: string
  name: string
  email: string
}

export type DiscoveryDetailData = {
  id: string
  title: string
  description: string | null
  latitude: number
  longitude: number
  discoveryDate: string
  status: string
  createdAt: string
  categories: DiscoveryCategory[]
  images: DiscoveryImage[]
  user: DiscoveryAuthor
}
