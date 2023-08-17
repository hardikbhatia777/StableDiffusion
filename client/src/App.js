import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack, 
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import './App.css';
import { Progress } from '@chakra-ui/react'
const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
    updateImage(result.data);
    updateLoading(false);
  };

  return (
    <div className="main">
    <ChakraProvider>
      
      <Container centerContent maxW={2000}>
        <div className="border">
        <Text
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='8xl'
          fontWeight='extrabold'
        >
          AI image generator
        </Text>
        <Text marginBottom={"10px"}>
          <br/><br/>
          <div className="text1">
          This image generator uses Stability AI to generate images using Stable Diffusion!<br/>It is also a bit heavy on the GPU lol
          </div>
          <br/>
          Made with ❤️ by Hardik Bhatia
        </Text>
        <br/>
        <Wrap marginBottom={"10px"}>
          <Input
           placeholder='Enter your prompt here'
           size='lg'
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"1250px"}
            height={"45px"}
          ></Input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"} size={"lg"} height={"45px"}>
            Generate
          </Button>
        </Wrap>
        <br/>
        {loading ? (
          <><Progress size='xs' isIndeterminate /><Progress size='xs' isIndeterminate /><Progress size='xs' isIndeterminate /></>
        ) : image ? (
          <div className="image1">
            <Center>
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
          </Center>
          </div>
        ) : null}
        </div>
      </Container>
      
    </ChakraProvider>
    </div>
  );
};

export default App;
