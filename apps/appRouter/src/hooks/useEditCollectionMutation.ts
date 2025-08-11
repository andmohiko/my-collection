import type { CollectionId } from '@mycollection/common'
import {
  createCollectionOperation,
  updateCollectionOperation,
} from '~/infrastructure/firestore/CollectionOperations'
import { serverTimestamp } from '~/lib/firebase'

// TODO: anyをやめる
export const useEditCollectionMutation = () => {
  const createCollection = async (dto: any) => {
    await createCollectionOperation({
      createdAt: serverTimestamp,
      description: dto.description,
      itemCount: 0,
      name: dto.name,
      updatedAt: serverTimestamp,
    })
  }

  const updateCollection = async (collectionId: CollectionId, dto: any) => {
    await updateCollectionOperation(collectionId, {
      description: dto.description,
      name: dto.name,
      updatedAt: serverTimestamp,
    })
  }

  return {
    createCollection,
    updateCollection,
  }
}
