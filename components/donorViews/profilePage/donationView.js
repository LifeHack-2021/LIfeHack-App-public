import React, { useEffect, useState } from 'react'
import { ScrollView, Text, Center } from 'native-base';
import DonationCard from './donationCard';
import DonationModal from './donationModal';

export default function DonationView(props) {
    let [modalVisible, setModalVisible] = useState(false);
    let [modalItemObj, setModalItemObj] = useState(0)

    return (
        modalVisible ? (
            <DonationModal
                obj={modalItemObj}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible} />
        ) : (
            <ScrollView>
                <>
                    <Text style={{ fontSize: 25, marginTop: 20, marginLeft: 10 }}>Pending Allocation</Text>
                    {
                        props.allData.filter((e) => {
                            return e.status == 'available'
                        }) != [] ?
                            props.allData.filter((e) => {
                                return e.status == 'available'
                            }).map(e => {
                                return (
                                    <DonationCard
                                        key={e.index}
                                        obj={e}
                                        setModalVisible={setModalVisible}
                                        setModalItemObj={setModalItemObj}
                                    />);
                            })
                            : (<Text>No Items found</Text>)
                    }

                    < Text style={{ fontSize: 25, marginTop: 20, marginLeft: 10 }}>Redeemed by user</Text>
                    {
                        props.allData.filter((e) => {
                            return e.status == 'redeemed'
                        }) != '' ?
                            props.allData.filter((e) => {
                                return e.status == 'redeemed'
                            }).map(e => {
                                return (
                                    <DonationCard
                                        key={e.index}
                                        obj={e}
                                        setModalVisible={setModalVisible}
                                        setModalItemObj={setModalItemObj}
                                    />);
                            })
                            : (<Text style marginLeft='3' color='#FF0000'>No Items found</Text>)
                    }

                    < Text style={{ fontSize: 25, marginTop: 20, marginLeft: 10 }}>In transit</Text>

                    {
                        props.allData.filter((e) => {
                            return e.status == 'in transit'
                        }) != '' ?
                            props.allData.filter((e) => {
                                return e.status == 'in transit'
                            }).map(e => {
                                return (
                                    <DonationCard
                                        key={e.index}
                                        obj={e}
                                        setModalVisible={setModalVisible}
                                        setModalItemObj={setModalItemObj}
                                    />);
                            })
                            : (<Text style marginLeft='3' color='#FF0000'>No Items found</Text>)
                    }

                    <Text style={{ fontSize: 25, marginTop: 20, marginLeft: 10 }}>Pending collection</Text>
                    {
                        props.allData.filter((e) => {
                            return e.status == 'at collection point'
                        }) != '' ?
                            props.allData.filter((e) => {
                                return e.status == 'at collection point'
                            }).map(e => {
                                return (
                                    <DonationCard
                                        key={e.index}
                                        obj={e}
                                        setModalVisible={setModalVisible}
                                        setModalItemObj={setModalItemObj}
                                    />);
                            })
                            : (<Text style marginLeft='3' color='#FF0000'>No Items found</Text>)
                    }

                    <Text style={{ fontSize: 25, marginTop: 20, marginLeft: 10 }}>Past Donations</Text>
                    {
                        props.allData.filter((e) => {
                            return e.status == 'received'
                        }) != '' ?
                            props.allData.filter((e) => {
                                return e.status == 'received'
                            }).map(e => {
                                return (
                                    <DonationCard
                                        key={e.index}
                                        obj={e}
                                        setModalVisible={setModalVisible}
                                        setModalItemObj={setModalItemObj}
                                    />);
                            })
                            : (<Text style marginLeft='3' color='#FF0000'>No Items found</Text>)
                    }
                </>
            </ScrollView >
        )
    )
}

// import React, { useEffect, useState } from 'react';
// import { ScrollView, Text, VStack, Select, CheckIcon, Center, HStack, Pressable } from 'native-base';

