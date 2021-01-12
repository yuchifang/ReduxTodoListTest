import React, { useState } from 'react';
import './App.css';
import { Input, Box, Button, Flex, List } from "@chakra-ui/react"

const App = () => {
  const [inputValue, setInputValue] = useState<string>("")
  const [listArr, setListArr] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <Flex align="center">
        <Box m="20px">
          <Input placeholder="輸入資料" size="md" onChange={handleChange} value={inputValue} >
          </Input>
        </Box >
        <Box m="20px">
          <Button colorScheme="teal">Button</Button>
        </Box >
      </Flex >
      {listArr.length > 0 && listArr}
    </>
  );
}

export default App;
