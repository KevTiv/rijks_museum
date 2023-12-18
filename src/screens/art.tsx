import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenContainer} from '../components/screenContainer';
import FastImage from 'react-native-fast-image';
import {useAppNavigation, useAppRoute} from '../hooks/appNavigation';
import {ROUTES} from '../router/routes';
import {useQuery} from '@tanstack/react-query';
import {getRijksArtCollection} from '../api/rijksMuseum';

export const ArtScreen = () => {
  const router = useAppNavigation();
  const {params} = useAppRoute<typeof ROUTES.ART>();
  const artPieceId = params.id?.split('-').slice(1).join('-');
  const {data: artPiece, isLoading} = useQuery({
    queryKey: [`${ROUTES.ART}-${params.id}`],
    queryFn: () =>
      getRijksArtCollection({
        artPieceId,
      }),
    enabled: !!artPieceId,
  });

  return (
    <ScreenContainer>
      <ScrollView>
        <FastImage
          style={styles.imgContainer}
          source={{uri: params?.webImage?.url}}
          resizeMode={FastImage.resizeMode.cover}
        />
        {artPiece && !isLoading && (
          <>
            <TouchableWithoutFeedback
              onPress={() => {
                if (artPiece?.artObject?.principalMaker) {
                  router.navigate(ROUTES.ARTIST, {
                    name: artPiece.artObject.principalMaker,
                  });
                }
              }}>
              <Text style={styles.artist}>
                {artPiece?.artObject?.principalMaker}
              </Text>
            </TouchableWithoutFeedback>

            <Text style={styles.title}>{params?.longTitle}</Text>
            <Text style={styles.description}>
              {artPiece?.artObject?.plaqueDescriptionEnglish}
            </Text>
            <Text style={styles.description}>
              {artPiece?.artObject?.label?.makerLine}
            </Text>
            <Text style={styles.description}>
              {artPiece?.artObject?.label?.description}
            </Text>
            <Text style={styles.subLabel}>
              Dimensions: {artPiece?.artObject?.subTitle}
            </Text>
            {artPiece.artObject?.location && (
              <Text style={styles.subLabel}>
                Location: {artPiece?.artObject?.location}
              </Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity>
                <Text style={styles.subLabel}>Add to bokmarks</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.subLabel}>remove from bokmarks</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.subLabel}>download</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    marginVertical: 4,
  },
  artist: {
    fontSize: 12,
    fontWeight: '700',
    marginVertical: 8,
    color: 'blue',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 8,
    marginHorizontal: 2,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  imgContainer: {
    width: '100%',
    height: 350,
    borderRadius: 8,
    opacity: 0.9,
  },
});
