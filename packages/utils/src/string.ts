export const getSingular = (word: string) => {
  if (word.endsWith("ies")) {
    return word.slice(0, -3) + "y";
  } else if (word.endsWith("s")) {
    return word.slice(0, -1);
  }

  throw new Error(`Cannot get singular of ${word}`);
};

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function unCapitalize(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export function unSlugify(text: string, options?: { capitalize?: boolean }) {
  if (!text) return "";
  const unSlugifiedText = text.replaceAll("-", " ");
  return options?.capitalize ? capitalize(unSlugifiedText) : unSlugifiedText;
}

export function truncateString(text: string, length: number) {
  let truncateText;
  if (text.length > length) {
    truncateText = text.slice(0, length);
    if (text.charAt(length) === " ") {
      return truncateText;
    } else {
      return truncateText.slice(0, truncateText.lastIndexOf(" ")) + "...";
    }
  }
  return text;
}
export function slugify(text: string) {
  if (!text) return "";
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function removeWhitespace(text: string, replaceWith?: string) {
  return text.replace(" ", replaceWith ?? "_");
}
