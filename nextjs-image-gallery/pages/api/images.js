import { v2 as cloudinary } from 'cloudinary';

export default async function handler(req, res) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    console.log('Fetching images from Cloudinary');
    const { resources } = await cloudinary.search
      .expression('folder:nextjs-image-gallery')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

    const images = resources.map((resource) => {
      const { asset_id, public_id, format, version } = resource;
      return {
        asset_id,
        public_id,
        format,
        version,
      };
    });

    console.log('Images fetched:', images);
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}
