import React from 'react';
import { View, StyleSheet } from 'react-native';
import CardAnime from './../components/CardAnime';

export default function App() {
  const apiUrl = 'https://backend-anim-eggss.vercel.app/'; // Ganti dengan URL API yang sesuai

  return (
    <View style={styles.container}>
      <CardAnime apiUrl={apiUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
