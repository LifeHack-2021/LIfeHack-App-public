import React, { useState } from 'react';
import { ImageBackground } from 'react-native'
import { Rating } from 'react-native-ratings';

import {
    VStack,
    Button,
    FormControl,
    Input,
    Image,
    Text,
    Box,
    ScrollView,
    View,
    Center,
    HStack
} from 'native-base';
import { SERVER_URL } from '../../variables';
import axios from 'axios';


function ReviewForm(props) {
    const [scrollOffset, setScrollOffset] = useState({ y: 0 })
    const [formData, setFormData] = useState({ review: '' })
    const [rating, setRating] = useState(0)

    // console.log(props.obj)

    function submitHandler() {

        //post to db the review + rating
        axios.post(`${SERVER_URL}/items/setRating`, {
            index: props.obj.id,
            rating: rating * 20,
        })
            .then(res => { console.log(res.data) })
            .catch(err => { console.log(err) })

        //post to DB for review
        // axios.post(``) 


        //go to appreciation page
        props.setReviewVisible(false)
        props.setAppreciateVisible(true)
    }

    return (
        <Center marginTop={5}>
            <ScrollView>
                <VStack width="90%" mx={3}>
                    <FormControl isRequired mx='auto' my={5} style width={250}>
                        <FormControl.Label _text={{ bold: true, fontSize: 20 }}>How was the product?</FormControl.Label>
                        <Input
                            numberOfLines={20}
                            placeholder="Review"
                            height={300}
                            multiline={true}
                            onChangeText={(value) => setFormData({ ...formData, review: value })}
                        />

                    </FormControl>

                    <FormControl isRequired mx='auto' my={5} style width={250}>
                        <FormControl.Label _text={{ bold: true, fontSize: 20 }}>Rating:</FormControl.Label>
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={50}
                            fractions={0}
                            jumpValue={1}
                            startingValue={rating}
                            onFinishRating={(z) => { setRating(z) }}
                        />
                    </FormControl>


                    <Button onPress={() => { submitHandler() }} mt={5} colorScheme="cyan">
                        Submit
                    </Button>
                </VStack>

            </ScrollView>
        </Center>

    );
}
export default ReviewForm