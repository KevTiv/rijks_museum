import axios from 'axios';
import {RIJKS_KEY, RIKS_API_URL} from '@env';
import {RijksDataApiResponse} from './types';

/**
 * Fetches art collection data from the Rijksmuseum API.
 * @param artPieceId - The ID of the art piece to fetch.
 * @param page - The page number to fetch.
 * @param resultsPerPage - The number of results per page.
 * @param imgOnly - Whether to only fetch images or not.
 * @param artist - The name of the artist to filter by.
 * @returns The art collection data.
 * @throws An error if the API key or URL is not set.
 * @throws An error if there is an API error.
 */
export async function getRijksArtCollection({
  artPieceId = '',
  page = 1,
  resultsPerPage = 10,
  imgOnly = true,
  artist = '',
}) {
  if (!RIJKS_KEY || !RIKS_API_URL) {
    throw new Error('RIJKS_KEY or RIKS_API_URL not set');
  }

  try {
    const params = {
      key: RIJKS_KEY,
      p: page,
      ps: resultsPerPage,
      imgonly: imgOnly,
      involvedMaker: artist,
    };

    const endpoint = artPieceId
      ? `${RIKS_API_URL}/${artPieceId}`
      : RIKS_API_URL;

    const response = await axios.get<RijksDataApiResponse>(endpoint, {params});

    return response.data;
  } catch (error) {
    throw new Error('API Error');
  }
}
