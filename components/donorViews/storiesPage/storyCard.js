import React, { useEffect, useState } from "react";
import { Avatar, Image, Text, Box, Stack, Heading, HStack } from "native-base";
import { Pressable } from "react-native";



export default function storyCard(props) {

  useEffect(() => {
    console.log(props.obj)
  })
  return (
    <Box
      bg="white"
      shadow={4}
      rounded="lg"
      maxWidth="95%"
      minWidth="90%"
    >
      {/* <Image source={{ uri: props.obj.imageLink }} alt="image base" resizeMode="cover" height={120} roundedTop="md" /> */}
      <HStack>
        <Box
          space={2} py={5} px={4}
          style={{
            position: 'relative',
            flex: 1,

          }}>
          <Text pb={2} color="gray.400">Profile</Text>
          <Heading pb={1} size={["md", "lg", "md"]} noOfLines={2}>
            {props.obj.name}
          </Heading>
          <Text pb={1} noOfLines={1} isTruncated={true}>{props.obj.backstory}</Text>
          <Text pt={1} onPress={
            () => {
              props.setModalVisible(true)
              props.setPressed(props.obj)
            }} color="blue.400">Read More</Text>
          {/*   */}
        </Box>
        <Box
          my='auto'

          style={{
            position: 'relative',
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            alignContent: 'flex-end',
            marginLeft: 100
          }}
        >
          <Pressable onPress={() => {
            props.setGlobalFriendName(props.obj.username)
            props.setWishlistModalVisible(true)
            }}>

              <Avatar
                source={{ uri: props.img }}
                size={90}
                style={{
                  borderRadius: 100,
                }}
              />
          </Pressable>
        </Box>

      </HStack>
    </Box >
  );
}
