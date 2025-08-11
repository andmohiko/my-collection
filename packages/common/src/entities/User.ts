import type { FieldValue } from 'firebase/firestore'
import type { DocId } from './Auth'

export const userCollection = 'users'

export type UserId = DocId

export type User = {
  id: UserId
  createdAt: Date
  displayName: string
  email: string
  profileImageUrl: string
  updatedAt: Date
  username: string
}

export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type UpdateUserDto = {
  displayName?: User['displayName']
  email?: User['email']
  profileImageUrl?: User['profileImageUrl']
  username?: User['username']
  updatedAt: FieldValue
}
