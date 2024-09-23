const getNewPaginatedUrl = (urlSearchQuery:string, page: number) => {
  const hasPageParam = urlSearchQuery.includes("?page=");

  let url = "?page=" + page;

  if (hasPageParam) {
    const updatedPage = "page=" + page.toString();
    url = location.search.replace(/page=\d+/, updatedPage);
  }

  return url;
};

export default getNewPaginatedUrl;
