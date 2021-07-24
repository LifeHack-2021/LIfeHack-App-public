import React, { useEffect, useState } from "react"
import { Heading, Center, Button, Image, Text, Box } from "native-base"
import { SERVER_URL } from "../../variables"
import axios from 'axios'

export default function ItemModal(props) {

    return (
        <Center marginTop={5}>
            <Heading size="lg">{props.obj.title}</Heading>
            <Text bold color="gray.500">Category: {props.obj.category}</Text>
            <Text color="gray.400">Donated By: {props.obj.donor}</Text>
            <Box
                bg="white"
                shadow={4}
                rounded="lg"
                maxWidth="95%"
                minWidth="90%"
                marginTop={3}
            >
                <Image source={{ uri: props.obj.imageLink }} alt="image base" resizeMode="cover" height={240} roundedTop="md" />
            </Box>
            <Box
                rounded="lg"
                maxWidth="95%"
                minWidth="90%"
                marginTop={3}
            >
                <Text>{props.obj.description}</Text>
            </Box>

            <Button.Group variant="outline" space={3} marginTop={5}>
                {props.obj.status == 'received' ?
                    (
                        <Button
                            onTouchStart={() => {
                                props.setReviewVisible(true)
                                props.setModalVisible(false)
                                props.setItemsView(false)
                            }}>REVIEW</Button>
                    ) :
                    (<></>)
                }
                <Button
                    onPress={() => {
                        props.setModalVisible(!props.modalVisible)
                    }}
                    colorScheme="muted"
                >
                    CLOSE
                </Button>
            </Button.Group>

        </Center >
    )
}