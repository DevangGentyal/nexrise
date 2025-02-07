'use client'
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Wand2Icon, TypeIcon, LayoutTemplateIcon, HashIcon } from "lucide-react"

export default function AIContentGenerator() {
  const [caption, setCaption] = useState("")
  const [template, setTemplate] = useState("")
  const [keywords, setKeywords] = useState("")

  const generateContent = (type: string) => {
    console.log(`Generating ${type}...`)
  }

  return (
    <div className="card p-6">
      <Tabs defaultValue="captions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 p-1 bg-slate-100 rounded-lg gap-1">
          <TabsTrigger value="captions" className="flex items-center gap-2 data-[state=active]:bg-white">
            <TypeIcon className="w-4 h-4" />
            Captions
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2 data-[state=active]:bg-white">
            <LayoutTemplateIcon className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="keywords" className="flex items-center gap-2 data-[state=active]:bg-white">
            <HashIcon className="w-4 h-4" />
            Keywords
          </TabsTrigger>
        </TabsList>
        <TabsContent value="captions">
          <div className="space-y-4">
            <Input
              placeholder="What would you like to post about?"
              className="bg-slate-50 border-slate-200 rounded-lg"
            />
            <Textarea
              placeholder="Your AI-generated caption will appear here..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[150px] bg-slate-50 border-slate-200 rounded-lg"
            />
            <Button
              onClick={() => generateContent("caption")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Wand2Icon className="w-4 h-4 mr-2" />
              Generate Caption
            </Button>
          </div>
        </TabsContent>
        {/* Similar structure for templates and keywords tabs */}
      </Tabs>
    </div>
  )
}

