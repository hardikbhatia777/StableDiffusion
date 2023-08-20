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
  const [style, updateStyle] = useState();

  const generate = async (prompt) => {
    const final = prompt + "," + style
    updateLoading(true);
    const result = await axios.get(`http://127.0.0.1:8000/?prompt=${final}`);
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
          This generator uses Stable Diffusion by StabilityAI to generate images!<br/>PS. It is a bit heavy on the GPU <br/> Found any 'ew bugs'? Let me know via Github!
          </div>
          <br/>
          Made with ❤️ by Hardik Bhatia
        </Text>
        <br/>
          <Input
           placeholder='What do you wanna see? Keep it short and crisp :)'
           size='lg'
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"1050px"}
            height={"45px"}
          ></Input>
            <br/> <br/>
          <Input
           placeholder='What style do you want to see it in (high res, realistic, anime, horror, comic etc.)? You can add multiple styles.'
           size='lg'
            value={style}
            onChange={(e) => updateStyle(e.target.value)}
            width={"900px"}
            height={"45px"}
          ></Input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"} size={"lg"} height={"45px"}>
            Go!
          </Button>
        <br/><br/><br/>
        {loading ? (
          <><Progress size='xs' isIndeterminate /><Progress size='xs' isIndeterminate /><Progress size='xs' isIndeterminate /></>
        ) : image ? (
          <div className="image1">
            <Center>
          <Image src={`data:image/png;base64,${image}`} height='400px' width='400px' boxShadow="lg" />
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
