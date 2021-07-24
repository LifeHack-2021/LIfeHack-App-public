import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'native-base';
import RecommendedItem from './recommendedItem';

export default function RecommendedList(props) {
  useEffect(() => {
    console.log(props.data)
  })

  return (
    <ScrollView>
      {
        props.data.map((e, key) => {
            return (
                <RecommendedItem
                    key={key}
                    index={e.index}
                    imageLink={e.imageLink}
                    category={e.category}
                    title={e.title}
                    setRecommendedFocusedItem={props.setRecommendedFocusedItem}
                    toggleModalVisible={props.toggleModalVisible}
                />);
        })
      }
    </ScrollView>
  );
}

