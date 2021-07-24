import React, { useEffect, useState } from 'react';
import { ScrollView, Stack, HStack, Button, Text, Heading, Box, Fab, Icon, useDisclose } from 'native-base'
import { AntDesign } from "@expo/vector-icons"
import AddWishItemModal from './addWishItemModal'
import EditWishItemModal from './editWishItemModal'
import RecommendedModal from './recommendedModal'
import WishlistList from './wishlistList'
import RecommendedList from './recommendedList'
import WishlistActionSheet from './wishlistActionSheet'
import { SERVER_URL } from '../../variables';
import axios from 'axios'


// {
//     "purchaseDate": "none",
//     "index": 7,
//     "rating": 60,
//     "status": "redeemed",
//     "priority": 0,
//     "story": "",
//     "donor": "d",
//     "recipient": "r",
//     "saleDate": "2021-07-20 18:05:43",
//     "depositIDarea": "none",
//     "category": "is an idiot",
//     "imageLink": "https://lifehack2021-images.s3.ap-southeast-1.amazonaws.com/7.png",
//     "description": "test for sample response",
//     "storyTitle": "",
//     "title": "daren"
// },
// {
//     "purchaseDate": "none",
//     "index": 8,
//     "rating": 40,
//     "status": "redeemed",
//     "priority": 0,
//     "story": "",
//     "donor": "testuser4",
//     "recipient": "none",
//     "saleDate": "2021-07-20 18:10:45",
//     "depositIDarea": "none",
//     "category": "clothes",
//     "imageLink": "https://lifehack2021-images.s3.ap-southeast-1.amazonaws.com/8.png",
//     "description": "1 working-order nike t-shirt",
//     "storyTitle": "",
//     "title": "t-shirt"
// }




export default function WishlistPage(props) {
    const { isOpen, onOpen, onClose } = useDisclose()

    const [wishlistItems, setWishlistItems] = useState([])
    const [recommendedItems, setRecommendedItems] = useState([])

    const [currentDisplay, setCurrentDisplay] = useState("Wishlist")

    const [addItemModalVisible, setAddItemModalVisible] = useState(false)
    const [editItemModalVisible, setEditItemModalVisible] = useState(false)
    const [recommendedModalVisible, setRecommendedModalVisible] = useState(false)
    const [focusedItem, setFocusedItem] = useState(0)
    const [recommendedFocusedItem, setRecommendedFocusedItem] = useState(0)

    const getWishlistItems = async () => {
        try {
            // console.log(SERVER_URL + '/items/getWishlist/' + props.userInfo.username)
            let res = await axios({ url: SERVER_URL + '/items/getWishlist/' + props.userInfo.username, method: "GET" });
            let data = await res['data'];
            setWishlistItems(data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getWishlistItems()
        getRecommendedItems()
        // console.log(wishlistItems)
    }, [])

    const showAddModal = () => {
        setAddItemModalVisible(!addItemModalVisible)
    }


    const addWish = (title, category) => {
        setAddItemModalVisible(!addItemModalVisible)
        axios.post(SERVER_URL + '/items/createWish', {
            'recipient': props.userInfo.username,
            'description': '',
            'title': title,
            'category': category
        })
            .then(res => {
                setWishlistItems([...wishlistItems, res.data])
            })
            .catch(err => { console.log(err) })
    }

    const editWish = (title, category) => {
        setWishlistItems(wishlistItems.map(e => {
            if (e.id == focusedItem) {
                return {
                    id: focusedItem,
                    title: title,
                    category: category
                }
            }
            else {
                return e
            }
        }))
    }
    const toggleEditWishModal = () => {
        onClose()
        setEditItemModalVisible(!editItemModalVisible)
    }

    const toggleChangePriorityModal = () => {
        onClose()
    }

    const deleteWish = async () => {
        onClose()

        let res = axios.post(SERVER_URL + '/items/deleteItem', {
            'index': focusedItem
        })
        setWishlistItems(wishlistItems.filter(e => e.index != focusedItem))

    }


    const getRecommendedItems = async () => {
        try {
            let res = await axios({ url: SERVER_URL + '/users/getRecommendedItems/' + props.userInfo.username, method: "GET" });
            let data = await res['data']
            setRecommendedItems(data)
        } catch (err) {
            console.log(err)
        }
    }

    const acceptItem = async (index) => {
        try {

            let res = await axios.post(SERVER_URL + "/users/acceptItem", {
                username: props.userInfo.username,
                index: index
            })

            getRecommendedItems()
        } catch (err) {
            console.log(err)
        }
    }

    const rejectItem = async (index) => {
        try {
            let res = await axios.post(SERVER_URL + "/users/rejectItem", {
                username: props.userInfo.username,
                index: index
            })

            getRecommendedItems()
        } catch (err) {
            console.log(err)
        }
    }

    const toggleRecommendedModalVisible = () => {
        setRecommendedModalVisible(!recommendedModalVisible)
    }
    return (
        <>
            {/* <Stack space={3} alignItems="center">
                <HStack space={3} alignItems="center">
                    <Button
                        colorScheme="secondary"
                        variant="outline"
                        onPress={() => { setCurrentDisplay("Wishlist") }}
                        endIcon={
                            <Badge colorScheme="secondary" ml={1} borderRadius={30}>
                                <Text>{wishlistItems.length}</Text>
                            </Badge>
                        }
                        mx={{
                            base: "auto",
                            md: 0,
                        }}
                    >
                        My Wishlist
                    </Button>
                    <Button
                        variant="outline"
                        onPress={() => { setCurrentDisplay("Recommended") }}
                        endIcon={
                            <Badge colorScheme="primary" ml={1} borderRadius={100}>
                                <Text>{recommendedItems.length}</Text>
                            </Badge>
                        }
                        mx={{
                            base: "auto",
                            md: 0,
                        }}
                    >
                        Recommended
                    </Button>
                </HStack>
            </Stack> */}


            <ScrollView>
                <Heading color="gray.600" px={5} pt={6} pb={2} size="xl">
                    Wishlist
                </Heading>
                <Text color="gray.400" px={5} py={2}>
                    Add items into your wishlist here! We will match you with donors automatically.
                </Text>
                {
                    currentDisplay == "Wishlist" ?
                        (<WishlistList data={wishlistItems} setData={setWishlistItems} userInfo={props.userInfo} onOpen={onOpen} setFocusedItem={setFocusedItem} />)
                        : (<></>)
                }
            </ScrollView>


            <AddWishItemModal addWish={addWish} modalVisible={addItemModalVisible} setModalVisible={setAddItemModalVisible} />
            <EditWishItemModal editWish={editWish} modalVisible={editItemModalVisible} setModalVisible={setEditItemModalVisible} />

            {recommendedModalVisible ? <RecommendedModal currentIndex={recommendedFocusedItem} acceptItem={acceptItem} rejectItem={rejectItem} modalVisible={recommendedModalVisible} toggleModalVisible={toggleRecommendedModalVisible} /> : <></>}

            <WishlistActionSheet toggleEditWishModal={toggleEditWishModal} toggleChangePriorityModal={toggleChangePriorityModal} deleteWish={deleteWish} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            {
                props.isFABVisible && currentDisplay == "Wishlist" ? (
                    <Box position="relative" h={100} w="100%">
                        <Fab
                            position="absolute"
                            size="sm"
                            onPress={showAddModal}
                            icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
                        />
                    </Box>
                ) : (<></>)
            }
        </>
    )
}