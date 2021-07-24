import React, {useState} from "react"
import { Modal, Button, Input, Text } from "native-base"

export default function EditWishItemModal(props) {
  const [titleValue, setTitleValue] = useState("")
  const [categoryValue, setCategoryValue] = useState("")
  
  return (
      <Modal isOpen={props.modalVisible} onClose={props.setModalVisible} avoidKeyboard>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Edit Wish</Modal.Header>
          <Modal.Body>
              <Text bold fontSize={20} marginTop={2}>Title</Text>
              <Input mt={4} onChangeText={(value) => setTitleValue(value)} placeholder="Enter a new title" />
            
              <Text bold fontSize={20} marginTop={2}>Category</Text>
              <Input mt={4} onChangeText={(value) => setCategoryValue(value)} placeholder="Enter a new category" />

          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button onPress={() => {props.editWish(titleValue, categoryValue)}}>EDIT</Button>
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