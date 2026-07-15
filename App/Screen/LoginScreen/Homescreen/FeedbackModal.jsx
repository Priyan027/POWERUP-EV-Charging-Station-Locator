import React, { useContext, useState, useEffect } from 'react';
import {
  Modal, View, Text, TextInput, Button,
  StyleSheet, TouchableOpacity
} from 'react-native';
import { FeedbackContext } from './../../../context/FeedbackContext';
import { Ionicons } from '@expo/vector-icons';

export default function FeedbackModal() {
  const {
    isFeedbackModalVisible,
    hideFeedbackModal,
    lastNavigatedLocation,
    saveFeedback,
    addToFavorites
  } = useContext(FeedbackContext);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [recommend, setRecommend] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Extract name/address directly from lastNavigatedLocation
  const name = lastNavigatedLocation?.name || 'Unnamed Location';
  const address = lastNavigatedLocation?.address || 'No address available';

  const handleSubmit = () => {
    saveFeedback({
      location: lastNavigatedLocation,
      rating,
      comment,
      recommend,
      date: new Date()
    });

    hideFeedbackModal();
    setRating(0);
    setComment('');
    setRecommend(null);
    setIsFavorite(false);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite && lastNavigatedLocation) {
      addToFavorites({
        name,
        address,
        location: lastNavigatedLocation
      });
    }
  };

  return (
    <Modal visible={isFeedbackModalVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Favorite Button */}
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={30}
              color={isFavorite ? 'red' : '#ccc'}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Rate Your EV Station</Text>

          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity key={num} onPress={() => setRating(num)}>
                <Ionicons
                  name={rating >= num ? 'star' : 'star-outline'}
                  size={30}
                  color="#ffd700"
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Write your feedback..."
            value={comment}
            onChangeText={setComment}
            style={styles.input}
            multiline
          />

          <View style={styles.recommendRow}>
            <Text>Would you recommend it?</Text>
            <TouchableOpacity onPress={() => setRecommend(true)}>
              <Ionicons
                name="thumbs-up"
                size={30}
                color={recommend === true ? 'green' : 'gray'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRecommend(false)}>
              <Ionicons
                name="thumbs-down"
                size={30}
                color={recommend === false ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </View>

          <Button title="Submit Feedback" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    position: 'relative'
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 80,
    marginBottom: 10
  },
  recommendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1
  }
});
