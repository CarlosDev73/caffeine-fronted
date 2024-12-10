import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../constants/theme';
import { heightPercentage, widthPercentage } from '../helpers/common';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import SearchBar from '../components/SearchBar';
import MainPanel from '../components/MainPanel';
import SearchPopUp from '../components/SearchPopUp'
import { useRouter } from 'expo-router';
import { searchUser } from '../api/users';

const searchProfile = () => {

  const router = useRouter();

  const [search, setSearch] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  const searchProfiles = async (text) => {
    setSearch(text);
    setFilteredProfiles(await searchUser(search));
  };

  const renderProfiles = ({ item }) => (
    <TouchableOpacity onPress={
      () => router.push({
        pathname: 'profile',
        params: { id: item._id },
      })}
    >
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.profileImg?.secure_url }}
          style={styles.imageProfile}
        />
        <View>
          <Text style={styles.textName}>{item.displayName}</Text>
          <Text style={styles.userName}>@{item.userName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <StatusBar style='dark' />
      <View style={styles.header}>
        <Text style={{ fontWeight: theme.fonts.bold, fontSize: heightPercentage(5) }}>Buscar</Text>
        <SearchPopUp backgroundColor={theme.colors.primary} />
      </View>
      <View style={styles.container}>
        <SearchBar
          placeholder="Buscar Perfil" 
          handleSearch={ () => { searchProfiles(search) }} 
          searchVal={search} 
          setSearchVal={setSearch}
        />
        <FlatList
          data={filteredProfiles}
          keyExtractor={(item) => item._id}
          renderItem={renderProfiles}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginVertical: 7 }}>No hay resultados</Text>}
        />
        <View style={styles.mainPanel}>
          <MainPanel />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default searchProfile

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(4)
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: widthPercentage(4),
    marginTop: heightPercentage(2)
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: widthPercentage(2.5),
    marginTop: heightPercentage(4)
  },
  imageProfile: {
    width: heightPercentage(7, 7),
    height: heightPercentage(7, 7),
    borderRadius: heightPercentage(7, 7) / 2,
  },
  textName: {
    fontSize: heightPercentage(2.7),
    marginLeft: heightPercentage(1.2),
    fontWeight: theme.fonts.bold
  },
  userName: {
    fontSize: heightPercentage(2.1),
    marginLeft: heightPercentage(1.2),
    color: "grey"
  },
  mainPanel: {
    alignItems: "center",
  }
})