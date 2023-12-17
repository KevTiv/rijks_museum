import axios from 'axios';
import {RIJKS_KEY, RIKS_API_URL} from '@env';
import {RijksDataApiResponse} from './types';

export async function getRijksArtCollection({
  artPieceId = '',
  page = 1,
  resultsPerPage = 10,
  imgOnly = true,
  artist = '',
}) {
  const url = `${RIKS_API_URL}${artPieceId}?key=${RIJKS_KEY}&p=${page}&ps=${resultsPerPage}&imgonly=${imgOnly}${
    artist.length > 0 ? `&involvedMaker=${artist}` : ''
  }`;

  try {
    const response = await axios.get<RijksDataApiResponse>(url);
    return response.data;
  } catch (error) {
    throw new Error('API Error');
  }
}
