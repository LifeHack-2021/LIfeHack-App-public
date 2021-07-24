import React, {useState} from "react";
import {Text, Box, Stack, Heading, Pressable } from "native-base"
import {Image, CacheManager} from 'react-native-expo-image-cache'

export default function ItemCard(props) {
  // console.log('props received', props)
  // const path = await CacheManager.get(props.imageLink).getPath();
  // CacheManager.cache(props.imageLink, localURI => setImageLink({ uri: localURI }));

  var d1 = new Date().getTime()
  
  console.log(props)

  var myArr = props.saleDate
  var myArray = myArr.split(" ");
  var d2 = new Date(myArray[0])
  
  const diffTime = Math.abs(d2 - d1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return (
    <>
      <Box
        bg="white"
        shadow={3}
        rounded="lg"
        maxWidth="45%"
        minWidth="45%"
      >
          <Pressable onPress={() => {
              props.setModalVisible(true);
              props.setModalItemId(props.id);
              
            }}>
              {/* <Image resizeMode="cover" h={120} roundedTop="md" source={{uri: props.imageLink}}  /> */}
              {/* <AnimatedBlurView tint="dark" style={computedStyle} {...{intensity}}/> */}
              <Image style={{ resizeMode: 'cover', height:120, roundedTop:'md'}} {...{preview: 'image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', uri: props.imageLink}} />
              <Text position="absolute" color="white" top={0} m={[2, 2, 4]}>
                {
                  (diffDays < 8) ? (diffDays + " Days Ago"):
                  (diffDays < 31) ? (Math.floor(diffDays/7) + " Weeks Ago"):
                  (diffDays < 365) ? (Math.floor(diffDays/7) + " Months Ago"): (Math.floor(diffDays/7) + " Years Ago")
                }
              </Text>
              <Stack space={2} p={[4, 4, 8]}>
                <Text color="gray.400">{props.category}</Text>
                <Heading size={["md", "lg", "md"]} noOfLines={1} isTruncated>
                  {props.title}
                </Heading>
              </Stack>
          </Pressable>
        </Box>
    </>
  );
}