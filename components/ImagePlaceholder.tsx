import Image from 'next/image'

interface ImagePlaceholderProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false
}: ImagePlaceholderProps) {
  return (
    <div className={`relative bg-gray-200 ${className}`} style={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        priority={priority}
        onError={(e) => {
          const target = e.target as HTMLElement
          target.style.display = 'none'
          if (target.parentElement) {
            target.parentElement.innerHTML = `
              <div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                ${width}×${height}<br/>${alt}
              </div>
            `
          }
        }}
      />
    </div>
  )
}
