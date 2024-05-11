export const extractSinceFromLinkHeader = (linkHeader: string) => {
  const nextPattern = /(?<=<)([^>]*)>; rel="next"/i;
  const match = linkHeader.match(nextPattern);
  return match ? getLastQueryParamValue(match[1]) : null;
};

const getLastQueryParamValue = (url: string) => {
  const queryParams = url.split('?')[1];
  if (!queryParams) return null;

  const params = new URLSearchParams(queryParams);
  return params.get('since');
};