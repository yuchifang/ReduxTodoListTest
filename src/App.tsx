import React, { useState, useEffect } from 'react';
import './App.css';
import { Input, Box, Button, Flex, List, ListItem } from "@chakra-ui/react"
import store from "./store/index"
import { INPUT_CHANGE, ADD_LIST } from "../src/store/actionType"
const App = () => {
  const [inputValue, setInputValue] = useState<string>(store.getState().inputValue)
  const [listArr, setListArr] = useState<string[]>(store.getState().list)

  useEffect(() => {

    const storeChange = () => {
      setListArr(store.getState().list)
      setInputValue(store.getState().inputValue)
    }
    store.subscribe(storeChange)
    //subscribe功用 如果 redux 變化了調用方法 
  }, [store])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = {
      type: INPUT_CHANGE,
      value: e.target.value
    }
    store.dispatch(action)
  }

  const handleButton = () => {
    if (inputValue !== "") {
      const newList = [...listArr, inputValue]
      const action = {
        type: ADD_LIST,
        value: newList
      }
      store.dispatch(action)
    } else {
      alert("請輸入字串")
    }
  }

  return (
    <>
      <Flex align="center">
        <Box m="20px">
          <Input placeholder="輸入資料" size="md" onChange={handleChange} value={inputValue} >
          </Input>
        </Box >
        <Box m="20px">
          <Button colorScheme="teal" onClick={handleButton}>Button</Button>
        </Box >
      </Flex >
      {listArr.length > 0 && <List >
        {listArr.map(listString => (<ListItem ml="20px" >{listString}</ListItem>))}
      </List >}
    </>
  );
}

export default App;
