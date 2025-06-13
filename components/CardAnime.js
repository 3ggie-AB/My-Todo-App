import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

const AnimeList = ({ apiUrl }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnimeData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          limit: 100
        }
      });

      console.log('Received data:', response.data);
      setAnimeList(response.data.data); // Sesuaikan struktur response
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiUrl) {
      fetchAnimeData();
    }
  }, [apiUrl]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.node.title}
      </Text>
      <Image source={{ uri: item.node.main_picture?.medium }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anime List</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }} 
          data={animeList}
          keyExtractor={(item) => item.node.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  card: {
    width: 140,
    height: 240,
    backgroundColor: '#ffffff',
    padding: 10,
    marginLeft: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
    minHeight: 30,
  },
  image: {
    marginTop: 10,
    width: 110,
    height: 160,
    borderRadius: 8,
  },
});

export default AnimeList;
