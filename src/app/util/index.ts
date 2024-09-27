export const getStarCount = (stars: number) => {
  if (stars > 1000) {
    return `${Math.round(stars / 1000)}k`;
  }
  return stars;
};
