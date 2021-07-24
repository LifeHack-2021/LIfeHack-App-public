import React, { useEffect, useState } from "react"
import { Heading, Center, Button, Image, Text, Box } from "native-base"
import { Alert } from 'react-native'
import { SERVER_URL } from "../../variables"
import axios from 'axios'



  // Object {
  //   "category": "is an idiot",
  //   "depositIDarea": "none",
  //   "description": "test for sample response",
  //   "donor": "d",
  //   "imageLink": "https://lifehack2021-images.s3.ap-southeast-1.amazonaws.com/7.png",
  //   "index": 7,
  //   "purchaseDate": "none",
  //   "rating": 89,
  //   "recipient": "r",
  //   "saleDate": "2021-07-20 18:05:43",
  //   "status": "at collection",
  //   "story": "",
  //   "storyTitle": "",
  //   "title": "daren",
  // }


export default function ItemModal(props) {
  const [itemObject, setItemObject] = useState({})

  const getItemData = async (id) => {
    try {
      let res = await axios({url: SERVER_URL + '/items/getItem/' + JSON.stringify(id), method: "GET"});
      let data = await res['data'];
      setItemObject(data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getItemData(props.id)
  }, [])

  const addToMyItems = async (username) => {
    // console.log(itemObject)
    props.setModalVisible(!props.modalVisible)
    try {
      let res = await axios.post(SERVER_URL + '/items/editStatus', {
        index: itemObject.index,
        status: 'redeemed'
      })
      let res2 = await axios.post(SERVER_URL + "/items/setRecipient", {
        index: itemObject.index,
        recipient: username
      })
      console.log(username, "This")
      Alert.alert("Item Redeemed.")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Center marginTop={5}>
      <Heading size="lg">{itemObject.title}</Heading>
        <Text bold color="gray.500">Category: {itemObject.category}</Text>
        <Text color="gray.400">Donated By: {itemObject.donor}</Text>
        <Box
          bg="white"
          shadow={4}
          rounded="lg"
          maxWidth="95%"
          minWidth="90%"
          marginTop={3}
        >
          <Image source={{uri: itemObject.imageLink}} alt="image base" resizeMode="cover" height={240} roundedTop="md" />
      </Box>
      <Box
          rounded="lg"
          maxWidth="95%"
          minWidth="90%"
          marginTop={3}
        >
          <Text>{itemObject.description}</Text>
        </Box>

        <Button.Group variant="outline" space={3} marginTop={5}>
          <Button onPress={() => {addToMyItems(props.userInfo.username)}}>REQUEST</Button>
          <Button
            onPress={() => {
              props.setModalVisible(!props.modalVisible)
            }}
            colorScheme="muted"
          >
            CLOSE
          </Button>
        </Button.Group>

    </Center>
  )
}