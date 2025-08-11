<!-- @format -->

# Firestore 設計

- [collections](#collections)
  - [items](#items)
- [users](#users)

## collections

- createdAt: Timestamp 作成日時
- description: String コレクションの説明
- itemCount: Number コレクションにあるアイテム数
- name: String コレクション名
- updatedAt: Timestamp 更新日時

## items

- createdAt: Timestamp 作成日時
- imageUrl: String アイテムの画像のURL
- note: String マークダウンで書いた説明
- order: Number コレクション内での順番
- title: String タイトル
- url: String アイテムのURL（Amazonや商品のURLなど）
- updatedAt: Timestamp 更新日時

## users

- createdAt: Timestamp 作成日時
- displayName: String 表示名
- email: String メールアドレス
- profileImageUrl: String プロフィール画像のURL
- updatedAt: Timestamp 更新日時
- username: String ユーザーID