import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

// Interface for the SEO metadata and props of SeoHead component
interface SeoMeta {
  title?: string;
  siteName?: string;
  description?: string;
  url?: string;
  type?: string;
  robots?: string;
  image?: string;
  date?: string;
  author?: string;
  templateTitle?: string;
}

// Default value for some meta data
const defaultMeta: SeoMeta = {
  title: 'LaslesVPN',
  siteName: 'LaslesVPN',
  description: 'Landing page VPN LaslesVPN Best VPN For Privacy, Country and Cheapest',
  url: 'https://next-landing-vpn.vercel.app',
  type: 'website',
  robots: 'follow, index',
  image: 'https://next-landing-vpn.vercel.app/assets/card-image.png',
  author: 'Lorem Ipsum',
};

/**
 * Next Head component populated with necessary SEO tags and title
 * @example
 * <SeoHead title="Page's Title" />
 */
const SeoHead: React.FC<SeoMeta> = (props) => {
  const router = useRouter();
  const meta: SeoMeta = {
    ...defaultMeta,
    ...props,
  };

  // Use siteName if there is templateTitle
  // but show full title if there is none
  meta.title = props.templateTitle ? `${props.templateTitle} | ${meta.siteName}` : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@F2aldi' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta name='publish_date' property='og:publish_date' content={meta.date} />
          <meta name='author' property='article:author' content={meta.author} />
        </>
      )}
      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      {/* Windows 8 app icon */}
      <meta name='msapplication-TileColor' content='#F53838' />
      <meta name='msapplication-TileImage' content='/favicon/ms-icon-144x144.png' />
      {/* Accent color on supported browser */}
      <meta name='theme-color' content='#F53838' />
    </Head>
  );
};

// Favicons, other icons, and manifest definition
const favicons = [
  {
    rel: 'apple-touch-icon',
    sizes: '57x57',
    href: '/favicon/apple-icon-57x57.png',
  },
  // Add other favicons here as needed
];

export default SeoHead;