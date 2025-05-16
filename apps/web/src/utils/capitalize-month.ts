export const capitalizeMonth = (phrase: string) => {
    const words = phrase.split(" ");
    const monthIndex = words.findIndex((word) => word.toLowerCase() === "de");
    if (monthIndex !== -1) {
      words[monthIndex + 1] = words[monthIndex + 1].charAt(0).toUpperCase() + words[monthIndex + 1].slice(1);
    }
    return words.join(" ");
  } 