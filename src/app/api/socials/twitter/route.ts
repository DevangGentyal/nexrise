import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { username } = await request.json();
        
        if (!username) {
            return NextResponse.json(
                { error: "Username is required" }, 
                { status: 400 }
            );
        }

        console.log("Twitter API - Username received:", username);

        // ... rest of your Twitter API logic ...
        return NextResponse.json({ 
            userProfile: {
                username: username,
                name: "Test User",
                followers: 0,
                following: 0,
                tweets: 0,
                profile_pic: "https://placeholder.com/150"
            }
        });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Failed to process request" }, 
            { status: 500 }
        );
    }
} 