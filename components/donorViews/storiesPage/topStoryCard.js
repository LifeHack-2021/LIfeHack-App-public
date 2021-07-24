import React from "react";
import { Center, Box, Heading } from "native-base";

export default function TopStoryCard(props) {
 return(
    <Box
      bg={{
        linearGradient: {
        colors: ["lightBlue.300", "violet.800"],
        start: [0, 0],
        end: [1, 1],
        },
    }}
      h={108}
      w={108}
      shadow={2}
      rounded="lg"
    >
      <Center>
        <Heading fontSize={60} noOfLines={2} color="white" marginTop={4}>
          {props.rank}
        </Heading>
      </Center>
      </Box>
    );
}