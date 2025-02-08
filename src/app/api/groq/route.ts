import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({ 
    apiKey: "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" 
});

export async function POST(req: Request) {
    try {
        const { query, systemMsg } = await req.json();
        
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemMsg,
                },
                {
                    role: "user",
                    content: query,
                },
            ],
            model: "llama-3.1-8b-instant",
        });

        // console.log("NLP Response: "+completion.choices[0]?.message?.content || "");
        return NextResponse.json(completion.choices[0]?.message?.content || "");
    } catch (error) {
        return NextResponse.json({ error: "Failed to process query" }, { status: 500 });
    }
}