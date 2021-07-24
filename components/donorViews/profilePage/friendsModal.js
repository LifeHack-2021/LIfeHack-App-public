import React, { useEffect, useState } from "react"
import { Modal, Button, Heading, HStack, Text, VStack, Box, Image } from "native-base"
import axios from 'axios'
import { SERVER_URL } from "../../variables"

export default function FriendModal(props) {
  let [wishlist, setWishlist] = useState([])


  useEffect(() => {
    console.log(props.friendName, 'mah buddy')

    axios.get(SERVER_URL + '/items/getWishlist/' + props.friendName)
      .then(res => {
        let data = res['data']
        console.log(data)
        setWishlist(data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])
  return (
    <Modal isOpen={props.modalVisible} onClose={props.setModalVisible} avoidKeyboard>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Heading size='lg'>{props.friendName}</Heading>
          <Heading py={1} color='gray.400' fontSize={20}>Status: Friends</Heading>
        </Modal.Header>
        <Modal.Body>
          <Heading>Needed items: </Heading>
          {
            wishlist.map(e => {
              console.log(e)
              return (
                <>
                  <HStack alignContent='center'>
                    <Text fontSize={25}>{e.title}</Text>
                  </HStack>
                </>
              )
            })
          }
          <VStack space={3}>
            <Text>{props.description}</Text>
            <Box
              py={2}>
              <Image
                source={{ uri: props.imageLink }}
                size={100}
                alt='Item Picture'
                style={{
                  borderRadius: 10,
                }}
              />
            </Box>
          </VStack>

        </Modal.Body>
        <Modal.Footer>
          <Button.Group variant="ghost" space={2}>
            <Button
              onPress={() => {
                props.setModalVisible(!props.modalVisible)
              }}
              colorScheme="secondary"
            >
              CLOSE
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}