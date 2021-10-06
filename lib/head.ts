import { join } from 'path'
import MetaInfo from 'vue-meta'

export function head(
  siteTitle: string,
  title: string,
  description: string,
  ogImage: string,
  baseURL: string,
  $img: any
): MetaInfo {
  const ret = {
    title: `${title} - ${siteTitle}`,
    meta: [
      {
        hid: 'og:title',
        name: 'og:title',
        content: `${title} - ${siteTitle}`,
      },
    ],
  }
  if (description) {
    ret.meta.push({
      hid: 'description',
      name: 'description',
      content: description,
    })
    ret.meta.push({
      hid: 'og:description',
      name: 'og:description',
      content: description,
    })
  }
  if (ogImage) {
    ret.meta.push({
      hid: 'og:image',
      name: 'og:image',
      content: `${baseURL}${$img(ogImage)}`,
    })
    ret.meta.push({
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    })
  }
  return ret
}
