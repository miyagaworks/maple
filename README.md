# メイプルのお片付け - ランディングページ

広島の不用品回収・遺品整理・解体前片付け専門のランディングページ

## 技術スタック

- **Next.js 16** - Reactフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **Nodemailer** - メール送信

## 開発環境のセットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```bash
# メール送信設定（Gmailの例）
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@your-domain.com
```

**注意:** Gmailを使用する場合は、アプリパスワードを使用してください。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## ビルドとデプロイ

### 本番用ビルド

```bash
npm run build
```

### 本番サーバーの起動

```bash
npm start
```

## プロジェクト構造

```
maple/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts      # お問い合わせAPI
│   ├── globals.css           # グローバルスタイル
│   ├── layout.tsx            # レイアウト + SEO
│   └── page.tsx              # メインページ
├── components/
│   ├── ContactForm.tsx       # お問い合わせフォーム
│   ├── CTAButton.tsx         # CTAボタン
│   ├── FlowSection.tsx       # 回収の流れ
│   ├── Header.tsx            # ヘッダー
│   ├── HeroSection.tsx       # ヒーローセクション
│   ├── ImagePlaceholder.tsx  # 画像プレースホルダー
│   ├── PricingSection.tsx    # 料金プラン
│   ├── ProblemsSection.tsx   # お悩みセクション
│   ├── ReasonsSection.tsx    # 選ばれる理由
│   ├── ServicesSection.tsx   # サービス一覧
│   └── WarningSection.tsx    # 悪質業者への注意喚起
├── public/
│   └── images/               # 画像ファイル
├── .env.local.example        # 環境変数のサンプル
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 機能

- ✅ レスポンシブデザイン（モバイルファースト）
- ✅ SEO最適化（メタデータ + スキーママークアップ）
- ✅ お問い合わせフォーム（メール送信機能付き）
- ✅ 電話CTAボタン（0120-551-669）
- ✅ スムーズスクロール
- ✅ 固定モバイルCTAボタン

## カラーパレット

- **Primary:** `#1a5f7a` (濃いブルー)
- **Secondary:** `#4caf50` (グリーン)
- **Accent:** `#ff6b35` (オレンジ)

## 画像について

`public/images/` に以下の画像を配置してください：

- `logo.png` - ロゴ
- `keitora.png` - 軽トラック
- `kaitai.jpg` - 解体工事
- `ihinseiri.jpg` - 遺品整理
- `fuyouhin.jpg` - 不用品回収
- `gomiyashiki.jpg` - ごみ屋敷
- `chiiki.jpg` - 地域密着
- `shitauke.jpg` - 下請け不在
- `akutoku.png` - 悪徳業者
- `photowoman.jpg` - 写真を見る女性
- `sofa.png`, `tansu.png`, `tv.png` - 家具家電

画像がない場合はプレースホルダーが表示されます。

## ライセンス

Private - All rights reserved
