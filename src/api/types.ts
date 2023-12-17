interface RijksDataApiResponse {
  elapsedMilliseconds?: number;
  count?: number;
  countFacets?: CountFacets;
  artObjects?: ArtObject[];
  facets?: Facet[];
}

interface CountFacets {
  hasimage?: number;
  ondisplay?: number;
}

interface ArtObject {
  links?: Links;
  id?: string;
  objectNumber?: string;
  title?: string;
  hasImage?: boolean;
  principalOrFirstMaker?: string;
  longTitle?: string;
  showImage?: boolean;
  permitDownload?: boolean;
  webImage?: Image;
  headerImage?: Image;
  productionPlaces?: string[];
}

interface Links {
  self?: string;
  web?: string;
}

interface Image {
  guid?: string;
  offsetPercentageX?: number;
  offsetPercentageY?: number;
  width?: number;
  height?: number;
  url?: string;
}

interface Facet {
  facets?: KeyValuePair[];
  name?: string;
  otherTerms?: number;
  prettyName?: number;
}

interface KeyValuePair {
  key?: string;
  value?: number;
}
