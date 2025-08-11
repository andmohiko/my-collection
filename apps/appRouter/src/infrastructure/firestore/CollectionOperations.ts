import type {
  Collection,
  CollectionId,
  CreateCollectionDto,
  UpdateCollectionDto,
} from '@mycollection/common'
import { collectionCollection } from '@mycollection/common'
import type { DocumentData, Unsubscribe } from 'firebase/firestore'
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

export const dateColumns = [
  'createdAt',
  'updatedAt',
] as const satisfies Array<string>

const convertCollectionFromData = (
  id: string,
  data: DocumentData,
): Collection => {
  return {
    id,
    ...convertDate(data, dateColumns),
  } as Collection
}

export const subscribeCollectionByIdOperation = (
  collectionId: CollectionId,
  setter: (collection: Collection | null) => void,
): Unsubscribe => {
  const unsubscribe = onSnapshot(
    doc(db, collectionCollection, collectionId),
    (snapshot) => {
      const data = snapshot.data()
      if (!data) {
        return null
      }
      const collection = convertCollectionFromData(snapshot.id, data)
      setter(collection)
    },
  )
  return unsubscribe
}

export const fetchCollectionByIdOperation = async (
  collectionId: CollectionId,
): Promise<Collection | null> => {
  const snapshot = await getDoc(doc(db, collectionCollection, collectionId))
  const data = snapshot.data()
  if (!data) {
    return null
  }
  return convertCollectionFromData(snapshot.id, data)
}

export const createCollectionOperation = async (
  collectionId: CollectionId,
  dto: CreateCollectionDto,
): Promise<void> => {
  await setDoc(doc(db, collectionCollection, collectionId), dto)
}

export const updateCollectionOperation = async (
  collectionId: CollectionId,
  dto: UpdateCollectionDto,
): Promise<void> => {
  await updateDoc(doc(db, collectionCollection, collectionId), dto)
}
