import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Text, Button, NativeBaseProvider, Modal, Box, Image } from 'native-base';
import axios from 'axios'

import { SERVER_URL } from '../../variables'

import Loading from '../../loading';

//testcomment to test push
export default function CameraView(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loadingItemType, setLoadingItemType] = useState(false)

    const postItem = async (donor, img, cat, title, desc) => {
        try {
            let res = await axios.post(`${SERVER_URL}/items/create`, {
                'donor': donor,
                'image': img,
                'category': cat,
                'title': title,
                'description': desc
            })
            let data = await res['data']
            // console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    let snap = async () => {
        if (camera) {
            const options = { quality: 0.3, base64: true };
            let data = await camera.takePictureAsync(options);
            let source = data.base64
            let b64 = source.replaceAll(" ", "+")
            data.base64 = b64

            // console.log(data.uri, 'd')

            if (data.base64) {
                setPreviewVisible(true)
                setCapturedImage(data)

                props.setCapturedImage(data)
                setShowModal(true)
            }
        }
    };

    let takeAgain = () => {
        setShowModal(false)
        setCapturedImage(null)
        props.setCapturedImage(null)
        setPreviewVisible(false)
    }

    let arrangeCat = (mockRes) => {
        let arr = []

        for (let i = 0; i < mockRes.length; i++) {
            let obj = { name: '', items: [] }
            if (mockRes[i].Parents == '') {
                for (let j = 0; j < mockRes.length; j++) {
                    if (mockRes[j].Parents != '') {
                        for (let p = 0; p < mockRes[j].Parents.length; p++) {
                            if (mockRes[j].Parents[p].Name == mockRes[i].Name) {
                                obj.name = mockRes[i].Name
                                obj.items.push({ name: mockRes[j].Name, confidence: mockRes[j].Confidence })
                            }
                        }
                    }
                }
            }

            if (obj.name != '' && obj.items != []) {
                arr.push(obj)
            }
            else if (obj.name != '' && obj.items == []) {
                arr.push({ name: obj.name, items: [{ name: obj.name, confidence: 'NA' }] })
            }
        }

        return arr
    }

    let handleChoosePic = () => {
        // console.log(capturedImage.base64)
        // setLoadingItemType(true)
        // setLoadingItemType(false)
        setShowModal(false)
        props.setTakePic(false)

        // axios.post('http://lifehackproductdetection-env.eba-fkpmm9bs.us-east-1.elasticbeanstalk.com/api/upload', {
        //     b64: capturedImage.base64
        // })
        //     .then(res => {
        //         let rawData = res.data
        //         let processed = arrangeCat(rawData)
        //         console.log(processed)
        //         props.setRecoItemList(processed)

        //     })
        //     .catch(err => { console.log(err) })
    }

    let camera

    if (previewVisible && capturedImage) {
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}
            >
                {loadingItemType == true ? (<Loading text='Loading type of item' />) :
                    (
                        <Modal isOpen={showModal} onClose={() => {
                            setShowModal(false)
                            takeAgain()
                        }}>
                            <Modal.Content maxWidth="400px">
                                <Box
                                    my={10}
                                >
                                    <Image
                                        source={{ uri: capturedImage && capturedImage.uri }}
                                        alt='photo failed to load'
                                        style={{ width: 300, height: 300, borderRadius: 30 / 2 }}
                                    />
                                </Box>
                                <Modal.CloseButton />
                                <Modal.Header>Use Picture</Modal.Header>
                                <Modal.Body>
                                    Would you like to use this photo in your donation listing?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button.Group variant="ghost" space={2}>
                                        <Button
                                            onPress={() => {
                                                takeAgain()
                                            }}
                                        >Take Again
                                        </Button>
                                        <Button
                                            onPress={handleChoosePic}
                                        >
                                            Yes
                                        </Button>
                                    </Button.Group>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    )
                }
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={(r) => { camera = r }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>

                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            flexDirection: 'row',
                            flex: 1,
                            width: '100%',
                            padding: 20,
                            justifyContent: 'space-between'
                        }}
                    >
                        <View
                            style={{
                                alignSelf: 'center',
                                flex: 1,
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity
                                onPress={snap}
                                style={{
                                    width: 70,
                                    height: 70,
                                    bottom: 0,
                                    borderRadius: 50,
                                    backgroundColor: '#fff'
                                }}
                            />
                        </View>
                    </View>

                </View>
            </Camera>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
