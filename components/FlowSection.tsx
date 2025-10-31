'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function FlowSection() {
  const steps = [
    {
      number: '01',
      title: 'お問い合わせ・お見積もり',
      description: 'まずはお電話またはWEBフォームからお問い合わせください。お見積もりは無料で現地調査をして行います。作業内容や料金については詳しく丁寧にご説明いたします。',
      icon: '📞'
    },
    {
      number: '02',
      title: '遺品や回収品の仕分け・貴重品の探索',
      description: '遺品や回収品を仕分けながら、現金、クレジットカードや年金手帳や通帳、印鑑などの貴重品を丁寧に探し出します。また大切な思い出の品と不用品を分けて整理します。',
      icon: '🔍'
    },
    {
      number: '03',
      title: '不用品お搬出',
      description: '整理が終わりましたら、不用品を搬出致します。重たい家具や大型の家電品等は専門のスタッフが丁寧に運び出します。',
      icon: '📦'
    },
    {
      number: '04',
      title: '簡易清掃',
      description: '整理搬出が終わりましたら、基本的な清掃を行います。ご希望があれば本格的な清掃も承ります。お気軽にご相談ください。',
      icon: '🧹'
    },
    {
      number: '05',
      title: '不用品の適正処分',
      description: 'リサイクル可能な物は環境に配慮して適切に処分いたします。再利用可能な物はリサイクルに回し、廃棄物は法令を遵守した方法で処理致しますので、ご安心ください。',
      icon: '♻️'
    },
    {
      number: '06',
      title: 'お支払い',
      description: '全ての作業が終了した後で、最終的な料金をご確認頂き、お支払いをお願いいたします。',
      icon: '💳'
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
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4">メイプルの回収の流れ</h2>
          <p className="text-2xl md:text-3xl text-accent font-semibold">
            安心の6ステップ
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} ref={stepAnimations[index].ref} className={`relative fade-in-up ${stepAnimations[index].isVisible ? 'visible' : ''}`}>
              {/* ステップカード */}
              <div className="flex items-start mb-8 md:mb-12">
                {/* ステップ番号とアイコン */}
                <div className="flex-shrink-0 mr-6">
                  <div className="bg-gradient-to-br from-primary to-primary-dark text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                    {step.icon}
                  </div>
                  <div className="text-center mt-2">
                    <span className="inline-block bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
                      STEP {step.number}
                    </span>
                  </div>
                </div>

                {/* ステップ内容 */}
                <div className="flex-grow bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold mb-3 text-primary">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* 接続線（最後のステップ以外） */}
              {index < steps.length - 1 && (
                <div className="absolute left-10 top-20 w-0.5 h-12 md:h-16 bg-gradient-to-b from-primary to-primary-light"></div>
              )}
            </div>
          ))}
        </div>

        {/* 完了メッセージ */}
        <div ref={completionAnimation.ref} className={`mt-12 text-center bg-gradient-to-r from-green-500 to-green-600 text-white py-8 rounded-lg shadow-lg fade-in-up ${completionAnimation.isVisible ? 'visible' : ''}`}>
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-3xl font-bold mb-2">作業完了！</h3>
          <p className="text-xl">
            お客様に心からご満足いただけるサービスを提供いたします
          </p>
        </div>
      </div>
    </section>
  )
}
