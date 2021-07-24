import React, { useState, useEffect } from 'react';
import { ScrollView, HStack, VStack, Button, Icon, Center, Input, Box, Text, usePropsResolution } from 'native-base';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { RefreshControl } from "react-native"

import ItemCard from './itemCard';
import ItemModal from './itemModal';
import axios from 'axios';
import { SERVER_URL } from '../../variables';

export default function DonationsPage(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalItemId, setModalItemId] = useState(0)
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [searchString, setSearchString] = useState("")

    let [loading, setLoading] = useState(true);

    //pulls from database
    let refresh = async () => {
        try {
            let res = await axios({ url: SERVER_URL + '/items/getAllItems', method: "GET" });
            let data = await res['data'];
            setItems(data.filter(e => e.status == "available"))
            setLoading(false)
            console.log(items)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleFilter = () => { }

    useEffect(() => {
        if (loading == true) {
            refresh()
        }
    }, [])

    const filterHelper = (itemList, searchTerm) => {
        return itemList.filter((item) => item.title.substring(searchTerm))
    }
    const handleSearch = (value) => {
        filteredItems(filterHelper(items, value))
    }


    return (
        <>
            {
                modalVisible ? (
                    <ItemModal id={modalItemId} title={modalItemId} modalVisible={modalVisible} setModalVisible={setModalVisible} userInfo={props.userInfo} />
                ) : (
                    <>
                        <Center>
                            <Button.Group size="sm" marginTop={5}>
                                <Input
                                    w="55%"
                                    variant="rounded"
                                    placeholder="Search..."
                                    onChangeText={handleSearch}
                                    _light={{
                                        placeholderTextColor: "blueGray.400",
                                    }}
                                    _dark={{
                                        placeholderTextColor: "blueGray.50",
                                    }}
                                />
                                <Button
                                    variant="outline"
                                    startIcon={<Icon as={Ionicons} name="filter-outline" size={4} />}
                                    onPress={handleFilter}
                                >
                                    Filter
                                </Button>
                            </Button.Group>
                        </Center>
                        <ScrollView marginTop={10}
                            refreshControl={
                                <RefreshControl
                                    refreshing={false}
                                    onRefresh={refresh}
                                />
                            }>
                            <VStack space={3} alignItems="center">
                                {
                                    Array.from(Array(Math.floor(items.length / 2)).keys()).map((e) => {
                                        return (
                                            <HStack key={e} space={3} alignItems="center">
                                                {/* {console.log('ITEM CARD HERE', items)}  */}
                                                {/* <Text>um placeholder</Text> */}
                                                <ItemCard key={items[e * 2].index} id={items[e * 2].index} title={items[e * 2].title} category={items[e * 2].category} imageLink={items[e * 2].imageLink} saleDate={items[e * 2].saleDate} setModalItemId={setModalItemId} setModalVisible={setModalVisible} />
                                                <ItemCard key={items[e * 2 + 1].index} id={items[e * 2 + 1].index} title={items[e * 2 + 1].title} category={items[e * 2 + 1].category} imageLink={items[e * 2 + 1].imageLink} saleDate={items[e*2 + 1].saleDate} setModalItemId={setModalItemId} setModalVisible={setModalVisible} />
                                            </HStack>);
                                            // {console.log('items here', {items})}
                                    })
                                }
                                {
                                    (items.length % 2) ?
                                        (

                                            <HStack space={3} alignItems="flex-start">
                                                <ItemCard id={items[items.length - 1].index} title={items[items.length - 1].title} category={items[items.length - 1].category} imageLink={items[items.length - 1].imageLink} saleDate={items[items.length -1].saleDate} setModalItemId={setModalItemId} setModalVisible={setModalVisible} />
                                                <Box bg="white" maxWidth="45%" minWidth="45%"></Box>
                                            </HStack>
                                        ) : (<></>)
                                }
                            </VStack>
                        </ScrollView>
                    </>)
            }
        </>
    );
}
