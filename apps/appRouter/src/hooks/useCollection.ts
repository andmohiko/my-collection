import type { Collection, CollectionId, Item } from '@mycollection/common'
import { useEffect, useState } from 'react'
import { subscribeCollectionByIdOperation } from '~/infrastructure/firestore/CollectionOperations'
import { subscribeItemsByCollectionIdOperation } from '~/infrastructure/firestore/ItemOperations'

export const useCollection = (
  collectionId: CollectionId,
): {
  collection: Collection | null | undefined
  items: Item[]
  isLoading: boolean
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [collection, setCollection] = useState<Collection | null | undefined>(
    undefined,
  )
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    setIsLoading(true)
    const unsubscribeCollection = subscribeCollectionByIdOperation(
      collectionId,
      setCollection,
      setIsLoading,
    )
    const unsubscribeItems = subscribeItemsByCollectionIdOperation(
      collectionId,
      setItems,
    )
    return () => {
      unsubscribeCollection()
      unsubscribeItems()
    }
  }, [collectionId])

  return {
    collection,
    items,
    isLoading,
  }
}
