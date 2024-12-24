export function formatDate(time: string) {
  const date = new Date(time);
  return date.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
