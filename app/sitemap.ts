import type {MetadataRoute} from 'next';
export default function sitemap():MetadataRoute.Sitemap{const base='https://amit.dev';return ['','/about','/experience','/projects','/contact'].map(path=>({url:`${base}${path}`,lastModified:new Date()}))}
