export default function matchesAnyItem(protectedMatcher: string[], input: string): boolean {
  return protectedMatcher.some((item) => {
    try {
      const regex = new RegExp(item);
      return regex.test(input);
    } catch (error) {
      return input === item; // Invalid regular expression, doesn't match input
    }
  });
}
