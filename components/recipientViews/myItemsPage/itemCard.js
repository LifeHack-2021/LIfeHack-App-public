import React, { useEffect } from 'react'
import { Center, Box, HStack, VStack, Image, Heading, Text, Badge, Pressable } from 'native-base';
import { Rating } from 'react-native-ratings';
import { Icon } from 'react-native-elements'
import { verticalAlign } from 'styled-system';

export default function ItemCard(props) {
    let arr = ['redeemed', 'in transit', 'at collection point', 'received']
    let colScheme = ['#A4e7ff', '#Ffc0ee', '#FFFEC0', '#CBFFC0']
    let ind = arr.findIndex((x) => { return x == props.obj.status })
    let badgeCol = colScheme[ind]

    console.log(props.obj.rating)

    return (
        <Pressable
            onPress={() => {
                props.setModalVisible(true)
                props.setModalItemObj(props.obj)
            }}>
            <Box maxWidth='95%' height={140} mx='auto' my={3}
                bg="white"
                shadow={2}
                borderRadius={1}
                on
            >
                <HStack alignItems="center" space={2} my='auto'>
                    <Box
                        py={2}
                        px={4}>
                        <Image
                            my='auto'
                            mx='auto'
                            source={{ uri: props.obj.imageLink }}
                            size={70}
                            alt='Item Picture'
                            style borderRadius='50'
                        />
                    </Box>

                    <VStack width='100%'>
                        <Text color="gray.400">{props.obj.saleDate}</Text>
                        <HStack alignItems='center' flex={1} space={1}>
                            <Box width={130}>
                                <Heading style fontSize={27} isTruncated>{props.obj.title}</Heading>

                                <Text noOfLines={1} style fontsize='15' isTruncated>
                                    {props.obj.category}
                                </Text>

                                <Box style alignItems='flex-start' my={1}>
                                    {/* <Rating
                                        type='star'
                                        ratingCount={5}
                                        imageSize={20}
                                        fractions={0}
                                        jumpValue={1}
                                        startingValue={props.obj.rating / 20}
                                        readonly={true}
                                    /> */}
                                    <HStack>
                                        {
                                            Array.from(Array(Math.floor(Math.abs(props.obj.rating / 20))).keys()).map((e) => {
                                                return (
                                                    <Icon name='star' type='ionicon' size='20px' color='gold' />
                                                );
                                            }
                                            )
                                        }
                                        {
                                            Array.from(Array(Math.floor(Math.abs(5 - props.obj.rating / 20))).keys()).map((e) => {
                                                return (
                                                    <Icon name='star-outline' type='ionicon' size='20px' color='gold' />
                                                );
                                            }
                                            )
                                        }
                                    </HStack>
                                </Box>


                            </Box>
                            <Center>
                                <Badge
                                    variant='subtle'
                                    my={1}
                                    style width={100} backgroundColor={badgeCol} borderRadius={15} height={5}
                                    _text={{ textAlign: 'center', paddingTop: '2px' }}>
                                    {props.obj.status}
                                </Badge>
                            </Center>
                        </HStack>

                    </VStack>

                </HStack>
            </Box>
        </Pressable>
    );
}
