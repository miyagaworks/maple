'use client'

import Image from 'next/image'
import CTAButton from './CTAButton'
import { FaCrown } from 'react-icons/fa'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function PricingSection() {
  const titleAnimation = useScrollAnimation(0.1)
  const priceAnimation = useScrollAnimation(0.1)
  const plansAnimation = useScrollAnimation(0.1)
  const specialPackAnimation = useScrollAnimation(0.1)
  const ctaAnimation = useScrollAnimation(0.1)
  const plans = [
    {
      name: '軽トラ半パック',
      badge: '安さNO.1',
      description: '少量の不用品回収はこちら',
      items: '運賃（軽トラ）＋作業費＋スタッフ費',
      price: '3,300〜7,700円',
      gradientFrom: '#ffc000',
      gradientTo: '#cc9900',
      image: '/images/keitora01.svg'
    },
    {
      name: '軽トラパック',
      badge: '迷ったらこれ',
      description: '単身のお引っ越し等に',
      items: '運賃（軽トラ）＋作業費＋スタッフ費',
      price: '8,800〜15,400円',
      gradientFrom: '#f59d0f',
      gradientTo: '#c37a0c',
      image: '/images/keitora02.svg'
    },
    {
      name: '軽トラ特盛パック',
      badge: '家族向け',
      description: '家族のお引っ越し等に最適なサイズ',
      items: '運賃（軽トラ）＋作業費＋スタッフ費',
      price: '15,400〜31,900円',
      gradientFrom: '#EC6C26',
      gradientTo: '#b8531d',
      image: '/images/keitora03.svg'
    }
  ]

  return (
    <section id="plans" className="relative">
      {/* 料金プランエリア - 薄い緑 */}
      <div className="pt-12 md:pt-16 pb-12 md:pb-16" style={{ backgroundColor: '#F0F8E4' }}>
        <div className="container mx-auto px-4">
          {/* タイトル */}
          <div ref={titleAnimation.ref} className={`text-center mb-12 md:mb-16 fade-in-up ${titleAnimation.isVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4">料金プラン</h2>
            <p className="text-2xl md:text-3xl text-accent font-semibold">
              通常より30%程度安い！<br />
              <span className="text-3xl md:text-4xl">12,000円/m³目安</span>
            </p>
          </div>

          {/* プランカード */}
          <div ref={plansAnimation.ref} className={`grid md:grid-cols-3 gap-8 md:gap-4 xl:gap-8 fade-in-up ${plansAnimation.isVisible ? 'visible' : ''}`}>
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
            >
              <div className="text-white py-6 px-6" style={{ background: `linear-gradient(to bottom, ${plan.gradientFrom}, ${plan.gradientTo})` }}>
                <span className="inline-block bg-white text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-lg">
                  {plan.badge}
                </span>
                <h3 className={`font-bold mb-1 ${index === 2 ? 'text-[1.375rem]' : 'text-2xl'}`}>{plan.name}</h3>
                <p className="text-sm opacity-90">{plan.description}</p>
              </div>

              <div className="p-6">
                {/* 軽トラ画像プレースホルダー */}
                <div className="mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center p-8 shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)]">
                  <Image
                    src={plan.image}
                    alt="軽トラック"
                    width={140}
                    height={105}
                    className="object-contain w-4/5 md:w-3/4 xl:w-3/5 h-auto drop-shadow-lg"
                  />
                </div>

                <div className="space-y-1 mb-6">
                  <div className="bg-secondary text-white text-center py-3 rounded-full font-medium shadow-lg text-lg">
                    運賃（軽トラ）
                  </div>
                  <div className="text-center text-xl font-bold text-gray-400">＋</div>
                  <div className="bg-secondary text-white text-center py-3 rounded-full font-medium shadow-lg text-lg">
                    作業費
                  </div>
                  <div className="text-center text-xl font-bold text-gray-400">＋</div>
                  <div className="bg-secondary text-white text-center py-3 rounded-full font-medium shadow-lg text-lg">
                    人件費
                  </div>
                </div>

                <div className="mt-6 text-center py-4 rounded-xl" style={{ backgroundColor: '#fff4e6' }}>
                  <p className="text-3xl md:text-3xl xl:text-4xl font-bold" style={{ color: '#ec6c26' }}>
                    {/* スマホ: 1行表示 */}
                    <span className="md:hidden">{plan.price}</span>
                    {/* タブレット: 2行表示 */}
                    <span className="hidden md:block xl:hidden">
                      {plan.price.split('〜')[0]}〜<br />
                      {plan.price.split('〜')[1]}
                    </span>
                    {/* PC: 1行表示 */}
                    <span className="hidden xl:inline">{plan.price}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1 font-medium">（税込）</p>
                </div>
              </div>
            </div>
          ))}
          </div>

          {/* 解体工事特別パック */}
          <div ref={specialPackAnimation.ref} className={`rounded-2xl shadow-lg overflow-hidden fade-in-up mt-8 ${specialPackAnimation.isVisible ? 'visible' : ''}`} style={{ backgroundColor: '#f5d10f', color: '#572A06' }}>
            <div className="p-8">
              {/* タイトル（全デバイス共通） */}
              <div className="flex items-center gap-3 mb-6 justify-center xl:justify-start">
                <FaCrown className="text-3xl md:text-4xl xl:text-5xl" />
                <h3 className="text-2xl md:text-3xl xl:text-4xl font-bold">解体工事特別パック</h3>
              </div>

              {/* PC版：2カラムレイアウト */}
              <div className="hidden xl:grid xl:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-xl mb-6">
                    回収＋解体工事パックでさらにお得！
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl flex-shrink-0">★</span>
                      <p className="text-lg">木製品は無料で回収！</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0 leading-none pt-1">★</span>
                      <p className="text-lg text-justify">
                        解体工事会社が直接まとめてワンストップで行いますので、<br />
                        中間マージンがかからず、<span className={`font-bold px-2 py-0.5 rounded ${specialPackAnimation.isVisible ? 'animate-highlighter' : ''}`} style={{ backgroundImage: 'linear-gradient(transparent 50%, #7ed957 50%)', backgroundRepeat: 'no-repeat', backgroundPosition: 'left bottom', backgroundSize: specialPackAnimation.isVisible ? undefined : '0% 60%' }}>10〜20万円程度安く出来ます！</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/kaitai.jpg"
                      alt="解体工事"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* タブレット版：説明文と画像を横並び */}
              <div className="hidden md:block xl:hidden">
                <div className="grid grid-cols-2 gap-4 items-start">
                  <div>
                    <p className="text-lg mb-4">
                      回収＋解体工事パックでさらにお得！
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl flex-shrink-0">★</span>
                        <p className="text-sm">木製品は無料で回収！</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xl flex-shrink-0 leading-none pt-1">★</span>
                        <p className="text-sm text-justify">
                          解体工事会社が直接まとめてワンストップで行いますので、中間マージンがかからず、<span className={`font-bold px-1 py-0.5 rounded ${specialPackAnimation.isVisible ? 'animate-highlighter' : ''}`} style={{ backgroundImage: 'linear-gradient(transparent 50%, #7ed957 50%)', backgroundRepeat: 'no-repeat', backgroundPosition: 'left bottom', backgroundSize: specialPackAnimation.isVisible ? undefined : '0% 60%' }}>10〜20万円程度安く出来ます！</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 h-48 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/kaitai.jpg"
                        alt="解体工事"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* スマホ版：説明文の下に画像 */}
              <div className="md:hidden">
                <p className="text-base mb-4">
                  回収＋解体工事パックでさらにお得！
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl flex-shrink-0">★</span>
                    <p className="text-sm">木製品は無料で回収！</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0 leading-none pt-1">★</span>
                    <p className="text-sm text-justify">
                      解体工事会社が直接まとめてワンストップで行いますので、中間マージンがかからず、<span className={`font-bold px-1 py-0.5 rounded ${specialPackAnimation.isVisible ? 'animate-highlighter' : ''}`} style={{ backgroundImage: 'linear-gradient(transparent 50%, #7ed957 50%)', backgroundRepeat: 'no-repeat', backgroundPosition: 'left bottom', backgroundSize: specialPackAnimation.isVisible ? undefined : '0% 60%' }}>10〜20万円程度安く出来ます！</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 h-48 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/kaitai.jpg"
                      alt="解体工事"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA - PC版のみ表示 */}
      <div className="hidden xl:block text-white py-16 md:py-20 mt-16" style={{ backgroundColor: '#EC6C26' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4">
              最短即日で伺います！
            </h3>
            <p className="text-xl md:text-2xl">今すぐお問い合わせください</p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-6xl mx-auto">
            <div className="flex-1">
              <CTAButton variant="phone" size="2xl" fullWidth className="!h-20 !px-8 [&_span]:!text-4xl [&_img]:!w-14 [&_img]:!h-14" />
            </div>
            <div className="flex-1">
              <CTAButton variant="form" size="2xl" fullWidth className="!h-20 !px-8 [&_span]:!text-4xl [&_svg]:!text-[3.5rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
