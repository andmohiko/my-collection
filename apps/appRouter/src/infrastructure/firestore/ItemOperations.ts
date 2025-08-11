import type {
  CollectionId,
  CreateItemDto,
  Item,
  ItemId,
  UpdateItemDto,
} from '@mycollection/common'
import { collectionCollection, itemCollection } from '@mycollection/common'
import type { DocumentData, Unsubscribe } from 'firebase/firestore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

export const dateColumns = [
  'createdAt',
  'updatedAt',
] as const satisfies Array<string>

const convertItemFromData = (id: string, data: DocumentData): Item => {
  return {
    id,
    ...convertDate(data, dateColumns),
  } as Item
}

export const subscribeItemsByCollectionIdOperation = (
  collectionId: CollectionId,
  setter: (items: Item[]) => void,
): Unsubscribe => {
  const unsubscribe = onSnapshot(
    collection(db, collectionCollection, collectionId, itemCollection),
    (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        const data = doc.data()
        return convertItemFromData(doc.id, data)
      })
      setter(items)
    },
  )
  return unsubscribe
}

export const fetchItemByIdOperation = async (
  itemId: ItemId,
): Promise<Item | null> => {
  const snapshot = await getDoc(doc(db, itemCollection, itemId))
  const data = snapshot.data()
  if (!data) {
    return null
  }
  return convertItemFromData(snapshot.id, data)
}

export const createItemOperation = async (
  collectionId: CollectionId,
  dto: CreateItemDto,
): Promise<void> => {
  await addDoc(
    collection(db, collectionCollection, collectionId, itemCollection),
    dto,
  )
}

export const updateItemOperation = async (
  collectionId: CollectionId,
  itemId: ItemId,
  dto: UpdateItemDto,
): Promise<void> => {
  await updateDoc(
    doc(db, collectionCollection, collectionId, itemCollection, itemId),
    dto,
  )
}

export const deleteItemOperation = async (
  collectionId: CollectionId,
  itemId: ItemId,
): Promise<void> => {
  await deleteDoc(
    doc(db, collectionCollection, collectionId, itemCollection, itemId),
  )
}
