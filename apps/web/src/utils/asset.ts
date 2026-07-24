// Prefixes a public/absolute asset path with Vite's BASE_URL so images resolve
// correctly when the app is served from a sub-path (e.g. GitHub Pages /<repo>/).
export function asset(path: string): string {
  if (!path) {
    return path;
  }
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) {
    return path;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
