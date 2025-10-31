'use client'

import { useState, FormEvent } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    furigana: '',
    phone: '',
    postalCode: '',
    address: '',
    email: '',
    inquiryType: '無料見積もり依頼',
    message: ''
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const titleAnimation = useScrollAnimation(0.1)
  const formAnimation = useScrollAnimation<HTMLFormElement>(0.2)
  const successAnimation = useScrollAnimation(0.2)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('送信に失敗しました')
      }

      setStatus('success')
      setFormData({
        name: '',
        furigana: '',
        phone: '',
        postalCode: '',
        address: '',
        email: '',
        inquiryType: '無料見積もり依頼',
        message: ''
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage('送信に失敗しました。もう一度お試しください。')
    }
  }

  return (
    <section id="contact" className="relative py-16 bg-gradient-to-br from-primary to-primary-dark text-white" style={{ backgroundColor: '#F0F8E4' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div ref={titleAnimation.ref} className={`text-center mb-12 fade-in-up ${titleAnimation.isVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl font-bold mb-4">お問い合わせフォーム</h2>
            <p className="text-xl">
              お気軽にお問い合わせください。<br />
              お見積もりは無料です！
            </p>
          </div>

          {status === 'success' ? (
            <div ref={successAnimation.ref} className={`bg-green-500 text-white p-8 rounded-lg text-center shadow-lg fade-in-up ${successAnimation.isVisible ? 'visible' : ''}`}>
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-3xl font-bold mb-4">送信完了！</h3>
              <p className="text-xl mb-6">
                お問い合わせありがとうございます。<br />
                担当者より折り返しご連絡させていただきます。
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="bg-white text-green-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition"
              >
                もう一度送信する
              </button>
            </div>
          ) : (
            <form ref={formAnimation.ref} onSubmit={handleSubmit} className={`bg-white text-gray-900 rounded-lg shadow-lg p-8 fade-in-up ${formAnimation.isVisible ? 'visible' : ''}`}>
              <div className="space-y-6">
                {/* お名前 */}
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold mb-2">
                    お名前 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                  />
                </div>

                {/* フリガナ */}
                <div>
                  <label htmlFor="furigana" className="block text-lg font-semibold mb-2">
                    フリガナ <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="furigana"
                    name="furigana"
                    value={formData.furigana}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                  />
                </div>

                {/* 電話番号 */}
                <div>
                  <label htmlFor="phone" className="block text-lg font-semibold mb-2">
                    電話番号 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="090-1234-5678"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                  />
                </div>

                {/* 郵便番号 */}
                <div>
                  <label htmlFor="postalCode" className="block text-lg font-semibold mb-2">
                    郵便番号
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="〒123-4567"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                  />
                </div>

                {/* ご住所 */}
                <div>
                  <label htmlFor="address" className="block text-lg font-semibold mb-2">
                    ご住所 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                  />
                </div>

                {/* メールアドレス */}
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold mb-2">
                    メールアドレス <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                  />
                </div>

                {/* お問合せ項目 */}
                <div>
                  <label htmlFor="inquiryType" className="block text-lg font-semibold mb-2">
                    お問合せ項目 <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                  >
                    <option value="無料見積もり依頼">無料見積もり依頼</option>
                    <option value="求人募集">求人募集</option>
                    <option value="その他">その他</option>
                  </select>
                </div>

                {/* お問合せ内容 */}
                <div>
                  <label htmlFor="message" className="block text-lg font-semibold mb-2">
                    お問合せ内容 <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg resize-vertical"
                  ></textarea>
                </div>

                {errorMessage && (
                  <div className="bg-red-100 border-2 border-red-600 text-red-700 px-4 py-3 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                {/* 送信ボタン */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-accent hover:bg-accent-dark text-white font-bold text-xl py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? '送信中...' : '送信する'}
                  </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4">
                  お客様の個人情報は、お問い合わせへの対応のみに使用し、適切に管理いたします。
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
