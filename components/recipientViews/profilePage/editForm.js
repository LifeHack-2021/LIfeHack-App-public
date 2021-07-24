import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native'
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
    Select,
    CheckIcon,
    Heading,
    Actionsheet,
    Checkbox,
    Divider,
    useToast
} from 'native-base';

import axios from 'axios'
import { SERVER_URL } from '../../variables';

function EditProfileForm(props) {
    let [scrollOffset, setScrollOffset] = useState({ y: 0 })
    let [placeholder, setPlaceholder] = useState('Change your backstory here')
    let [firstLoad, setFirstLoad] = useState(true)
    let [loadedBackstory, setLoadedBackstory] = useState()
    let [formData, setFormData] = useState({ backstory: props.userInfo.backstory })


    useEffect(() => {
        setFirstLoad(true)

        console.log(props.userInfo.backstory)
        setLoadedBackstory(props.userInfo.backstory)

    }, [])


    let submitHandler = () => {
        axios.post(SERVER_URL + '/users/editBackstory', {
            username: props.userInfo.username,
            backstory: formData.backstory
        })
            .then(res => {
                console.log(res.data)
                setUserInfo(res.data)
                useToast().show({
                    title: 'Successfully updated!',
                    status: 'success',
                    position: 'top'
                })
            })
            .catch(err => { console.log(err) })
    }

    return (

        <ScrollView
            contentOffset={scrollOffset}
        >

            <VStack width='95%' my={3} space={3}>
                <Heading mx={3}>About you</Heading>
                <Text mx={3} pb={2}>Tell us about your story, so that donors know who they are helping!</Text>

                <Box width='95%' mx='auto'>
                    <FormControl isRequired>

                        <Input
                            onFocus={() => { setScrollOffset({ y: 50 }); console.log('focus') }}
                            numberOfLines={3}
                            placeholder={placeholder}
                            height={100}
                            width="100%"
                            multiline={true}
                            value={
                                firstLoad ? loadedBackstory : formData.backstory
                            }
                            onChangeText={(value) => {
                                setFormData({ ...formData, backstory: value })
                                setFirstLoad(false)
                            }}
                        />

                        <FormControl.HelperText fontSize={15}>
                            Just be yourself and show others who you are!
                        </FormControl.HelperText>
                        <FormControl.ErrorMessage>Error Name</FormControl.ErrorMessage>
                    </FormControl>
                </Box>

                <Button onPress={() => { submitHandler() }} mt={5} px={3} width='95%' align alignSelf='center' colorScheme="cyan">
                    Update!
                </Button>
            </VStack>

            {/* <Box
                    mx='auto'
                    my={10}
                >
                    <ImageBackground
                        source={{ uri: props.photo.uri }}
                        alt='photo failed to load'
                        style={{ width: 300, height: 300, borderRadius: 30 / 2 }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 260,
                            backgroundColor: 'transparent',
                        }}
                    >
                        <Button colorScheme='muted' onPress={() => { retakePic() }}>
                            <Text style={{ color: 'white' }}>Retake</Text>
                        </Button>
                    </View>
                </Box> */}


        </ScrollView >
    )
}

export default EditProfileForm