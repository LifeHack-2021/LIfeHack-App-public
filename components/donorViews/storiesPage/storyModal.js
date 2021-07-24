import React, {useEffect} from "react"
import { Heading, Center, Button, Image, Text, Box } from "native-base"
// import { SERVER_URL } from "../../variables"
// import axios from 'axios'

export default function StoryModal(props) {

    useEffect(()=>{
        // console.log("HERHEHH123123123123123123123123123123",props.obj)
    })

    return (
        <Center marginTop={5}>
            <Heading paddingLeft='20px' paddingRight='20px' paddingTop={3} marginBottom={3} alignItems="center">{props.obj.name}</Heading>
            <Text color="gray.400">Posted By: {props.obj.username}</Text>


            {/* story title pending update pending update */}
            <Box
                bg="white"
                shadow={4}
                rounded="lg"
                maxWidth="95%"
                minWidth="90%"
                marginTop={3}
            >
                {/* <Image source={{ uri: props.obj.imageLink }} alt="image base" resizeMode="cover" height={240} roundedTop="md" /> */}
            </Box>
            <Box
                rounded="lg"
                maxWidth="95%"
                minWidth="90%"
                marginTop={3}
            >
                <Text>{props.obj.backstory}</Text>
            </Box>

            <Button.Group variant="outline" space={3} marginTop={5}>
                <Button
                    onPress={() => {
                        props.setModalVisible(false)
                        props.connect()
                    }}
                    variant="outline"
                    colorScheme="primary"
                >
                    CONNECT
                </Button>

                <Button
                    onPress={() => {
                        props.setModalVisible(false)
                    }}
                    colorScheme="muted"
                >
                    CLOSE
                </Button>
            </Button.Group>

        </Center>
    )
}