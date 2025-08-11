import type { CollectionId, ItemId } from '@mycollection/common'
import {
  createItemOperation,
  deleteItemOperation,
  updateItemOperation,
} from '~/infrastructure/firestore/ItemOperations'
import { serverTimestamp } from '~/lib/firebase'

// TODO: anyをやめる
export const useEditItemMutation = () => {
  const createItem = async (collectionId: CollectionId, dto: any) => {
    await createItemOperation(collectionId, {
      createdAt: serverTimestamp,
      imageUrl: dto.imageUrl,
      note: dto.note,
      order: dto.order,
      title: dto.title,
      url: dto.url,
      updatedAt: serverTimestamp,
    })
  }

  const updateItem = async (
    collectionId: CollectionId,
    itemId: ItemId,
    dto: any,
  ) => {
    await updateItemOperation(collectionId, itemId, {
      imageUrl: dto.imageUrl,
      note: dto.note,
      order: dto.order,
      title: dto.title,
      url: dto.url,
      updatedAt: serverTimestamp,
    })
  }

  const deleteItem = async (collectionId: CollectionId, itemId: ItemId) => {
    await deleteItemOperation(collectionId, itemId)
  }

  return {
    createItem,
    updateItem,
    deleteItem,
  }
}
