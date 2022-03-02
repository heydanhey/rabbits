import * as cheerio from 'cheerio';

export type RabbitPost = {
  id: string;
  img: string | null;
  url: string;
  title: string | null;
}

async function getIndex() {
  const response = await fetch('https://chicago.craigslist.org/search/pet?query=rabbit')
  const page = await response.text()
  return page 
}

async function getPost(url: string, id: string): Promise<RabbitPost> {
  const response = await fetch(url)
  const page = await response.text()
  const $ = cheerio.load(page);
  const img = $('.gallery').find('img').attr('src') || null
  const title = $('#titletextonly').text()
  return {
    id,
    img,
    url,
    title
  }
}

export async function getRabbitPosts() {
  const index = await getIndex()
  const $ = cheerio.load(index);

  const promises: Promise<RabbitPost>[] = []

  $('.hdrlnk').each((i, el) => {
    const link = $(el).attr('href')
    const id = $(el).attr('id')
    if (link && id) {
      promises.push(getPost(link, id))
    }
  })

  return await Promise.all(promises)
}
