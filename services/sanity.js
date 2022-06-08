import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT,
  dataset: 'production',
  apiVersion: '2022-06-07',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export function imageUrlFor (source) {
  if(source !== undefined)
    return builder.image(source).url();
}