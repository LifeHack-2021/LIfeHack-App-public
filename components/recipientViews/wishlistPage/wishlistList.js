import React, { useEffect, useState } from 'react';
import { Box, HStack, VStack, Image, Heading, Text, Pressable, Badge, SunIcon } from 'native-base';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { SERVER_URL } from '../../variables'

export default function WishlistList(props) {
  console.log(props)

  const renderWishlistItem = ({ item, index, drag, isActive }) => (
    <Box maxWidth='95%' mx='auto' my={3}
      bg="white"
      shadow={2}
    >
      <Pressable
        onPress={() => {
          props.onOpen()
          props.setFocusedItem(item.index)
        }}
        onLongPress={() => {
          drag();
        }}
      >
        <HStack alignItems="center" space={2}>
          <Box
            py={2}
            px={4}>
            <SunIcon
              my='auto'
              mx='auto'
              color="red.300"
              size={60}
              alt='Item Picture'
              style={{
                borderRadius: 50,
              }}
            />
          </Box>

          <VStack width='50%'>
            <Text color="gray.400">{item.category}</Text>

            <Heading noOfLines={1} style={{ fontSize: 20 }} isTruncated>
              {item.title}
            </Heading>
          </VStack>
          <Box width="15%">
            <Badge colorScheme="secondary" ml={1} borderRadius={100} alignItems="center" h={10}>
              <Text fontSize={25} mt={1}>{index + 1}</Text>
            </Badge>
          </Box>
        </HStack>
      </Pressable>
    </Box>
  )

  return (
    <DraggableFlatList
      data={props.data}
      renderItem={renderWishlistItem}
      keyExtractor={(item, index) => index.toString()}
      onDragEnd={({ data }) => props.setData(data)}
      scrollEnabled={true}
    />
  );
}

