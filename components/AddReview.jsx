import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CustomRating from './CustomRating';

const AddReview = () => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = () => {
        // Send the review and rating to the server or perform any other action here
        console.log(`Review: ${review}`);
        console.log(`Rating: ${rating}`);
        alert('Review submitted successfully!')
    }

    return (
        <View>
            <Text>Add your review:</Text>
            <CustomRating defaultRating={rating} setRating={setRating} />
            <TextInput
                style={{ borderColor: 'gray', borderWidth: 1, textAlignVertical: 'top', padding: 20 }}
                onChangeText={text => setReview(text)}
                value={review}
                multiline={true}
                numberOfLines={10}
            />
            <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#C0DD4D', elevation: 3, borderRadius: 5, height: 30, width: '50%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddReview;
