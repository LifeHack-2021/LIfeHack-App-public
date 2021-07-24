import React, { useEffect, useState } from 'react';
import { ScrollView, Text, VStack, Select, CheckIcon, Center, HStack, Pressable } from 'native-base';

import { RefreshControl } from "react-native";

import ItemCard from './itemCard'
import ItemModal from './itemModal';
import ReviewForm from './review'

import axios from 'axios'
import { SERVER_URL } from '../../variables';
import ReviewModal from './reviewModal';


let statusArr = ['redeemed', 'in transit', 'at collection point', 'received']


export default function ItemPage(props) {
    let [data, setData] = useState([])
    let [filterType, setFilterType] = useState("All")
    let [objView, setObjView] = useState(data)
    let [loading, setLoading] = useState(true);

    //additional info on item
    let [modalVisible, setModalVisible] = useState(false);
    let [modalItemObj, setModalItemObj] = useState(0)

    //review, appreciation modal + view items 
    let [reviewVisible, setReviewVisible] = useState(false)
    let [appreciateVisible, setAppreciateVisible] = useState(false)
    let [itemsView, setItemsView] = useState(true)

    let filterObj = (status) => {
        if (status == 'All') {
            setObjView(data)
        } else {
            let filteredArr = []
            // console.log('s', status)
            for (let i = 0; i < data.length; i++) {
                if (data[i].status == status) {
                    filteredArr.push(data[i])
                }
            }
            setObjView(filteredArr)
        }
    }

    //pulls from database
    let refresh = () => {
        return axios.post(`${SERVER_URL}/items/getRecipientItems`,
            {
                username: props.userInfo.username
            })
            .then(res => {
                // console.log('user', props.userInfo.username)
                // console.log(res.data)

                let dataArr = res.data.filter((e) => {
                    return e.status == 'redeemed' ||
                        e.status == 'in transit' ||
                        e.status == 'at collection point' ||
                        e.status == 'received'
                })

                dataArr.sort((a, b) => (statusArr.indexOf(a.status) > statusArr.indexOf(b.status)) ? 1 : ((statusArr.indexOf(b.status) > statusArr.indexOf(a.status)) ? -1 : 0))

                setData(dataArr)
                setObjView(dataArr)
                setLoading(false)
            })
            .catch(err => { console.log(err) })
    }

    //when user refreshes or stories are not yet loaded
    useEffect(() => {
        if (loading == true) {
            refresh()
        }
    })

    return (
        modalVisible ? (
            <ItemModal
                setItemsView={(x) => { setItemsView(x) }}
                setReviewVisible={(x) => { setReviewVisible(x) }}
                obj={modalItemObj}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible} />
        ) : (
            <>
                <ReviewModal
                    obj={modalItemObj}
                    setItemsView={(x) => { setItemsView(x) }}
                    setReviewVisible={(x) => { setReviewVisible(x) }}
                    setModalVisible={(x) => { setModalVisible(x) }}
                    reviewVisible={reviewVisible}
                    appreciateVisible={appreciateVisible}
                    setAppreciateVisible={(x) => { setAppreciateVisible(x) }} />

                {itemsView == true ?
                    (<ScrollView marginTop={10}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={refresh}
                            />
                        }>
                        <HStack space={4}>
                            <Center flex={1}>
                                <VStack alignItems="center" space={4}>
                                    <Select
                                        selectedValue={filterType}
                                        minWidth={200}
                                        accessibilityLabel="Which items to view"
                                        placeholder="Viewed items"
                                        onValueChange={(itemValue) => {
                                            setFilterType(itemValue)
                                            filterObj(itemValue)
                                        }}
                                        _selectedItem={{
                                            bg: "cyan.600",
                                            endIcon: <CheckIcon size={4} />,
                                        }}
                                    >
                                        <Select.Item label="All" value="All" />
                                        <Select.Item label="Redeemed" value="redeemed" />
                                        <Select.Item label="In transit" value="in transit" />
                                        <Select.Item label="At collection point" value="at collection point" />
                                        <Select.Item label="Received" value="received" />
                                    </Select>
                                </VStack>
                            </Center>
                        </HStack>


                        {objView != '' ? objView.map(e => {
                            return (
                                <ItemCard
                                    obj={e}
                                    // key={e}
                                    // id={e}
                                    setModalItemObj={(x) => { setModalItemObj(x) }}
                                    setModalVisible={(x) => { setModalVisible(x) }}
                                />
                            );
                        }) : <Center my='200px'><Text>Sorry, no items found</Text></Center>}


                    </ScrollView>)
                    :
                    (<></>)
                }
            </>
        )
    )


}