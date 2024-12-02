import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { heightPercentage } from '../helpers/common';
import Feather from '@expo/vector-icons/Feather';

const OptionsButtons = ({ tags, onSelectTag, selectedTags }) => {

  const [selectedTagsState, setSelectedTagsState] = useState({});

  useEffect(() => {
    // Initialize selected tags from props
    const initialSelectedTags = selectedTags.reduce((acc, tag) => {
      acc[tag] = true;
      return acc;
    }, {});
    setSelectedTagsState(initialSelectedTags);
  }, [selectedTags]);

  const toggleTagSelection = (tag) => {
    const isSelected = selectedTagsState[tag];
    setSelectedTagsState((prev) => ({
      ...prev,
      [tag]: !isSelected,
    }));
    onSelectTag(tag, !isSelected); // Pass the toggle state to the parent
  };


  return (
    <View style={styles.container}>
      {tags.map((tag) => {
        const isSelected = selectedTagsState[tag];
        return (
          <View style={styles.tagContainer} key={tag}>
            <TouchableOpacity
              style={[styles.tag, isSelected && styles.selectedTag]}
              onPress={() => toggleTagSelection(tag)}
            >
              <Text style={styles.tagText}>{tag}</Text>
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
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'flex-start', 
    marginVertical: heightPercentage(2),
  },
  row: {
    justifyContent: 'space-between',
    marginVertical: heightPercentage(0.5)
  },
  tagContainer: {
    alignItems: 'center',
    marginHorizontal: 3,
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
