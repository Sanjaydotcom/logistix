export async function useAutoCaps(item: string) {
  const lowercase = item.toLowerCase();
  const words = lowercase.split(" ");
  const caps = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
  return caps;
}
