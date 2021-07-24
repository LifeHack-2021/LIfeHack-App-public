import React, { useEffect } from 'react';
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
    Divider
} from 'native-base';

import axios from 'axios'

// let mockData = [
//     {
//         'name': 'laptop',
//         'category': 'electronics'
//     },
//     {
//         'name': 'phone',
//         'category': 'electronics'
//     },
//     {
//         'name': 'sanitizer',
//         'category': 'household items'
//     }
// ]

function PostForm(props) {
    let [scrollOffset, setScrollOffset] = React.useState({ y: 0 })
    const [formData, setFormData] = React.useState({});
    const [groupValues, setGroupValues] = React.useState([])
    const [allFriends, setAllFriends] = React.useState([])
    const [viewToSend, setViewToSend] = React.useState(false)

    useEffect(() => {

        axios.post('http://13.229.188.217/items/getRecipientItems', {
            username: props.userInfo.username
        })
            .then(res => {
                let allData = res.data
                let friendList = []
                let dup
                for (let i = 0; i < allData.length; i++) {
                    dup = false
                    for (let j = 0; j < friendList.length; j++) {
                        if (friendList[j].name == allData[i].donor) {
                            dup = true
                        }
                    }
                    if (dup == false) {
                        friendList.push({ name: allData[i].donor })
                    }
                }

                setAllFriends(friendList)

            })
            .catch(err => { console.log(err) })
    }, [])


    function submitHandler() {
        console.log(groupValues, 'g')
        props.setData(groupValues)
        props.handleSubmit()
    }

    function retakePic() {
        props.setTakePic(true)
    }


    return (
        <ScrollView
            contentOffset={scrollOffset}
        >

            <Heading>Post</Heading>
            <VStack width='100%'>
                <Box
                    width="100%"
                    py={2}
                    px={4}>
                    <Image
                        my='auto'
                        mx='auto'
                        source={{ uri: props.photo.uri }}
                        size={100}
                        alt='Item Picture'
                        style borderRadius='50'
                    />
                </Box>
                <Box>
                    <FormControl isRequired>
                        <FormControl.Label>Caption</FormControl.Label>
                        <Input
                            onFocus={() => { setScrollOffset({ y: 25 }); console.log('focus') }}
                            numberOfLines={3}
                            placeholder="Type here"
                            height={100}
                            width="100%"
                            multiline={true}
                            onChangeText={(value) => setFormData({ ...formData, appreciation: value })}
                        />

                        <FormControl.HelperText fontSize={15}>
                            Post a snazzy caption to update your friends!
                        </FormControl.HelperText>
                        <FormControl.ErrorMessage>Error Name</FormControl.ErrorMessage>
                    </FormControl>
                </Box>
                <Button onPress={() => { setViewToSend(!viewToSend) }} colorScheme="secondary" marginTop={3}>Choose recipient of message</Button>

                <Checkbox.Group onChange={setGroupValues} value={groupValues}>
                    {
                        viewToSend ? (

                            allFriends.map(e => {
                                return (
                                    <>
                                        <Divider borderColor="gray.300" />

                                        <Checkbox value={e.name} my={2}>
                                            {e.name}
                                        </Checkbox>

                                    </>
                                )
                            })
                        ) :
                            (<></>)
                    }


                </Checkbox.Group>


                <Button onPress={() => { submitHandler() }} mt={5} colorScheme="cyan">
                    Send
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

    );
}
export default PostForm