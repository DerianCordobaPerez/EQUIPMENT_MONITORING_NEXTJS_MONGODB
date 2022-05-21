/**
 * It takes a URL, fetches the data, and returns the data
 * @param url - The URL to fetch.
 * @returns The data from the json file.
 */
export function fetcher(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)
}
