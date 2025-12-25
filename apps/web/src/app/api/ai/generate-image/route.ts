import { NextRequest, NextResponse } from "next/server"

// Nano Banana Pro image generation via Gemini API
export async function POST(req: NextRequest) {
  try {
    const { prompt, aspectRatio = "16:9" } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      )
    }

    // Call Gemini API with Nano Banana Pro model for image generation
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a high-quality, professional image: ${prompt}. Style: modern, clean, suitable for a B2B SaaS landing page. Aspect ratio: ${aspectRatio}.`,
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Gemini API error:", errorData)
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Extract image from response
    const candidates = data.candidates || []
    if (candidates.length === 0) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      )
    }

    const parts = candidates[0]?.content?.parts || []
    const imagePart = parts.find((part: { inlineData?: { mimeType: string; data: string } }) => part.inlineData)

    if (!imagePart?.inlineData) {
      return NextResponse.json(
        { error: "No image in response" },
        { status: 500 }
      )
    }

    const { mimeType, data: imageData } = imagePart.inlineData

    return NextResponse.json({
      image: `data:${mimeType};base64,${imageData}`,
      mimeType,
    })
  } catch (error) {
    console.error("Image generation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

