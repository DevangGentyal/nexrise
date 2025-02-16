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
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    console.log("Fetching Instagram data for:", username);

    const headers = {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY || '',
      "X-RapidAPI-Host": "instagram-scraper-api2.p.rapidapi.com",
    };

    const profileresponse = await fetch(
      `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${username}`,
      { headers }
    );

    const profileData = await profileresponse.json()||Object();
    if (!profileData) {
      return NextResponse.json(
        { error: "Invalid API response structure" },
        { status: 500 }
      );
    }

    const postsresponse = await fetch(
      `https://instagram-scraper-api2.p.rapidapi.com/v1/posts?username_or_id_or_url=${username}`,
      { headers }
    );

    if (!postsresponse.ok) {
      const errorData = await postsresponse.text();
      console.error("API Error Response:", errorData);

      if (postsresponse.status === 404) {
        return NextResponse.json(
          { error: "Instagram account or posts not found" },
          { status: 404 }
        );
      }

      throw new Error(`API request failed with status ${postsresponse.status}`);
    }

    const postsdata = (await postsresponse.json()) || Object();

    if (!postsdata.data || !postsdata.data.items || !postsdata.data.user) {
      return NextResponse.json(
        { error: "Invalid API response structure" },
        { status: 500 }
      );
    }

    // Initialize counters and accumulators
    let totalPosts = 0;
    let reelsCount = 0,
      postCount = 0,
      albumCount = 0;
    let reelLikes = 0,
      postLikes = 0,
      albumLikes = 0;
    let reelViews = 0,
      postViews = 0,
      albumViews = 0;
    let reelShares = 0,
      postShares = 0,
      albumShares = 0;
    let reelComments = 0,
      postComments = 0,
      albumComments = 0;

    // Format the posts and calculate metrics
    const posts = postsdata.data.items.map((post: any) => {
      const postType = post.media_name || "unknown";
      const likes = post.like_and_view_counts_disabled
        ? 0
        : post.like_count || 0;
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
        post_type: postType,
        likes,
        views,
        shares,
        comments,
      };
    });

    // posts.forEach((post: any, index: any) => {
    //   console.log(
    //     `Formatted Post ${index + 1}:`,
    //     JSON.stringify(post, null, 2)
    //   );
    // });

    // Calculate Averages
    const averageReelLikes = reelsCount
      ? (reelLikes / reelsCount).toFixed(2)
      : 0;
    const averagePostLikes = postCount ? (postLikes / postCount).toFixed(2) : 0;
    const averagealbumLikes = albumCount
      ? (albumLikes / albumCount).toFixed(2)
      : 0;

    const averageReelViews = reelsCount
      ? (reelViews / reelsCount).toFixed(2)
      : 0;
    const averagePostViews = postCount ? (postViews / postCount).toFixed(2) : 0;
    const averagealbumViews = albumCount
      ? (albumViews / albumCount).toFixed(2)
      : 0;

    const averageReelShares = reelsCount
      ? (reelShares / reelsCount).toFixed(2)
      : 0;
    const averagePostShares = postCount
      ? (postShares / postCount).toFixed(2)
      : 0;
    const averagealbumShares = albumCount
      ? (albumShares / albumCount).toFixed(2)
      : 0;

    const averageReelComments = reelsCount
      ? (reelComments / reelsCount).toFixed(2)
      : 0;
    const averagePostComments = postCount
      ? (postComments / postCount).toFixed(2)
      : 0;
    const averagealbumComments = albumCount
      ? (albumComments / albumCount).toFixed(2)
      : 0;

    // Prepare Response
    const profileMetrics = {
      user_name : profileData.data.username,
      user_full_name : profileData.data.full_name,
      user_bio : profileData.data.biography,
      user_followers : profileData.data.follower_count,
      user_following : profileData.data.following_count,
      is_verified : profileData.data.is_verified,
      is_business : profileData.data.is_business,
      is_open_to_collab : profileData.data.is_open_to_collab,
      total_posts: totalPosts,
      reel_posts: reelsCount,
      static_image_posts: postCount,
      album_posts: albumCount,
      average_views: {
        reels: averageReelViews,
        posts: averagePostViews,
        albums: averagealbumViews,
      },
      average_likes: {
        reels: averageReelLikes,
        posts: averagePostLikes,
        albums: averagealbumLikes,
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

    // console.log("Profile Metrics:", profileMetrics);
    return NextResponse.json({ profileMetrics, status: 200 });
    
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch Instagram data",
      },
      { status: 500 }
    );
  }
}
