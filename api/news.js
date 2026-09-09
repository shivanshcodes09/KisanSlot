const QUERIES = [
  'India agriculture MSP procurement farmers when:7d',
  'Haryana paddy procurement mandi farmers when:7d',
  'FCI foodgrain procurement India when:7d',
  'site:pib.gov.in agriculture farmers procurement MSP when:7d'
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
    if (title && link && pubDate) items.push({ title, link, pubDate, source });
  }
  return items;
}

module.exports = async function handler(req, res) {
  const diagnostics = [];
  try {
    const all = [];
    for (const q of QUERIES) {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-IN&gl=IN&ceid=IN:en`;
      try {
        const r = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; KisanSlot/1.0; +https://kisanslot.app)',
            'Accept': 'application/rss+xml, application/xml, text/xml, */*'
          }
        });
        diagnostics.push({ query: q, status: r.status });
        if (!r.ok) continue;
        const xml = await r.text();
        all.push(...parseItems(xml));
      } catch (err) {
        diagnostics.push({ query: q, error: String(err) });
      }
    }

    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const seen = new Set();
    const unique = all
      .filter(x => new Date(x.pubDate).getTime() >= cutoff)
      .filter(x => {
        const key = x.title.toLowerCase().replace(/\s+/g, ' ').trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a,b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, 15);

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json({
      updatedAt: new Date().toISOString(),
      live: unique.length > 0,
      count: unique.length,
      items: unique,
      diagnostics
    });
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(500).json({ error: 'Unable to fetch live news', live: false, items: [], diagnostics });
  }
};