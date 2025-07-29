'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Toggle } from '@/components/ui/toggle'
import { CheckIcon, CopyIcon, Loader } from 'lucide-react'
import axios from 'axios'
import { motion } from 'framer-motion'

type Platform = 'linkedin' | 'twitter' | 'instagram' | 'tiktok' | 'youtube'

export default function CaptionGenerator() {
  const [prompt, setPrompt] = useState('')
  const [tone, setTone] = useState('')
  const [style, setStyle] = useState('')
  const [platform, setPlatform] = useState<Platform | ''>('')
  const [includeHashtags, setIncludeHashtags] = useState(false)
  const [includeCTA, setIncludeCTA] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const toneOptionsByPlatform: Record<Platform, { value: string; label: string }[]> = {
    linkedin: [
      { value: 'professional', label: 'Professional' },
      { value: 'witty', label: 'Witty' },
      { value: 'inspiring', label: 'Inspiring' },
    ],
    twitter: [
      { value: 'savage', label: 'Savage' },
      { value: 'relatable', label: 'Relatable' },
      { value: 'memey', label: 'Memey' },
    ],
    instagram: [
      { value: 'flirty', label: 'Flirty' },
      { value: 'aesthetic', label: 'Aesthetic' },
      { value: 'deep', label: 'Deep' },
    ],
    tiktok: [
      { value: 'funny', label: 'Funny' },
      { value: 'sarcastic', label: 'Sarcastic' },
      { value: 'hype', label: 'Hype' },
    ],
    youtube: [
      { value: 'clickbaity', label: 'Clickbaity' },
      { value: 'hooky', label: 'Hooky' },
      { value: 'storytelling', label: 'Storytelling' },
    ],
  }

  const toneDescriptions: Record<string, string> = {
    professional: 'Make it sound polished and smart.',
    witty: 'Add clever, subtle humor.',
    inspiring: 'Make it motivational.',
    savage: 'Make it brutally honest and bold.',
    relatable: 'Make it feel real and personal.',
    memey: 'Turn it into a meme-like joke.',
    flirty: 'Make it smooth and sexy.',
    aesthetic: 'Add a soft, vibey aesthetic.',
    deep: 'Make it emotional and thoughtful.',
    funny: 'Add a humorous twist.',
    sarcastic: 'Make it sarcastic.',
    hype: 'Make it high energy and hype.',
    clickbaity: 'Make it dramatic and catchy.',
    hooky: 'Write like a YouTube hook.',
    storytelling: 'Write like a short story.',
  }

  const styleDescriptions: Record<string, string> = {
    gymbro: 'Talk like a shredded gym rat hyping up leg day.',
    marketing: 'Craft it like a viral marketing hook.',
    technerd: 'Make it sound like a geeky tech bro.',
    nsfw: 'Push the limits, make it wild and naughty.',
  }

  const platformTextMap: Record<Platform, string> = {
    linkedin: 'Make it suitable for LinkedIn.',
    twitter: 'Keep it short and punchy for Twitter.',
    instagram: 'Make it Instagram-worthy.',
    tiktok: 'Format it for TikTok.',
    youtube: 'Make it hook like a YouTube title.',
  }

  const getToneOptions = () => (platform ? toneOptionsByPlatform[platform] : [])

  const handleGenerate = async () => {
    if (!prompt && !platform && !tone) return
    setLoading(true)
    setResults([])

    const toneText = toneDescriptions[tone] || ''
    const styleText = styleDescriptions[style] || ''
    const platformText = platform ? platformTextMap[platform] : ''

    const base = `
      You are a viral content strategist who writes short, punchy, and scroll-stopping captions for social media.

      Given the following:
        - Prompt / Content Description: "${prompt.trim()}"
        - Tone: ${tone} (${toneText})
        - Style: ${style} (${styleText})
        - Platform: ${platform} (${platformText})
        - Include Hashtags: ${includeHashtags}
        - Include CTA (Call to Action): ${includeCTA}

      Your task:
      1. Generate 5 unique, engaging captions based on this context.
      2. Each caption should match the tone, style, and vibe of the platform.
      3. If hashtags are included, append 2–3 relevant hashtags.
      4. If CTA is true, end each caption with a call to action (like “Follow for more”, “Drop a comment”, etc).

      Only output the 5 captions. No explanation.
    `.trim()

    try {
      const res = await axios.post('/api/response', { prompt: base })
      setResults(res.data.captions)
    } catch (err) {
      console.error('Gemini error:', err)
      setResults(['Failed to generate captions. Try again.'])
    }

    setLoading(false)
  }

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1000)
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="prompt">What’s your content about?</Label>
        <Textarea
          id="prompt"
          rows={3}
          placeholder="e.g., a girl dancing in the rain"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="rounded-xl border p-4 space-y-4 bg-muted/30">
        <h3 className="text-sm font-semibold text-muted-foreground">Vibe Settings</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Platform</Label>
            <Select onValueChange={(v: Platform) => { setPlatform(v); setTone('') }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tone</Label>
            <Select onValueChange={(v) => setTone(v)} value={tone} disabled={!platform}>
              <SelectTrigger>
                <SelectValue placeholder={platform ? 'Choose tone' : 'Select platform first'} />
              </SelectTrigger>
              <SelectContent>
                {getToneOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {tone && <p className="text-xs text-muted-foreground mt-1">{toneDescriptions[tone]}</p>}
          </div>

          <div className="space-y-2">
            <Label>Style</Label>
            <Select onValueChange={(v) => setStyle(v)} value={style}>
              <SelectTrigger>
                <SelectValue placeholder="Choose style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gymbro">Gym Bro</SelectItem>
                <SelectItem value="marketing">Marketing/Hook</SelectItem>
                <SelectItem value="technerd">Tech Nerd</SelectItem>
                <SelectItem value="nsfw">NSFW</SelectItem>
              </SelectContent>
            </Select>
            {style && <p className="text-xs text-muted-foreground mt-1">{styleDescriptions[style]}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Toggle pressed={includeHashtags} onPressedChange={setIncludeHashtags}>Hashtags</Toggle>
        <Toggle pressed={includeCTA} onPressedChange={setIncludeCTA}>Include CTA</Toggle>
      </div>

      {loading ? (
        <Button className="w-full" disabled>
          <Loader className="animate-spin mr-2 h-4 w-4" /> Generating...
        </Button>
      ) : (
        <Button className="w-full" onClick={handleGenerate}>Generate Captions</Button>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((caption, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-muted/40 rounded-xl p-4 text-sm whitespace-pre-line"
            >
              {caption}
              <button
                onClick={() => handleCopy(caption, index)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-primary transition"
              >
                {copiedIndex === index ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
