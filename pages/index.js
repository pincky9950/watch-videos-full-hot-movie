import Head from "next/head";

export default function Home({ meta }) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />

        {/* Common OG */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.shareUrl} />

        {/* IMAGE PREVIEW */}
        {meta.type === "IMAGE" && (
          <>
            <meta property="og:type" content="article" />
            <meta property="og:image" content={meta.image} />
          </>
        )}

        {/* VIDEO PREVIEW */}
        {meta.type === "VIDEO" && (
          <>
            <meta property="og:type" content="video.other" />
            <meta property="og:video" content={meta.video} />
            <meta property="og:video:secure_url" content={meta.video} />
            <meta property="og:video:type" content="video/mp4" />
            <meta property="og:video:width" content="1280" />
            <meta property="og:video:height" content="720" />
            <meta property="og:image" content={meta.image} /> {/* fallback */}
          </>
        )}

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

  // 🔴 TOGGLE HERE (बस यही change करना है)
  const ACTIVE_MODE = "VIDEO"; // VIDEO | IMAGE

  // 🔵 COMMON DATA
  const PAGE = {
    title: "Top Multi Specialty Hospitals in Chennai",
    description:
      "Check top multi specialty hospitals in Chennai for advanced medical care.",
    shareUrl: "https://YOUR-PROJECT.vercel.app/",
    redirect:
      "https://tech.symbolsemoji.com/health/top-10-multi-specialty-hospitals-in-chennai-for-advanced-medical-care/",

    // IMAGE
    image:
      "https://tech.symbolsemoji.com/wp-content/uploads/2024/12/hospital.jpg",

    // VIDEO (direct mp4)
    video:
      "https://tech.symbolsemoji.com/wp-content/uploads/2024/12/hospital-video.mp4"
  };

  // 👤 Normal user → direct redirect
  if (!isFacebook) {
    return {
      redirect: {
        destination: PAGE.redirect,
        permanent: false
      }
    };
  }

  // 🤖 Facebook → preview only
  return {
    props: {
      meta: {
        type: ACTIVE_MODE,
        title: PAGE.title,
        description: PAGE.description,
        image: PAGE.image,
        video: PAGE.video,
        shareUrl: PAGE.shareUrl
      }
    }
  };
}
