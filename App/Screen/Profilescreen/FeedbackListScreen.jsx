import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FeedbackContext } from './../../context/FeedbackContext'; // Adjust the import path if needed
import { useNavigation } from '@react-navigation/native';  // Import useNavigation hook

const FeedbackListScreen = () => {
  const { feedbacks } = useContext(FeedbackContext);
  const navigation = useNavigation();  // Use the useNavigation hook

  // Log feedbacks to check if state is updating correctly
  useEffect(() => {
    console.log('Updated Feedbacks:', feedbacks);
  }, [feedbacks]); // Trigger log on feedback change

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Given Feedbacks</Text>

      <ScrollView style={styles.feedbackList}>
        {feedbacks.length === 0 ? (
          <Text style={styles.noFeedback}>You have not given any feedback yet.</Text>
        ) : (
          feedbacks.map((feedback, index) => (
            <View key={index} style={styles.feedbackBox}>
              <Text style={styles.stationName}>Station: {feedback.location?.name || "Unknown"}</Text>
              <Text style={styles.rating}>Rating: {feedback.rating || "No Rating"}</Text>
              <Text style={styles.comment}>Comment: {feedback.comment || "No Comment"}</Text>
              <Text style={styles.timestamp}>Feedback given on: {new Date(feedback.timestamp).toLocaleString()}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back to Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  feedbackList: {
    marginBottom: 30,
  },
  feedbackBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 16,
    marginVertical: 5,
  },
  comment: {
    fontSize: 14,
    marginVertical: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  noFeedback: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedbackListScreen;
