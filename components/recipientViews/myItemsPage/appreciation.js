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


function AppreciationForm(props) {
    const [scrollOffset, setScrollOffset] = useState({ y: 0 })
    const [formData, setFormData] = useState({ appreciation: '' })

    // console.log(props.obj)

    function submitHandler() {
        //post to db the review + rating
        // console.log(formData)
        //pending post to db here : 

        //go to items page
        props.setItemsView(true)
        props.setAppreciateVisible(false)
    }


    return (
        <Center marginTop={5}>
            <ScrollView>
                <VStack width="90%" mx={3}>
                    <FormControl mx='auto' my={5} style width={250}>
                        <FormControl.Label _text={{ bold: true, fontSize: 20 }}>Any words of appreciation?</FormControl.Label>
                        <Input
                            numberOfLines={20}
                            placeholder="Review"
                            height={300}
                            multiline={true}
                            onChangeText={(value) => setFormData({ ...formData, appreciation: value })}
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
export default AppreciationForm