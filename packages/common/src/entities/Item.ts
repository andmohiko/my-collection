import type { FieldValue } from 'firebase/firestore'
import type { DocId } from './Auth'

export const itemCollection = 'items'

export type ItemId = DocId

export type Item = {
  id: ItemId
  createdAt: Date
  imageUrl: string
  note: string
  order: number
  title: string
  url: string
  updatedAt: Date
}

export type CreateItemDto = Omit<Item, 'id' | 'createdAt' | 'updatedAt'> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type UpdateItemDto = {
  imageUrl?: Item['imageUrl']
  note?: Item['note']
  order?: Item['order']
  title?: Item['title']
  url?: Item['url']
  updatedAt: FieldValue
}
