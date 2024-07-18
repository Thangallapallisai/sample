import Head from 'next/head';
import Gallery from '../components/Gallery';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next.js Image Gallery</title>
        <meta name="description" content="Image gallery with Cloudinary and Next.js" />
      </Head>

      <main>
        <h1>2022 Event Photos</h1>
        <Gallery />
      </main>
    </div>
  );
}