// import { RefreshControl } from "react-native";

// import DonationCard from './donationCard'
// import DonationModal from './donationModal';

// import axios from 'axios'
// import { SERVER_URL } from '../../variables';
// import ReviewModal from './reviewModal';


// let statusArr = ['redeemed', 'in transit', 'at collection point', 'received']


// export default function ItemPage(props) {
//     let [data, setData] = useState([])
//     let [filterType, setFilterType] = useState("All")
//     let [objView, setObjView] = useState(data)
//     let [loading, setLoading] = useState(true);

//     //additional info on item
//     let [modalVisible, setModalVisible] = useState(false);
//     let [modalItemObj, setModalItemObj] = useState(0)

//     //review, appreciation modal + view items 
//     let [reviewVisible, setReviewVisible] = useState(false)
//     let [appreciateVisible, setAppreciateVisible] = useState(false)
//     let [itemsView, setItemsView] = useState(true)

//     let filterObj = (status) => {
//         if (status == 'All') {
//             setObjView(data)
//         } else {
//             let filteredArr = []
//             // console.log('s', status)
//             for (let i = 0; i < props.allData.length; i++) {
//                 if (props.allData[i].status == status) {
//                     filteredArr.push(props.allData[i])
//                 }
//             }
//             setObjView(filteredArr)
//         }
//     }


//     //when user refreshes or stories are not yet loaded
//     useEffect(() => {
//         let dataArr = props.allData.filter((e) => {
//             return e.status == 'redeemed' ||
//                 e.status == 'in transit' ||
//                 e.status == 'at collection point' ||
//                 e.status == 'received'
//         })

//         dataArr.sort((a, b) => (statusArr.indexOf(a.status) > statusArr.indexOf(b.status)) ? 1 : ((statusArr.indexOf(b.status) > statusArr.indexOf(a.status)) ? -1 : 0))

//         setData(dataArr)
//         setObjView(dataArr)
//     })

//     return (
//         modalVisible ? (
//             <DonationModal
//                 setItemsView={(x) => { setItemsView(x) }}
//                 setReviewVisible={(x) => { setReviewVisible(x) }}
//                 obj={modalItemObj}
//                 modalVisible={modalVisible}
//                 setModalVisible={setModalVisible} />
//         ) : (
//             <>

//                 {itemsView == true ?
//                     (<ScrollView marginTop={10}>
//                         <HStack space={4}>
//                             <Center flex={1}>
//                                 <VStack alignItems="center" space={4}>
//                                     <Select
//                                         selectedValue={filterType}
//                                         minWidth={200}
//                                         accessibilityLabel="Which items to view"
//                                         placeholder="Viewed items"
//                                         onValueChange={(itemValue) => {
//                                             setFilterType(itemValue)
//                                             filterObj(itemValue)
//                                         }}
//                                         _selectedItem={{
//                                             bg: "cyan.600",
//                                             endIcon: <CheckIcon size={4} />,
//                                         }}
//                                     >
//                                         <Select.Item label="All" value="All" />
//                                         <Select.Item label="Redeemed" value="redeemed" />
//                                         <Select.Item label="In transit" value="in transit" />
//                                         <Select.Item label="At collection point" value="at collection point" />
//                                         <Select.Item label="Received" value="received" />
//                                     </Select>
//                                 </VStack>
//                             </Center>
//                         </HStack>


//                         {objView != '' ? objView.map(e => {
//                             return (
//                                 <DonationCard
//                                     obj={e}
//                                     // key={e}
//                                     // id={e}
//                                     setModalItemObj={(x) => { setModalItemObj(x) }}
//                                     setModalVisible={(x) => { setModalVisible(x) }}
//                                 />
//                             );
//                         }) : <Center my='200px'><Text>Sorry, no items found</Text></Center>}


//                     </ScrollView>)
//                     :
//                     (<></>)
//                 }
//             </>
//         )
//     )
// }