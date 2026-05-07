export function getCollection(): Promise<never[]> {
  throw new Error('astro:content getCollection mock should be replaced in tests that rely on content loading.');
}
