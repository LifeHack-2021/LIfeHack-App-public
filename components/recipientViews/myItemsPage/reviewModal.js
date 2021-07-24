import React, { useState } from 'react';
import { ImageBackground } from 'react-native'
import { Text } from 'native-base'

import ReviewForm from './review';
import AppreciationForm from './appreciation';

export default function ReviewModal(props) {

    return (
        props.reviewVisible == true ?
            (
                <ReviewForm
                    obj={props.obj}
                    setItemsView={(x) => { setItemsView(x) }}
                    setReviewVisible={(x) => { props.setReviewVisible(x) }}
                    setModalVisible={(x) => { props.setModalVisible(x) }}
                    setAppreciateVisible={(x) => { props.setAppreciateVisible(x) }} />
            )
            : props.appreciateVisible == true ?
                (
                    <AppreciationForm
                        obj={props.obj}
                        setItemsView={(x) => { props.setItemsView(x) }}
                        setReviewVisible={(x) => { props.setReviewVisible(x) }}
                        setModalVisible={(x) => { props.setModalVisible(x) }}
                        setAppreciateVisible={(x) => { props.setAppreciateVisible(x) }} />
                )
                :
                (<></>)
    )
}