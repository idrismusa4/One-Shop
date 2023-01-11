import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Circle } from 'react-native-animated-spinkit';
import CustomRating from './CustomRating';

const AddReview = ({ handleSubmitReview, reviewLoading }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);

    return (
        <View style={{ marginTop: 10, paddingVertical: 10 }}>
            <Text style={{ fontSize: 15 }}>ADD YOUR REVIEW</Text>

            <CustomRating defaultRating={rating} setRating={setRating} />
            <TextInput
                style={{ borderColor: 'gray', borderWidth: 1, textAlignVertical: 'top', padding: 20, marginVertical: 10 }}
                onChangeText={text => setReview(text)}
                value={review}
                multiline={true}
                numberOfLines={10}
            />
            <TouchableOpacity onPress={ () => { handleSubmitReview(review, rating), setReview('') } } style={{ backgroundColor: '#C0DD4D', elevation: 3, borderRadius: 5, height: 30, width: '50%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                {
                    !reviewLoading ?
                    <Text>Submit</Text>
                    :
                    <Circle size={15} />

                }
            </TouchableOpacity>
        </View>
    );
};

export default AddReview;
