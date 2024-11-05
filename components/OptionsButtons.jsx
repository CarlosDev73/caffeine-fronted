import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { heightPercentage } from '../helpers/common';
import Feather from '@expo/vector-icons/Feather';

const OptionsButtons = ({ tags, onSelectTag }) => {

  const [selectedTags, setSelectedTags] = useState({});

  const selectedTag = (item) => {
    onSelectTag(item);
    setSelectedTags((prevSelectedTags) => ({
      ...prevSelectedTags,
      [item]: !prevSelectedTags[item],
    }));
  }

  const renderItem = ({ item }) => {
    const isSelected = selectedTags[item];
    return (
      <View style={[styles.tagContainer]}>
        <TouchableOpacity style={[styles.tag, isSelected && styles.selectedTag]} onPress={() => selectedTag(item)}>
          <Text style={styles.tagText}>{item}</Text>
          {isSelected && <Feather name="x" size={15} color="black" />}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginVertical: heightPercentage(2)}}>
      {tags.map((item, index) => {
        const isSelected = selectedTags[item];
        return (
          <View style={[styles.tagContainer]} key={index}>
            <TouchableOpacity style={[styles.tag, isSelected && styles.selectedTag]} onPress={() => selectedTag(item)}>
              <Text style={styles.tagText}>{item}</Text>
              {isSelected && <Feather name="x" size={15} color="black" />}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default OptionsButtons;

const styles = StyleSheet.create({
  container: {
    marginVertical: heightPercentage(2)
  },
  row: {
    justifyContent: 'space-between',
    marginVertical: heightPercentage(0.5)
  },
  tagContainer: {
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: heightPercentage(0.7)
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 2,
  },
  selectedTag: {
    backgroundColor: '#ffc6df',
  },
  tagText: {
    fontSize: 16,
    color: '#333',
  },
  tagClose: {
    marginLeft: 5,
    color: '#333',
  },
});
