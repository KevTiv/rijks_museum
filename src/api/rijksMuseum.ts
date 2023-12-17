import axios from 'axios';
import Config from 'react-native-config';

const URL_API = 'https://www.rijksmuseum.nl/api/en/collection/';

export async function getRijksArtCollection({
  artPieceId = '',
  page = 1,
  resultsPerPage = 10,
  imgOnly = true,
  artist = '',
}) {
  const params = new URLSearchParams();

  Object.entries({
    key: Config.RIJKS_KEY,
    p: page,
    ps: resultsPerPage,
    imgonly: imgOnly,
    involvedMaker: artist,
  }).forEach(([key, value]) => {
    if (value !== '' || value !== undefined) {
      params.append(key, String(value));
    }
  });

  try {
    const response = await axios.get<RijksDataApiResponse>(
      `${URL_API}${artPieceId}`,
      {
        params,
      },
    );

    return response.data;
  } catch {
    throw new Error('API Error');
  }
}
