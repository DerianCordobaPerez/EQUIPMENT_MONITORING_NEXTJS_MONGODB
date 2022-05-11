export const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)
