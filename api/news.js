const QUERIES = [
  'India agriculture MSP procurement farmers',
  'Haryana paddy procurement mandi farmers',
  'foodgrain procurement India FCI'
];

const decode = (s = '') => s
  .replace(/<!\[CDATA\[|\]\]>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

function parseItems(xml) {
  const items = [];
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  for (const block of blocks) {
    const pick = (tag) => {
      const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
      return m ? decode(m[1].trim()) : '';
    };
    const title = pick('title');
    const link = pick('link');
    const pubDate = pick('pubDate');
    const sourceMatch = block.match(/<source[^>]*>([\s\S]*?)<\/source>/);
    const source = sourceMatch ? decode(sourceMatch[1].trim()) : 'News source';
    if (title && link) items.push({ title, link, pubDate, source });
  }
  return items;
}

module.exports = async function handler(req, res) {
  try {
    const all = [];
    for (const q of QUERIES) {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-IN&gl=IN&ceid=IN:en`;
      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 KisanSlot/1.0' } });
      if (!r.ok) continue;
      const xml = await r.text();
      all.push(...parseItems(xml));
    }

    const seen = new Set();
    const unique = all
      .filter(x => {
        const key = x.title.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a,b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, 12);

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');
    return res.status(200).json({ updatedAt: new Date().toISOString(), items: unique });
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch live news', items: [] });
  }
};
