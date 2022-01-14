export function httpFetch(...args) {
  return fetch(...args).then(res => res.json())
}
