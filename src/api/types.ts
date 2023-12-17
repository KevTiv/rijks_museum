export interface RijksDataApiResponse {
  elapsedMilliseconds?: number;
  count?: number;
  countFacets?: CountFacets;
  artObjects?: ArtObject[];
  artObject?: ArtObject;
  artObjectPage?: ArtObjectPage;
  facets?: Facet[];
}

interface CountFacets {
  hasimage?: number;
  ondisplay?: number;
}

export interface ArtObject {
  links?: Links;
  id?: string;
  priref?: string;
  objectNumber?: string;
  language?: string;
  title?: string;
  copyrightHolder?: any;
  webImage?: Image;
  colors?: Color[];
  colorsWithNormalization?: ColorWithNormalization[];
  normalizedColors?: NormalizedColor[];
  normalized32Colors?: NormalizedColor[];
  materialsThesaurus?: string[];
  techniquesThesaurus?: string[];
  productionPlacesThesaurus?: string[];
  titles?: string[];
  description?: string;
  labelText?: any;
  objectTypes?: string[];
  objectCollection?: string[];
  makers?: string[];
  principalMakers?: PrincipalMaker[];
  plaqueDescriptionDutch?: string;
  plaqueDescriptionEnglish?: string;
  principalMaker?: string;
  artistRole?: any;
  associations?: string[];
  acquisition?: Acquisition;
  exhibitions?: string[];
  materials?: string[];
  techniques?: string[];
  productionPlaces?: string[];
  dating?: Dating;
  classification?: Classification;
  hasImage?: boolean;
  historicalPersons?: string[];
  inscriptions?: string[];
  documentation?: string[];
  catRefRPK?: string[];
  principalOrFirstMaker?: string;
  dimensions?: Dimension[];
  physicalProperties?: string[];
  physicalMedium?: string;
  longTitle?: string;
  subTitle?: string;
  scLabelLine?: string;
  label?: Label;
  showImage?: boolean;
  location?: string;
}

interface Links {
  self?: string;
  web?: string;
  search?: string;
}

interface Image {
  guid?: string;
  offsetPercentageX?: number;
  offsetPercentageY?: number;
  width?: number;
  height?: number;
  url?: string;
}

interface Color {
  percentage?: number;
  hex?: string;
}

interface ColorWithNormalization {
  originalHex?: string;
  normalizedHex?: string;
}

interface NormalizedColor {
  percentage?: number;
  hex?: string;
}

interface PrincipalMaker {
  name?: string;
  unFixedName?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  dateOfBirthPrecision?: any;
  dateOfDeath?: string;
  dateOfDeathPrecision?: any;
  placeOfDeath?: string;
  occupation?: string[];
  roles?: string[];
  nationality?: string;
  biography?: any;
  productionPlaces?: string[];
  qualification?: any;
  labelDesc?: string;
}

interface Acquisition {
  method?: string;
  date?: string;
  creditLine?: any;
}

interface Dating {
  presentingDate?: string;
  sortingDate?: number;
  period?: number;
  yearEarly?: number;
  yearLate?: number;
}

interface Classification {
  iconClassIdentifier?: string[];
  iconClassDescription?: string[];
  motifs?: string[];
  events?: string[];
  periods?: string[];
  places?: string[];
  people?: string[];
  objectNumbers?: string[];
}

interface Label {
  title?: string;
  makerLine?: string;
  description?: string;
  notes?: string;
  date?: string;
}

interface Dimension {
  unit?: string;
  type?: string;
  precision?: any;
  part?: any;
  value?: string;
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

interface ArtObjectPage {
  id?: string;
  similarPages?: any[];
  lang?: string;
  objectNumber?: string;
  tags?: string[];
  plaqueDescription?: string;
  audioFile1?: any;
  audioFileLabel1?: any;
  audioFileLabel2?: any;
  createdOn?: string;
  updatedOn?: string;
  adlibOverrides?: {
    titel?: any;
    maker?: any;
    etiketText?: any;
  };
}
