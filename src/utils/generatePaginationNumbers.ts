export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number,
) => {
  // If total pages number is less than 7 or less  show "..."

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  //   if the acurrent page is between the first 3 pages show the first 3, '...' and the last 2
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  //   if the actual page is between the last 3 pages show the last 2, '...' and the last 3 pages
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 1, totalPages];
  }

  // if the current page is in some in the middle show the 1 page, '...', the actual page and the close one
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
