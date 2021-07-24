import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, SegmentedControlIOS } from 'react-native';
import { Modal, Button, Box, useToast, Container, NativeBaseProvider, Text, Center } from 'native-base'
import axios from 'axios';
import { SERVER_URL } from '../../variables';
import CameraView from './camera';
import DonateForm from './donateForm';

function DonateItemPage(props) {
    const toast = useToast()

    let [takePic, setTakePic] = useState(true)
    const [capturedImage, setCapturedImage] = useState('')
    let [formData, setFormData] = useState({})
    let [recoItemList, setRecoItemList] = useState([])

    let postItem = async (formData, image, user) => {
        try {
            // console.log('USER', user)
            // console.log(user.id)
            // console.log(image,user.name,formData.category,formData.name)
            let res = await axios.post(SERVER_URL + '/items/create', {
                'image': image,
                'donor': user.username,
                'category': formData.category,
                'title': formData.name,
                'description': 'test for sample response'
            })
            console.log(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    let handleSubmit = () => {
        console.log('POSTINGGGG', formData, capturedImage.base64, props.userInfo)
        postItem(formData, capturedImage.base64, props.userInfo)
        props.setShowModal(true)

        // toast.show({
        //     render: () => {
        //         return (
        //             <Box bg="teal.500" px={4} py={3} rounded="md" mb={5}>
        //                 Sucessfully posted! Hang on while we allocate you a user...
        //             </Box>
        //         )
        //     },
        //     position: 'top'
        // })
        props.toHome() //brings back to home page
    }


    return (
        <>
            {takePic == true ? (
                <CameraView setCapturedImage={(x) => {
                    setCapturedImage(x)
                }}
                    capturedImage={capturedImage}
                    setTakePic={(cfm) => { setTakePic(cfm) }}
                    setRecoItemList={setRecoItemList}
                    recoItemList={recoItemList}
                />
            ) : (
                <Container
                    mx='auto'
                    my='auto'>
                    <DonateForm photo={capturedImage}
                        setTakePic={(cfm) => { setTakePic(cfm) }}
                        setData={(x) => { setFormData(x) }}
                        formData={formData}
                        handleSubmit={(x) => { handleSubmit(x) }}
                        recoItemList={recoItemList}
                    />
                </Container>
            )}


            {/* // <Box>
                //     <Heading>You have been allocated: </Heading>
                //     <Avatar
                //         source={{ uri: 'https://lifehack2021-images.s3.ap-southeast-1.amazonaws.com/A.jpg' }}
                //         size={90}
                //         style={{
                //             borderRadius: 100,
                //         }}
                //     />
                //     <Text>Jenny Lim</Text>
                // </Box> */}


        </>
    )
}


export default DonateItemPage
