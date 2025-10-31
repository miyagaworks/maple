'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { FaPhone, FaSearch, FaTruck, FaBroom, FaRecycle, FaYenSign, FaCheckCircle, FaChevronDown } from 'react-icons/fa'

export default function FlowSection() {
  const steps = [
    {
      number: '01',
      title: 'お問い合わせ・お見積もり',
      description: 'まずはお電話またはWEBフォームからお問い合わせください。お見積もりは無料で現地調査をして行います。作業内容や料金については詳しく丁寧にご説明いたします。',
      icon: FaPhone
    },
    {
      number: '02',
      title: '遺品や回収品の仕分け・貴重品の探索',
      description: '遺品や回収品を仕分けながら、現金、クレジットカードや年金手帳や通帳、印鑑などの貴重品を丁寧に探し出します。また大切な思い出の品と不用品を分けて整理します。',
      icon: FaSearch
    },
    {
      number: '03',
      title: '不用品の搬出',
      description: '整理が終わりましたら、不用品を搬出いたします。重たい家具や大型の家電品等は専門のスタッフが丁寧に運び出します。',
      icon: FaTruck
    },
    {
      number: '04',
      title: '簡易清掃',
      description: '整理搬出が終わりましたら、基本的な清掃を行います。ご希望があれば本格的な清掃も承ります。お気軽にご相談ください。',
      icon: FaBroom
    },
    {
      number: '05',
      title: '不用品の適正処分',
      description: 'リサイクル可能な物は環境に配慮して適切に処分いたします。再利用可能な物はリサイクルに回し、廃棄物は法令を遵守した方法で処理いたしますので、ご安心ください。',
      icon: FaRecycle
    },
    {
      number: '06',
      title: 'お支払い',
      description: '全ての作業が終了した後で、最終的な料金をご確認頂き、お支払いをお願いいたします。',
      icon: FaYenSign
    }
  ]

  const titleAnimation = useScrollAnimation(0.1)
  const stepAnimations = steps.map((_, index) =>
    useScrollAnimation(0.1 + index * 0.1)
  )
  const completionAnimation = useScrollAnimation(0.1)

  return (
    <section id="flow" className="relative pt-12 md:pt-16 pb-12 md:pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div ref={titleAnimation.ref} className={`text-center mb-12 md:mb-16 fade-in-up ${titleAnimation.isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4">回収の流れ</h2>
          <p className="text-2xl md:text-3xl text-accent font-semibold">
            安心の6ステップ
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} ref={stepAnimations[index].ref} className={`relative fade-in-up ${stepAnimations[index].isVisible ? 'visible' : ''}`}>
              {/* ステップカード */}
              <div className="flex items-center mb-8 md:mb-12">
                {/* ステップ番号とアイコン */}
                <div className="flex-shrink-0 mr-6 relative z-10 flex flex-col items-center">
                  <div className="bg-gradient-to-br from-primary to-primary-dark text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                    <step.icon className={step.number === '01' ? 'scale-x-[-1]' : ''} />
                  </div>
                  <div className="text-center mt-2">
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded leading-tight border-2 border-orange-500 text-orange-500 bg-white">
                      STEP<br /><span className="text-base">{step.number}</span>
                    </span>
                  </div>
                </div>

                {/* ステップ内容 */}
                <div className="flex-grow rounded-2xl shadow-lg p-6 hover:shadow-xl transition bg-orange-50">
                  <h3 className="text-2xl font-bold mb-3 text-primary">
                    {step.title}
                  </h3>
                  <div className="border-t mb-3 border-orange-200"></div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* 下向き矢印（最後のステップ以外） */}
              {index < steps.length - 1 && (
                <div className="flex justify-center mb-8 md:mb-12">
                  <FaChevronDown className="text-primary text-3xl" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 完了メッセージ */}
        <div className="max-w-4xl mx-auto">
          <div ref={completionAnimation.ref} className={`mt-12 text-center bg-green-500 text-white p-8 rounded-2xl shadow-lg fade-in-up ${completionAnimation.isVisible ? 'visible' : ''}`}>
            <div className="text-5xl mb-4 flex justify-center">
              <FaCheckCircle />
            </div>
            <h3 className="text-3xl font-bold mb-2">作業完了！</h3>
            <p className="text-xl">
              お客様に心からご満足いただけるサービスを提供いたします
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
