'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    furigana: '',
    phone: '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    building: '',
    email: '',
    inquiryType: '無料見積もり依頼',
    message: ''
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [mapUrl, setMapUrl] = useState<string>('')

  const titleAnimation = useScrollAnimation(0.1)
  const formAnimation = useScrollAnimation<HTMLFormElement>(0.2)
  const successAnimation = useScrollAnimation(0.2)

  // 郵便番号から住所を自動入力
  const handlePostalCodeChange = async (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '')
    setFormData(prev => ({ ...prev, postalCode: numericValue }))

    if (numericValue.length === 7) {
      try {
        const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${numericValue}`)
        const data = await response.json()

        if (data.results && data.results.length > 0) {
          const result = data.results[0]
          setFormData(prev => ({
            ...prev,
            prefecture: result.address1,
            city: result.address2 + result.address3
          }))
        }
      } catch (error) {
        console.error('郵便番号検索エラー:', error)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let sanitizedValue = value

    // 電話番号：数字のみ許可、ハイフン自動削除
    if (name === 'phone') {
      sanitizedValue = value.replace(/[^\d]/g, '')
    }

    // メールアドレス：英数字と@.-_のみ許可
    if (name === 'email') {
      sanitizedValue = value.replace(/[^a-zA-Z0-9@.\-_]/g, '')
    }

    setFormData(prev => ({ ...prev, [name]: sanitizedValue }))
  }

  // 番地入力時にGoogle Mapを更新
  useEffect(() => {
    if (formData.prefecture && formData.city && formData.address) {
      const fullAddress = `${formData.prefecture}${formData.city}${formData.address}${formData.building}`
      const encodedAddress = encodeURIComponent(fullAddress)
      setMapUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=16`)
    } else {
      setMapUrl('')
    }
  }, [formData.prefecture, formData.city, formData.address, formData.building])

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
        prefecture: '',
        city: '',
        address: '',
        building: '',
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
    <section id="contact" className="relative py-16" style={{ backgroundColor: '#f5d10f', color: '#572A06' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={titleAnimation.ref} className={`text-center mb-12 fade-in-up ${titleAnimation.isVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl font-bold mb-4">お問い合せフォーム</h2>
            <p className="text-xl">
              お気軽にお問い合わせください。<br />
              お見積もりは無料です！
            </p>
          </div>

          {status === 'success' ? (
            <div ref={successAnimation.ref} className={`bg-green-500 text-white p-8 rounded-2xl text-center shadow-lg fade-in-up ${successAnimation.isVisible ? 'visible' : ''}`}>
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
            <form ref={formAnimation.ref} onSubmit={handleSubmit} className={`bg-white text-gray-900 rounded-2xl shadow-lg p-8 fade-in-up ${formAnimation.isVisible ? 'visible' : ''}`}>
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
                    placeholder="山田 太郎"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg placeholder:align-middle"
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
                    placeholder="ヤマダ タロウ"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg placeholder:align-middle"
                  />
                </div>

                {/* 電話番号 */}
                <div>
                  <label htmlFor="phone" className="block text-lg font-semibold mb-2">
                    電話番号 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="09012345678"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg placeholder:align-middle"
                  />
                </div>

                {/* 郵便番号 */}
                <div>
                  <label htmlFor="postalCode" className="block text-lg font-semibold mb-2">
                    郵便番号 <span className="text-sm text-gray-600 font-normal">（任意・ハイフンなし7桁）</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handlePostalCodeChange(e.target.value)}
                    placeholder="1234567"
                    maxLength={7}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg placeholder:align-middle"
                  />
                </div>

                {/* 都道府県・市区町村 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="prefecture" className="block text-lg font-semibold mb-2">
                      都道府県 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="prefecture"
                      name="prefecture"
                      value={formData.prefecture}
                      onChange={handleChange}
                      required
                      placeholder="広島県"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg placeholder:align-middle"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-lg font-semibold mb-2">
                      市区町村 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="広島市"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg placeholder:align-middle"
                    />
                  </div>
                </div>

                {/* 番地 */}
                <div>
                  <label htmlFor="address" className="block text-lg font-semibold mb-2">
                    番地 <span className="text-sm text-gray-600 font-normal">（任意）</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="1-2-3"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg placeholder:align-middle"
                  />
                </div>

                {/* 建物名・部屋番号 */}
                <div>
                  <label htmlFor="building" className="block text-lg font-semibold mb-2">
                    建物名・部屋番号 <span className="text-sm text-gray-600 font-normal">（任意）</span>
                  </label>
                  <input
                    type="text"
                    id="building"
                    name="building"
                    value={formData.building}
                    onChange={handleChange}
                    placeholder="〇〇ビル4F"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg placeholder:align-middle"
                  />
                </div>

                {/* Google Map */}
                {mapUrl && (
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      訪問先地図の確認
                    </label>
                    <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden border-2 border-gray-300">
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        src={mapUrl}
                      ></iframe>
                    </div>
                  </div>
                )}

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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg placeholder:align-middle"
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
                  <div className="bg-red-100 border-2 border-red-600 text-red-700 px-4 py-3 rounded-2xl">
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
