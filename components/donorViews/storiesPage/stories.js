import React, { useEffect, useState } from 'react';
import {
    Avatar, Modal, Button, ScrollView, HStack, VStack, Text, Icon, Center, Input, Heading, usePropsResolution
} from 'native-base';
import { RefreshControl } from "react-native";

import StoryCard from './storyCard';
import TopStoryCard from './topStoryCard';
import axios from 'axios';
import { SERVER_URL } from '../../variables';
import StoryModal from './storyModal';
import Loading from '../../loading';
import FriendsModal from './friendsModal'

let photos = [
    { image: 'https://lifehack2021-images.s3.ap-southeast-1.amazonaws.com/A.jpg' },
    { image: 'https://lifehack2021-images.s3.ap-southeast-1.amazonaws.com/B.jpg' },
    { image: 'https://lifehack2021-images.s3.ap-southeast-1.amazonaws.com/C.jpg' },
    { image: 'https://lifehack2021-images.s3.ap-southeast-1.amazonaws.com/D.jpg' }
]

export default function Stories(props) {
    let [stories, setStories] = useState(null)
    let [globalFriendName, setGlobalFriendName] = useState("")
    let [modalVisible, setModalVisible] = useState(false)

    let [wishlistModalVisible, setWishlistModalVisible] = useState(false)
    let [pressedObj, setPressedObj] = useState({})
    let [loading, setLoading] = React.useState(true);

    //pulls from database
    let refresh = () => {
        return axios.get(`${SERVER_URL}/users/getAllUsersInfo`)
            .then(res => {
                setStories(res.data.filter(e => e.role == 'recipient'))
                // console.log("LKJASDFLKJ", res.data.filter(e=>e.role == 'recipient'))
                setLoading(false)
                return (res.data)
            })
            .catch(err => { console.log(err) })
    }

    //when user refreshes or stories are not yet loaded
    useEffect(() => {
        if (loading == true) {
            refresh()
        }
    })

    const connectWithRecipient = () => {
        props.toChats()
    }

    return (
        <>

            <Modal isOpen={props.showModal} onClose={() => props.setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>You have been allocated : </Modal.Header>
                    <Modal.Body>
                        <Center>
                            <Heading>Jane Lim</Heading>
                            <Avatar
                                source={{ uri: 'https://lifehack2021-images.s3.ap-southeast-1.amazonaws.com/A.jpg' }}
                                size={90}
                                style={{
                                    borderRadius: 100,
                                }} />
                        </Center>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" space={2}>
                            <Button
                                onPress={() => {
                                    props.setShowModal(false)
                                }}
                            >
                                ACCEPT
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <ScrollView marginTop={10}
                refreshControl={
                    < RefreshControl
                        refreshing={false}
                        onRefresh={refresh}
                    />
                }>
                {modalVisible == true ? (
                    <StoryModal
                        connect={connectWithRecipient}
                        setModalVisible={(x) => { setModalVisible(x) }}
                        obj={pressedObj}
                        setModalVisible={(x) => { setModalVisible(x) }}
                        key={pressedObj.index}
                    />
                )
                    : (
                        <>
                            {stories == null ? (<></>) : loading == true ? <Loading />
                                :
                                (<>
                                    <Heading color="gray.600" px={5} pb={2} size="xl">
                                        Stories
                                    </Heading>
                                    <Text color="gray.400" px={5} py={2}>
                                        Read about the stories of the the recipients whose lives you can make an impact on.
                                    </Text>
                                    <VStack py={5} space={5} alignItems="center">

                                        {
                                            Array.from(Array(stories.length).keys()).map((e) => {
                                                return (
                                                    <StoryCard
                                                        setModalVisible={(x) => { setModalVisible(x) }}
                                                        key={stories[e].index}
                                                        obj={stories[e]}
                                                        img={photos[Math.floor(Math.random() * 4)].image}
                                                        setPressed={setPressedObj}
                                                    />
                                                );
                                            })
                                        }
                                    </VStack>
                                </>)
                            }
                        </>
                    )}
            </ScrollView >
        </>


    );
}