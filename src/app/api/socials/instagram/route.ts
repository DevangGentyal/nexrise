import { NextResponse } from "next/server";
import fetch from "node-fetch";

const POST_TYPE: Record<string, string> = {
    static_image: "static_image",
    album: "album",
    reel: "reel",
    video: "video",
};


export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    console.log("Fetching Instagram data for:", username);

    const headers = {
      "X-RapidAPI-Key": "d633f9176cmsh867f21f317820d0p176f76jsn78cf548b8b08",
      "X-RapidAPI-Host": "instagram-scraper-api2.p.rapidapi.com",
    };

    const response = await fetch(
      `https://instagram-scraper-api2.p.rapidapi.com/v1/posts?username_or_id_or_url=${username}`,
      { headers }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API Error Response:", errorData);

      if (response.status === 404) {
        return NextResponse.json({ error: "Instagram account or posts not found" }, { status: 404 });
      }

      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json() || Object();
    console.log("API Response:", data);

    if (!data.data || !data.data.items || !data.data.user) {
      return NextResponse.json({ error: "Invalid API response structure" }, { status: 500 });
    }

     // Extract user details
     const userId = data.data.user.id;
     const userProfileName = data.data.user.username;
 
     // Initialize counters and accumulators
     let totalPosts = 0;
     let reelsCount = 0, postCount = 0, albumCount = 0;
     let reelLikes = 0, postLikes = 0, albumLikes = 0;
     let reelViews = 0, postViews = 0, albumViews = 0;
     let reelShares = 0, postShares = 0, albumShares = 0;
     let reelComments = 0, postComments = 0, albumComments = 0;
 
     // Format the posts and calculate metrics
     const posts = data.data.items.map((post: any) => {
       const postType = post.media_name || "unknown";
       const likes = post.like_and_view_counts_disabled ? 0 : post.like_count || 0;
       const views = postType === "reel" ? post.play_count || 0 : 0;
       const shares = postType === "reel" ? post.share_count || 0 : 0;
       const comments = post.comment_count || 0;
 
       totalPosts++;
 
       if (postType === "reel") {
         reelsCount++;
         reelLikes += likes;
         reelViews += views;
         reelShares += shares;
         reelComments += comments;
       } else if (postType === "post") {
         postCount++;
         postLikes += likes;
         postViews += views;
         postShares += shares;
         postComments += comments;
       } else if (postType === "album") {
         albumCount++;
         albumLikes += likes;
         albumViews += views;
         albumShares += shares;
         albumComments += comments;
       }
 
       return {
         post_id: post.id,
         user_id: userId,
         user_profile_name: userProfileName,
         post_type: postType,
         likes,
         views,
         shares,
         comments,
       };
     });

    // Calculate Averages
    const averageReelLikes = reelsCount ? (reelLikes / reelsCount).toFixed(2) : 0;
    const averagePostLikes = postCount ? (postLikes / postCount).toFixed(2) : 0;
    const averagealbumLikes = albumCount ? (albumLikes / albumCount).toFixed(2) : 0;

    const averageReelViews = reelsCount ? (reelViews / reelsCount).toFixed(2) : 0;
    const averagePostViews = postCount ? (postViews / postCount).toFixed(2) : 0;
    const averagealbumViews = albumCount ? (albumViews / albumCount).toFixed(2) : 0;

    const averageReelShares = reelsCount ? (reelShares / reelsCount).toFixed(2) : 0;
    const averagePostShares = postCount ? (postShares / postCount).toFixed(2) : 0;
    const averagealbumShares = albumCount ? (albumShares / albumCount).toFixed(2) : 0;

    const averageReelComments = reelsCount ? (reelComments / reelsCount).toFixed(2) : 0;
    const averagePostComments = postCount ? (postComments / postCount).toFixed(2) : 0;
    const averagealbumComments = albumCount ? (albumComments / albumCount).toFixed(2) : 0;

    // Prepare Response
    const postMetrics = {
      total_posts: totalPosts,
      reel_posts: reelsCount,
      static_image_posts: postCount,
      album_posts: albumCount,
      average_likes: {
        reels: averageReelLikes,
        posts: averagePostLikes,
        albums: averagealbumLikes,
      },
      average_views: {
        reels: averageReelViews,
        posts: averagePostViews,
        albums: averagealbumViews,
      },
      average_shares: {
        reels: averageReelShares,
        posts: averagePostShares,
        albums: averagealbumShares,
      },
      average_comments: {
        reels: averageReelComments,
        posts: averagePostComments,
        albums: averagealbumComments,
      },
    };

    console.log("Post Metrics: ",postMetrics);
    return NextResponse.json({ postMetrics, status:200 });
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch Instagram data" },
      { status: 500 }
    );
  }
}
