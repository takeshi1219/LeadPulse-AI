"use client"

import { useState, useEffect } from "react"
import { Loader2, ImageIcon } from "lucide-react"

interface AIImageProps {
  prompt: string
  alt: string
  className?: string
  fallbackGradient?: string
  aspectRatio?: "16:9" | "1:1" | "4:3" | "3:2"
}

export function AIImage({
  prompt,
  alt,
  className = "",
  fallbackGradient = "from-blue-500/20 via-purple-500/20 to-pink-500/20",
  aspectRatio = "16:9",
}: AIImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const generateImage = async () => {
      try {
        setLoading(true)
        setError(false)

        const response = await fetch("/api/ai/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, aspectRatio }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate image")
        }

        const data = await response.json()
        setImageUrl(data.image)
      } catch (err) {
        console.error("Image generation failed:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    generateImage()
  }, [prompt, aspectRatio])

  const aspectRatioClass = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "4:3": "aspect-[4/3]",
    "3:2": "aspect-[3/2]",
  }[aspectRatio]

  if (loading) {
    return (
      <div
        className={`${aspectRatioClass} ${className} relative overflow-hidden rounded-2xl bg-gradient-to-br ${fallbackGradient}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-white/70">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="text-sm font-medium">Generating with AI...</span>
          </div>
        </div>
        <div className="absolute inset-0 animate-pulse bg-white/5" />
      </div>
    )
  }

  if (error || !imageUrl) {
    return (
      <div
        className={`${aspectRatioClass} ${className} relative overflow-hidden rounded-2xl bg-gradient-to-br ${fallbackGradient}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <ImageIcon className="h-12 w-12" />
            <span className="text-sm">{alt}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${aspectRatioClass} ${className} relative overflow-hidden rounded-2xl`}>
      <img
        src={imageUrl}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-1 text-[10px] text-white/70 backdrop-blur-sm">
        ✨ AI Generated
      </div>
    </div>
  )
}

// Static placeholder for SSR - replaced on client
export function AIImagePlaceholder({
  alt,
  className = "",
  fallbackGradient = "from-blue-500/20 via-purple-500/20 to-pink-500/20",
  aspectRatio = "16:9",
}: Omit<AIImageProps, "prompt">) {
  const aspectRatioClass = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "4:3": "aspect-[4/3]",
    "3:2": "aspect-[3/2]",
  }[aspectRatio]

  return (
    <div
      className={`${aspectRatioClass} ${className} relative overflow-hidden rounded-2xl bg-gradient-to-br ${fallbackGradient}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-white/50">
          <ImageIcon className="h-12 w-12" />
          <span className="text-sm">{alt}</span>
        </div>
      </div>
    </div>
  )
}

