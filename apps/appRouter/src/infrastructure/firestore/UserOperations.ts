import type { CreateUserDto, Uid, User } from '@mycollection/common'
import { userCollection } from '@mycollection/common'
import type { DocumentData, Unsubscribe } from 'firebase/firestore'
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

export const dateColumns = [
  'createdAt',
  'updatedAt',
] as const satisfies Array<string>

const convertUserFromData = (id: string, data: DocumentData): User => {
  return {
    id,
    ...convertDate(data, dateColumns),
  } as User
}

export const subscribeUserByIdOperation = (
  userId: Uid,
  setter: (user: User | null) => void,
): Unsubscribe => {
  const unsubscribe = onSnapshot(
    doc(db, userCollection, userId),
    (snapshot) => {
      const data = snapshot.data()
      if (!data) {
        return null
      }
      const user = convertUserFromData(snapshot.id, data)
      setter(user)
    },
  )
  return unsubscribe
}

export const fetchUserByIdOperation = async (
  userId: Uid,
): Promise<User | null> => {
  const snapshot = await getDoc(doc(db, userCollection, userId))
  const data = snapshot.data()
  if (!data) {
    return null
  }
  return convertUserFromData(snapshot.id, data)
}

export const createUserOperation = async (
  uid: Uid,
  dto: CreateUserDto,
): Promise<void> => {
  await setDoc(doc(db, userCollection, uid), dto)
}

export const isExistsUserOperation = async (uid: Uid): Promise<boolean> => {
  const snapshot = await getDoc(doc(db, userCollection, uid))
  return snapshot.exists()
}
