"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Wand2Icon, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AIContentGenerator() {
  const [postInput, setPostInput] = useState("");
  const [instagramContent, setInstagramContent] = useState("");
  const [instagramBio, setInstagramBio] = useState("");
  const [twitterContent, setTwitterContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cleanResponse = (text: string) => {
    return text
      .replace(/^["\\]+|["\\]+$/g, '')
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .trim();
  };

  const generateContent = async (platform: "instagram" | "twitter", type: "content" | "bio") => {
    if (!postInput.trim()) {
      setError("Please enter what you'd like to post about");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (type === "content") {
        const response = await fetch("/api/groq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `Generate an engaging ${platform} post about: ${postInput}`,
            systemMsg: platform === "instagram" 
              ? `Create an engaging Instagram caption with integrated hashtags at the end.
                 Include emojis and a call-to-action.
                 Use up to 30 relevant hashtags mixed between popular and niche.
                 Format: [engaging caption] + line break + [hashtags]
                 Important: Do not include any quotes or escape characters in the response.`
              : `Create a concise and engaging tweet about this topic.
                 Include 1-2 relevant hashtags naturally integrated.
                 Must be under 280 characters.
                 Use emojis sparingly but effectively.
                 Important: Do not include any quotes or escape characters in the response.`
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        const cleanedData = cleanResponse(data);
        
        if (platform === "instagram") {
          setInstagramContent(cleanedData);
        } else {
          setTwitterContent(cleanedData);
        }
      } else {
        const response = await fetch("/api/groq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `Generate a professional Instagram bio focused on: ${postInput}`,
            systemMsg: `Create a concise, engaging Instagram bio.
                       Include relevant emojis and clear value proposition.
                       Keep it under 150 characters.
                       Make it attention-grabbing and professional.
                       Important: Do not include any quotes or escape characters in the response.`
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        setInstagramBio(cleanResponse(data));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen bg-gray-50 ">
      <br /><br /><br />
      <h1 className="text-4xl font-bold text-center mb-5">AI Content Generator</h1>
      <div className="text-center">
          <p className="text-gray-500">AI Content Generator: Smart post ideas for your brand!</p>
        </div>
        <br />
    <div className="flex justify-center items-center  nbg-gray-50">



      <div className="card p-8 bg-white rounded-lg shadow-sm max-w-2xl w-full mx-auto my-8">
        <Tabs defaultValue="instagram" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-slate-100 rounded-lg gap-1">
            <TabsTrigger value="instagram" className="flex items-center gap-2 data-[state=active]:bg-white">
              Instagram
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center gap-2 data-[state=active]:bg-white">
              X (Twitter)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="instagram">
            <div className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Input
                placeholder="What would you like to post about?"
                value={postInput}
                onChange={(e) => setPostInput(e.target.value)}
                className="bg-slate-50 border-slate-200 rounded-lg"
              />

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Caption with Hashtags</label>
                <Textarea
                  placeholder="Your AI-generated caption with hashtags will appear here..."
                  value={instagramContent}
                  onChange={(e) => setInstagramContent(e.target.value)}
                  className="min-h-[200px] bg-slate-50 border-slate-200 rounded-lg"
                />
                <Button
                  onClick={() => generateContent("instagram", "content")}
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Wand2Icon className="w-4 h-4 mr-2" />
                  )}
                  Generate Caption
                </Button>
              </div>
                <br />
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700"> Hook Lines</label>
                <Textarea
                  placeholder="Your AI-generated bio will appear here..."
                  value={instagramBio}
                  onChange={(e) => setInstagramBio(e.target.value)}
                  className="min-h-[100px] bg-slate-50 border-slate-200 rounded-lg"
                />
                <Button
                  onClick={() => generateContent("instagram", "bio")}
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Wand2Icon className="w-4 h-4 mr-2" />
                  )}
                  Generate HookLine
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="twitter">
            <div className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Input
                placeholder="What would you like to tweet about?"
                value={postInput}
                onChange={(e) => setPostInput(e.target.value)}
                className="bg-slate-50 border-slate-200 rounded-lg"
              />

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Tweet Content</label>
                <Textarea
                  placeholder="Your AI-generated tweet will appear here..."
                  value={twitterContent}
                  onChange={(e) => setTwitterContent(e.target.value)}
                  className="min-h-[150px] bg-slate-50 border-slate-200 rounded-lg"
                />
                <Button
                  onClick={() => generateContent("twitter", "content")}
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Wand2Icon className="w-4 h-4 mr-2" />
                  )}
                  Generate Tweet
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
  );
}