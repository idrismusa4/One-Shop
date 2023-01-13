import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomRating from './CustomRating';

const ProductReview = ({ review }) => {
  const dateObj = new Date(review.createdAt);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return (
    <View style={styles.reviewContainer}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <CustomRating defaultRating={review.rating} />
        <Text style={styles.reviewDate}>{`${day}-${month}-${year}`}</Text>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Text style={styles.reviewUsername}>by {review.sender_name}</Text>
        <Text style={styles.verifiedText}>verified purchase</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 5
  },
  reviewUsername: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5
  },
  reviewDate: {
    fontSize: 12,
    color: 'gray'
  },
  verifiedText: {
    color: '#dbd40b'
  }
});

export default ProductReview;
