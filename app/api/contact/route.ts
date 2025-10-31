import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, furigana, phone, postalCode, address, email, inquiryType, message } = body

    // バリデーション
    if (!name || !furigana || !phone || !address || !email || !inquiryType || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      )
    }

    // メール設定（環境変数から取得）
    // 実際の運用では .env.local に以下を設定してください：
    // SMTP_HOST=smtp.gmail.com
    // SMTP_PORT=587
    // SMTP_USER=your-email@gmail.com
    // SMTP_PASS=your-app-password
    // CONTACT_EMAIL=contact@your-domain.com

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `【メイプル】お問い合わせ：${inquiryType} - ${name}様`,
      text: `
お問い合わせがありました。

━━━━━━━━━━━━━━━━━━━━━━
■ お名前
${name}

■ フリガナ
${furigana}

■ 電話番号
${phone}

■ 郵便番号
${postalCode || '未入力'}

■ ご住所
${address}

■ メールアドレス
${email}

■ お問合せ項目
${inquiryType}

■ お問合せ内容
${message}
━━━━━━━━━━━━━━━━━━━━━━

このメールは自動送信されています。
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Hiragino Sans', 'Meiryo', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1a5f7a; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #1a5f7a; margin-bottom: 5px; }
    .value { background-color: white; padding: 10px; border-left: 3px solid #4caf50; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>お問い合わせがありました</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">■ お名前</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">■ フリガナ</div>
        <div class="value">${furigana}</div>
      </div>
      <div class="field">
        <div class="label">■ 電話番号</div>
        <div class="value">${phone}</div>
      </div>
      <div class="field">
        <div class="label">■ 郵便番号</div>
        <div class="value">${postalCode || '未入力'}</div>
      </div>
      <div class="field">
        <div class="label">■ ご住所</div>
        <div class="value">${address}</div>
      </div>
      <div class="field">
        <div class="label">■ メールアドレス</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">■ お問合せ項目</div>
        <div class="value">${inquiryType}</div>
      </div>
      <div class="field">
        <div class="label">■ お問合せ内容</div>
        <div class="value">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      このメールは自動送信されています。
    </div>
  </div>
</body>
</html>
      `,
    }

    // 開発環境ではメール送信をスキップ（ログのみ出力）
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('メール送信設定が未設定のため、以下の内容をログに出力します：')
      console.log(mailOptions)

      return NextResponse.json(
        { message: '開発モード：メールはログに出力されました' },
        { status: 200 }
      )
    }

    // メール送信
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'メールが正常に送信されました' },
      { status: 200 }
    )
  } catch (error) {
    console.error('メール送信エラー:', error)
    return NextResponse.json(
      { error: 'メール送信に失敗しました' },
      { status: 500 }
    )
  }
}
