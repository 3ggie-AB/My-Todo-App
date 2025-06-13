import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const AnimeDetailScreen = ({ route }) => {
  const { animeId } = route.params; // Ambil animeId dari params
  const [animeDetail, setAnimeDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnimeDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:4321/${animeId}`); // Sesuaikan URL
      setAnimeDetail(response.data);
    } catch (error) {
      console.error('Gagal mengambil detail anime:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeDetail();
  }, [animeId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {animeDetail && (
        <>
          <Text style={styles.title}>{animeDetail.node.title}</Text>
          <Image source={{ uri: animeDetail.node.main_picture?.large }} style={styles.image} />
          <Text style={styles.description}>{animeDetail.node.synopsis}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default AnimeDetailScreen;
