async function getCount(url) {
  const res = await fetch(url);
  const data = await res.json();
  return Array.isArray(data) ? data.length : 0;
}

(async () => {
  const base = process.env.BASE_URL || 'http://localhost:4321';
  try {
    const allUrl = `${base}/api/v1/fetchProjectsFeed.json`;
    const featuredUrl = `${base}/api/v1/fetchProjectsFeed.json?featured=true`;

    const allCount = await getCount(allUrl);
    const featuredCount = await getCount(featuredUrl);

    console.log('All projects count:', allCount);
    console.log('Featured projects count:', featuredCount);

    if (featuredCount > allCount) {
      console.error('ERROR: featured count should not exceed total count');
      process.exit(2);
    }

    console.log('Test passed');
  } catch (err) {
    console.error('Test failed', err);
    process.exit(1);
  }
})();
