import Link from 'next/link'
import Image from 'next/image'
import { FaEnvelope } from 'react-icons/fa'

interface CTAButtonProps {
  variant?: 'phone' | 'form'
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  fullWidth?: boolean
}

export default function CTAButton({
  variant = 'phone',
  className = '',
  size = 'lg',
  fullWidth = false
}: CTAButtonProps) {
  const sizeClasses = {
    sm: 'py-2 px-4',
    md: 'py-3 px-6',
    lg: 'py-4 px-8',
    xl: 'py-5 px-10',
    '2xl': 'py-6 px-12',
    '3xl': 'py-7 px-14'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-5xl'
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    '2xl': 40,
    '3xl': 64
  }

  const reactIconSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-3xl',
    '3xl': 'text-5xl'
  }

  const widthClass = fullWidth ? 'w-full' : 'inline-block'

  if (variant === 'phone') {
    return (
      <a
        href="tel:0120-551-669"
        className={`${widthClass} text-white hover:text-white font-bold rounded-full transition-all transform hover:scale-105 hover:opacity-80 shadow-lg text-center flex items-center justify-center gap-4 border-2 border-white ${sizeClasses[size]} ${className}`}
        style={{ background: 'linear-gradient(to bottom, #004ae8, #0026a4)' }}
      >
        <Image src="/images/freedial.svg" alt="" width={iconSizes[size]} height={iconSizes[size]} />
        <span className={`${textSizes[size]} -mt-1`}>0120-551-669</span>
      </a>
    )
  }

  return (
    <Link
      href="#contact"
      className={`${widthClass} text-white hover:text-white font-bold rounded-full transition-all transform hover:scale-105 hover:opacity-80 shadow-lg text-center flex items-center justify-center gap-4 border-2 border-white ${sizeClasses[size]} ${className}`}
      style={{ background: "linear-gradient(to bottom, #f5d10f, #dea500)" }}
    >
      <FaEnvelope
        className={reactIconSizes[size]}
        style={{ fontSize: size === "3xl" ? "3.5rem" : undefined }}
      />
      <span className={`${textSizes[size]} -mt-1`}>お問い合わせ</span>
    </Link>
  );
}
