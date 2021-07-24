import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'native-base';
import FriendCard from './friendsCard';

export default function FriendsView(props) {

    return (
        <ScrollView>
            <Text style={{ fontSize: 25, marginTop: 20, marginLeft: 10 }}>My Friends</Text>

            {
                props.friends.map((e, key) => {
                    return (
                        <FriendCard
                            key={key}
                            friendName={e}
                        />
                    );
                })
            }
        </ScrollView>
    )
}