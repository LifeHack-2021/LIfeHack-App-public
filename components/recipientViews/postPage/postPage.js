import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, SegmentedControlIOS } from 'react-native';
import { Container, NativeBaseProvider, Text, Center } from 'native-base'
import axios from 'axios';
import { SERVER_URL } from '../../variables';
import CameraView from './camera';
import PostForm from './postForm';

function PostPage(props) {
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
        console.log('user info: ', props.userInfo)
        //SEND TO CHATS HERE !!! 
        // postItem(formData, capturedImage.base64, props.userInfo)
        for (let i = 0; i < formData.length; i++) {
            console.log('tosend to : ', formData[i])
        }
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
                    <PostForm photo={capturedImage}
                        setTakePic={(cfm) => { setTakePic(cfm) }}
                        setData={(x) => { setFormData(x) }}
                        formData={formData}
                        handleSubmit={(x) => { handleSubmit(x) }}
                        recoItemList={recoItemList}
                        userInfo={props.userInfo}
                    />
                </Container>
            )}
        </>
    )
}


export default PostPage
