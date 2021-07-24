import React, {useState} from "react"
import { Modal, Button, Input, Text, FormControl } from "native-base"

export default function AddWishItemModal(props) {
  const [titleValue, setTitleValue] = useState("")
  const [categoryValue, setCategoryValue] = useState("")
  
  return (
      <Modal isOpen={props.modalVisible} onClose={props.setModalVisible} avoidKeyboard={true}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add Wish</Modal.Header>
          <Modal.Body>
              <Text bold fontSize={20} marginTop={2}>Title</Text>
              <Input mt={4} onChangeText={setTitleValue} placeholder="Title" />
          
              <Text bold fontSize={20} marginTop={2}>Category</Text>
              <Input mt={4} 
              onChangeText={(value) => setCategoryValue(value)} placeholder="Category" />

          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button 
              onPress={() => {
                // console.log('add btn pressed', titleValue, categoryValue)
                props.addWish(titleValue, categoryValue)
              }}
              >ADD</Button>
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