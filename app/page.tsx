import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import PricingSection from '@/components/PricingSection'
import ServicesSection from '@/components/ServicesSection'
import ProblemsSection from '@/components/ProblemsSection'
import ReasonsSection from '@/components/ReasonsSection'
import WarningSection from '@/components/WarningSection'
import FlowSection from '@/components/FlowSection'
import ContactForm from '@/components/ContactForm'
import ScrollToTop from '@/components/ScrollToTop'
import Image from 'next/image'
import { FaEnvelope } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="min-h-screen xl:pb-0 pb-20">
      <Header />
      <HeroSection />
      <PricingSection />
      <ServicesSection />
      <ProblemsSection />
      <ReasonsSection />
      <WarningSection />
      <FlowSection />
      <ContactForm />

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">メイプルのお片付け</h3>
              <p className="text-gray-400">
                広島で不用品回収、遺品整理、解体前のお片付けを承っております。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">お問い合わせ</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Image
                    src="/images/freedial.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <a
                    href="tel:0120-551-669"
                    className="hover:opacity-60 transition pb-0.5"
                    style={{ color: "#4a9eff" }}
                  >
                    0120-551-669
                  </a>
                </p>
                <p className="text-gray-400 text-sm">
                  受付日時: 土日対応可能 9時〜18時
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">会社概要</h3>
              <div className="space-y-2">
                <p>
                  <a
                    href="https://hiroshima-maple.com/company/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition"
                    style={{ color: "#4a9eff" }}
                  >
                    株式会社メイプル
                  </a>
                </p>
                <p className="text-gray-400">
                  広島県全域
                  <br />
                  ※一部地域を除く
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 株式会社メイプル All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* 固定CTAボタン（モバイル・タブレット） */}
      <div className="fixed bottom-0 left-0 right-0 z-40 xl:hidden flex">
        <a
          href="tel:0120-551-669"
          className="flex-1 text-white font-bold py-4 px-4 rounded-tl-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 flex items-center justify-center gap-3 border-r border-white active:scale-95 border-t border-l border-white"
          style={{ background: "linear-gradient(to bottom, #004ae8, #0026a4)" }}
        >
          <Image
            src="/images/freedial.svg"
            alt="フリーダイヤル"
            width={40}
            height={44}
            className="drop-shadow-lg"
          />
          <div className="flex flex-col items-start">
            <span className="text-[10px] leading-none opacity-90">
              今すぐ電話
            </span>
            <span className="text-sm font-extrabold leading-tight mt-0.5">
              0120-551-669
            </span>
          </div>
        </a>
        <a
          href="#contact"
          className="flex-1 text-white font-bold py-4 px-4 rounded-tr-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 border-t border-r border-white"
          style={{ background: "linear-gradient(to bottom, #ef8337, #cc5527)" }}
        >
          <FaEnvelope className="text-4xl drop-shadow-lg" />
          <div className="flex flex-col items-start">
            <span className="text-[10px] leading-none opacity-90">
              24時間受付
            </span>
            <span className="text-sm font-extrabold leading-tight mt-0.5">
              お問い合わせ
            </span>
          </div>
        </a>
      </div>

      {/* ページトップへ戻るボタン */}
      <ScrollToTop />
    </main>
  );
}
