export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  return new Date(date).toLocaleDateString(undefined, options);
}

export function countStrings(arr: string[]): Record<string, number> {
  // const counted: Record<string, number> = {};

  // arr.forEach((str) => {
  //   if (counted[str]) {
  //     counted[str]++;
  //   } else {
  //     counted[str] = 1;
  //   }
  // });
  // return counted;

  return arr.reduce(
    (acc, str) => {
      if (str) {
        acc[str] = (acc[str] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
}

// export { formatDate, countStrings };
