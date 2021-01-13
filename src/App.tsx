import React, { useState, useEffect } from 'react';
import './App.css';
import { Input, Box, Button, Flex, List, ListItem, CloseButton } from "@chakra-ui/react"
import store from "./store/index"
import { inputChangeAction, inputAddListAction, deleteListAction } from "./store/actionCreator"
import axios from "axios"


const App = () => {
  const [inputValue, setInputValue] = useState<string>(store.getState().inputValue)
  const [listArr, setListArr] = useState<string[]>(store.getState().list)

  useEffect(() => {
    axios.get("http://localhost:8000/list").then((res: any) => {
      setListArr(res.data)
    }).catch((err: any) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {

    const storeChange = () => {
      setListArr(store.getState().list)
      setInputValue(store.getState().inputValue)
    }
    store.subscribe(storeChange)
    //subscribe功用 如果 redux 變化了調用方法 
  }, [store])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = inputChangeAction(e.target.value)
    store.dispatch(action)
  }

  const handleAddList = () => {
    if (inputValue !== "") {
      const newList = [...listArr, inputValue]
      const action = inputAddListAction(newList)
      store.dispatch(action)
    } else {
      alert("請輸入字串")
    }
  }
  const handleDelete = (id: number) => {
    const action = deleteListAction(id)
    store.dispatch(action)
  }

  return (
    <>
      <Flex align="center">
        <Box m="20px">
          <Input placeholder="輸入資料" size="md" onChange={handleChange} value={inputValue} >
          </Input>
        </Box >
        <Box m="20px">
          <Button colorScheme="teal" onClick={handleAddList}>Button</Button>
        </Box >
      </Flex >
      {listArr.length > 0 &&
        <List >
          {listArr.map((listString, index) => (<ListItem w="50%" bg="tomato" m="10px" >
            <Flex justify="space-between" align="center">
              <Box bg="white" p="5px" m="10px">
                {listString}
              </Box>
              <Box bg="white" m="10px">
                <CloseButton onClick={() => handleDelete(index)} size="md" />
              </Box>
            </Flex>
          </ListItem>))
          }
        </List >
      }
    </>
  );
}

export default App;
