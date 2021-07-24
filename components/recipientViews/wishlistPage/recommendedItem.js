import React, { useEffect, useState } from 'react';
import { Box, HStack, VStack, Image, Heading, Text, Pressable } from 'native-base';

export default function RecommendedItem(props) {
  
  return (
    <Box maxWidth='100%' mx='auto' my={3}
      bg="white"
      shadow={2}
    >
    <Pressable
      onPress={() => {
        props.setRecommendedFocusedItem(props.index)
        props.toggleModalVisible(true)
      }}
    >
        <HStack alignItems="center" space={2}>
                  <Box
                      py={2}
                      px={4}>
                      <Image source={{uri: props.imageLink}} alt="Displayed Image" style={{my:'auto', mx:'auto', height:60, width:60, size:60, borderRadius:50}} />
                  </Box>

                  <VStack width='65%'>
                      <Text color="gray.400">{props.category}</Text>

                      <Heading noOfLines={1} style={{ fontSize: 20 }} isTruncated>
                          {props.title}
                      </Heading>
                  </VStack>
        </HStack>
    </Pressable>
</Box>
  );
}

