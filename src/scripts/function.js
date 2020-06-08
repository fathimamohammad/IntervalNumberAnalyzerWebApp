export const isFibonocci = (num) => {
  if (
    isPerfectSquare(5 * Math.pow(num, 2) + 4) ||
    isPerfectSquare(5 * Math.pow(num, 2) - 4)
  ) {
    return true;
  }
  return false;
};
function isPerfectSquare(n) {
  return n > 0 && Math.sqrt(n) % 1 === 0;
}
