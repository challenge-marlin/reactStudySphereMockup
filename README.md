# React Study Sphere Mockup

階層管理対応学習システムのモックアップアプリケーションです。

[モックアップはこちら](https://challenge-marlin.github.io/reactStudySphereMockup/)

## 概要

このプロジェクトは、就労移行支援事業所向けの学習管理システム（LMS：Learning Management System）のフロントエンド部分のモックアップです。
管理者、指導員、生徒の3つの役割に対応した階層管理システムを提供します。

## 重要な注意事項

⚠️ **このプロジェクトはフロントエンドのモックアップのみです**

- バックエンドAPI（サーバーサイド）の実装は含まれていません
- データの永続化機能はありません
- 実際の認証機能はありません
- すべてのデータはモックデータ（ダミーデータ）です

## システム階層構造

```
管理者
└── 事業所（就労移行支援事業所等）
    └── 拠点（東京本校、大阪支校等）
        └── 指導員（同一拠点内で生徒を共有管理）
            └── 生徒
```

## ユーザー種別と機能

### 管理者機能
- **システム概要**: 全体統計の閲覧
- **事業所・拠点管理**: 事業所と拠点の追加・管理
- **指導員管理**: 指導員の追加・管理・有効無効化
- **全生徒閲覧**: システム内全生徒の状況確認
- **コース管理**: システム全体のコース管理
- **管理者管理**: 個別の管理者アカウントの追加・編集・操作ログ管理

### 指導員機能
- **クラス概要**: 担当クラスの統計確認
- **生徒管理**: 
  - 自分の生徒の追加・管理
  - 同一拠点の他の指導員の生徒も管理可能
  - 生徒用ログインURL生成・管理
- **学習進捗管理**: 生徒の進捗確認・指導
- **課題管理**: 課題設定・評価

### 生徒機能
- **学習ダッシュボード**: 自分の学習状況確認
- **コース学習**: 割り当てられたコースの受講
- **学習目標設定**: 個人目標の設定・管理
- **実績確認**: 学習実績とバッジの表示

## 技術スタック

- **フロントエンド**: React 18
- **ルーティング**: React Router v6
- **スタイリング**: CSS3
- **テスト**: Jest, React Testing Library

## セットアップ

### 前提条件
- Node.js (v16以上推奨)
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start
```

ブラウザで `http://localhost:3000` を開いてアプリケーションを確認できます。

## プロジェクト構造

```
src/
├── components/          # 再利用可能なコンポーネント
├── pages/              # ページコンポーネント
├── hooks/              # カスタムフック
├── utils/              # ユーティリティ関数
├── styles/             # スタイルファイル
└── data/               # モックデータ
```

## 開発について

このモックアップは学習システムのUIUXを検証するためのものです。
実際のシステムを構築する際は、以下の要素を別途実装する必要があります：

- **バックエンドAPI**（認証、データ管理、進捗管理など）
- **データベース**（ユーザー情報、コース情報、学習データなど）
- **セキュリティ機能**（認証、認可、データ保護など）

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。 



## デモアカウント

### 管理者ログイン
- **URL**: http://localhost:3000/
- **ID**: admin001
- **パスワード**: admin123

**新しい管理者アカウント機能**:
- 管理者ダッシュボードの「管理者管理」タブから新しい管理者アカウントを追加可能
- 各管理者の操作ログが自動的に記録されます
- 利用期間でアカウントの有効性を管理（削除ではなく期間で制御）

### 指導員ログイン
- **URL**: http://localhost:3000/
- **ID**: instructor001 / instructor002 / instructor003
- **パスワード**: instructor123 / instructor456 / instructor789
- **所属**:
  - instructor001, instructor002: スタディスフィア東京校 - 東京本校
  - instructor003: スタディスフィア大阪校 - 大阪支校

### 生徒ログイン（トークンベース）
- https://challenge-marlin.github.io/reactStudySphereMockup/student/login/token123
- https://challenge-marlin.github.io/reactStudySphereMockup/student/login/token456
- https://challenge-marlin.github.io/reactStudySphereMockup/student/login/token789
- https://challenge-marlin.github.io/reactStudySphereMockup/student/login/token101

## 特徴

### 拠点間生徒管理
- 同一拠点の指導員同士は互いの生徒を管理可能
- 異なる拠点の生徒は閲覧・管理不可
- 管理者のみ全拠点の情報を閲覧可能