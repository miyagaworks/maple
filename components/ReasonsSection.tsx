'use client'

import Image from 'next/image'
import CTAButton from './CTAButton'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function ReasonsSection() {
  const reasons = [
    {
      title: '広島地域密着だからこその機動力',
      description: 'メイプルは広島地域密着で不用品回収事業をしています。そのため、他県でも不用品回収をしている業者より迅速かつ安価に対応が可能です！',
      image: '/images/chiiki.jpg',
      width: 400,
      height: 300
    },
    {
      title: '下請け不在だからこその低単価',
      description: '大手の不用品回収会社などは、下請け任せにして自社で不用品回収ができない会社がほとんどです。こうなってしまうと、不用品回収はたいへん高価になってしまいます。メイプルのお片付けは、そのようなことがないため、他社より安価に対応させていただきます！',
      image: '/images/shitauke.jpg',
      width: 400,
      height: 300
    },
    {
      title: '女性がいくから安心対応',
      description: 'メイプルのお片付けでは、お客様のパーソナルスペースに立ち入らせていただくことが多いです。そのためご要望があった場合には、女性スタッフがうかがわせていただくようにさせていただいております。',
      image: '/images/fuyouhin.jpg',
      width: 400,
      height: 300
    }
  ]

  const titleAnimation = useScrollAnimation(0.1)
  const reasonAnimations = [
    useScrollAnimation(0.1),
    useScrollAnimation(0.2),
    useScrollAnimation(0.3)
  ]

  return (
    <section className="pt-12 md:pt-16 pb-12 md:pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div ref={titleAnimation.ref} className={`text-center mb-12 md:mb-16 fade-in-up ${titleAnimation.isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4">選ばれる理由</h2>
          <p className="text-2xl md:text-3xl text-accent font-semibold">
            地域密着で安心の実績
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {reasons.map((reason, index) => (
            <div
              key={index}
              ref={reasonAnimations[index].ref}
              className={`bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition fade-in-up ${reasonAnimations[index].isVisible ? 'visible' : ''}`}
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">{reason.title}</h3>
                <p className="text-lg leading-relaxed mb-6">{reason.description}</p>
              </div>

              <div className="relative h-64 bg-white">
                <Image
                  src={reason.image}
                  alt={reason.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}

          {/* Empty space for layout */}
          <div></div>
        </div>
      </div>
    </section>
  )
}
