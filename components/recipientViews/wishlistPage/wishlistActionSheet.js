import React from "react"
import { Button, Actionsheet } from "native-base";

export default function WishlistActionSheet(props) {
  return (
    <>
      <Actionsheet isOpen={props.isOpen} onClose={props.onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={props.toggleEditWishModal}>Edit Wish</Actionsheet.Item>
          <Actionsheet.Item onPress={props.toggleChangePriorityModal} marginTop={2} style={{backgroundColor: "#FFB347"}}>Change Priority</Actionsheet.Item>
          <Actionsheet.Item onPress={props.deleteWish} marginTop={2} style={{backgroundColor: "#FF6961"}}>Delete</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}