import type { FieldValue } from 'firebase/firestore'
import type { FieldValue as AdminFieldValue } from 'firebase-admin/firestore'
import type { DocId } from './Auth'

export const collectionCollection = 'collections'

export type CollectionId = DocId

export type Collection = {
  id: CollectionId
  createdAt: Date
  description: string
  itemCount: number
  name: string
  updatedAt: Date
}

export type CreateCollectionDto = Omit<
  Collection,
  'id' | 'createdAt' | 'updatedAt'
> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type UpdateCollectionDto = {
  description?: Collection['description']
  name?: Collection['name']
  updatedAt: FieldValue
}

export type UpdateCollectionFromAdminDto = {
  itemCount?: AdminFieldValue
  updatedAt: AdminFieldValue
}
