import React, { useEffect, useState } from "react"
import { Modal, Button, Center, Box, Image, Text } from "native-base"
import axios from 'axios'
import { SERVER_URL } from "../../variables"

export default function RecommendedModal(props) {
  const [currentObj, setCurrentObj] = useState({})
  
  const startFunction = async () => {
    try {
      let res = await axios({url: SERVER_URL + '/items/getAllItems', method: "GET" });
      let data = await res['data']
      console.log(props.currentIndex, "LKSLKSJDFLKSJLFKSJDLKFJSLDKJ")
      setCurrentObj(data.filter(e => e.index == props.currentIndex)[0])

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    startFunction()
  })

  return (
      <Modal isOpen={props.modalVisible} onClose={props.toggleModalVisible} avoidKeyboard={true}>
        <Modal.Content>
          <Modal.CloseButton />
          <Center>
            <Modal.Header>{currentObj.title}</Modal.Header>
          </Center>
          <Modal.Body>
    <Center>
        <Text bold color="gray.500">Category: {currentObj.category}</Text>
        <Text color="gray.400">Donated By: {currentObj.donor}</Text>
        <Box
          bg="white"
          shadow={4}
          rounded="lg"
          maxWidth="95%"
          minWidth="90%"
          marginTop={3}
        >
          <Image source={{uri: currentObj.imageLink}} alt="image base" resizeMode="cover" height={240} roundedTop="md" />
      </Box>
      <Box
          rounded="lg"
          maxWidth="95%"
          minWidth="90%"
          marginTop={3}
        >
          <Text>{currentObj.description}</Text>
        </Box>
          </Center>





          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
            <Button 
              onPress={() => {
                // console.log('add btn pressed', titleValue, categoryValue)
                props.acceptItem(currentObj.index)
                props.toggleModalVisible()
              }}
              >ACCEPT</Button>

            <Button 
            colorScheme="secondary"
              onPress={() => {
                // console.log('add btn pressed', titleValue, categoryValue)
                props.rejectItem(currentObj.index)
                props.toggleModalVisible()
                
              }}
              >REJECT</Button>

              <Button
                onPress={() => {
                  props.toggleModalVisible()
                }}
                colorScheme="light"
              >
                CLOSE
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
  )
}