import type {
  CreateItemDto,
  Item,
  ItemId,
  UpdateItemDto,
} from '@mycollection/common'
import { itemCollection } from '@mycollection/common'
import type { DocumentData, Unsubscribe } from 'firebase/firestore'
import {
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
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

export const subscribeItemByIdOperation = (
  itemId: ItemId,
  setter: (item: Item | null) => void,
): Unsubscribe => {
  const unsubscribe = onSnapshot(
    doc(db, itemCollection, itemId),
    (snapshot) => {
      const data = snapshot.data()
      if (!data) {
        return null
      }
      const item = convertItemFromData(snapshot.id, data)
      setter(item)
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
  itemId: ItemId,
  dto: CreateItemDto,
): Promise<void> => {
  await setDoc(doc(db, itemCollection, itemId), dto)
}

export const updateItemOperation = async (
  itemId: ItemId,
  dto: UpdateItemDto,
): Promise<void> => {
  await updateDoc(doc(db, itemCollection, itemId), dto)
}

export const deleteItemOperation = async (itemId: ItemId): Promise<void> => {
  await deleteDoc(doc(db, itemCollection, itemId))
}
