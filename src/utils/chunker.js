export default function chunkate(arr, len) {
  let chunks = [];
  let i = 0;
  let n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}
