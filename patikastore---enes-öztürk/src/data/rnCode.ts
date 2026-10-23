export const REACT_NATIVE_FILES = [
  {
    name: 'App.js',
    path: 'App.js',
    language: 'javascript',
    description: 'Ana bileşen: FlatList (numColumns={2}), SearchBar ve PatikaStore başlığı.',
    code: `import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import products_data from './products_data.json';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';

// Hazırlayan: Enes Öztürk - PatikaStore Ödevi
const App = () => {
  const [searchValue, setSearchValue] = useState('');

  // Arama filtreleme
  const filteredProducts = products_data.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderProduct = ({ item }) => <ProductCard product={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header_text}>PATIKASTORE</Text>
      <SearchBar
        placeholder="Ara..."
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list_container}
      />
      <View style={styles.signature_container}>
        <Text style={styles.signature_text}>Geliştirici: Enes Öztürk</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  header_text: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#800080', // PatikaStore mor rengi
    marginVertical: 10,
    letterSpacing: 0.5,
  },
  list_container: {
    paddingBottom: 20,
  },
  signature_container: {
    paddingVertical: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eceff1',
  },
  signature_text: {
    fontSize: 12,
    color: '#90a4ae',
    fontWeight: '600',
  },
});

export default App;`
  },
  {
    name: 'ProductCard.js',
    path: 'components/ProductCard/ProductCard.js',
    language: 'javascript',
    description: 'Ürün kartı bileşeni: 2 sütunlu görünüm, stok kontrolü ("STOKTA YOK") ve görsel.',
    code: `import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './ProductCard.style';

// Enes Öztürk - ProductCard Component
const ProductCard = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: product.imgURL }}
        resizeMode="contain"
      />
      <View style={styles.inner_container}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>
        {!product.inStock && (
          <Text style={styles.out_of_stock}>STOKTA YOK</Text>
        )}
      </View>
    </View>
  );
};

export default ProductCard;`
  },
  {
    name: 'ProductCard.style.js',
    path: 'components/ProductCard/ProductCard.style.js',
    language: 'javascript',
    description: 'Kart stilleri: Açık gri arka plan (#eceff1), esnek yükseklik ve kırmızı stok uyarı metni.',
    code: `import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
    margin: 5,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  image: {
    height: height / 4.5,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inner_container: {
    marginTop: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000000',
  },
  price: {
    marginTop: 4,
    color: '#757575',
    fontWeight: 'bold',
    fontSize: 14,
  },
  out_of_stock: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 4,
    textTransform: 'uppercase',
  },
});`
  },
  {
    name: 'SearchBar.js',
    path: 'components/SearchBar/SearchBar.js',
    language: 'javascript',
    description: 'Arama çubuğu bileşeni: TextInput ile gri yuvarlatılmış giriş alanı.',
    code: `import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './SearchBar.style';

// Enes Öztürk - SearchBar Component
const SearchBar = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Ara...'}
        placeholderTextColor="#9e9e9e"
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default SearchBar;`
  },
  {
    name: 'SearchBar.style.js',
    path: 'components/SearchBar/SearchBar.style.js',
    language: 'javascript',
    description: 'Arama kutusu stilleri: #eceff1 arka plan, yuvarlak köşeler ve dolgu.',
    code: `import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#eceff1',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#333333',
  },
});`
  }
];
