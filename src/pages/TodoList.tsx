import React, { useState, useEffect } from 'react';
import { Input, Box, Button, Flex, List, ListItem, CloseButton } from "@chakra-ui/react"
import store from "../store/index"
import { getInitListAction, getDataAction, inputChangeAction, inputAddListAction, deleteListAction } from "../store/actionCreator"
import { useSelector, useDispatch } from "react-redux"
import { Store } from "../InterFace"
const TodoList = () => {

    const inputValueStore = useSelector((state: Store) => state.inputValue)
    const listStore = useSelector((state: Store) => state.list)
    console.log("inputValueStore", inputValueStore)
    console.log("listStore", listStore);
    const [inputValue, setInputValue] = useState<string>(store.getState().inputValue)
    const [listArr, setListArr] = useState<string[]>(store.getState().list)
    const dispatch = useDispatch();


    useEffect(() => {
        const action: any = getDataAction()
        dispatch(action)

    }, [])

    useEffect(() => {
        console.log("wwwwwwwwwwwwww");
        const storeChange = () => {
            // setListArr(store.getState().list)
            // setInputValue(store.getState().inputValue)
        }
        store.subscribe(storeChange)
        //subscribe功用 如果 redux 變化了調用方法 
    }, [store])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const action = inputChangeAction(e.target.value)
        dispatch(action)
    }

    const handleAddList = () => {
        if (inputValueStore !== "") {
            const newList = [...listStore, inputValueStore]
            const action = inputAddListAction(newList)
            dispatch(action)
        } else {
            alert("請輸入字串")
        }
    }
    const handleDelete = (id: number) => {
        const action = deleteListAction(id)
        dispatch(action)
    }
    return (
        <>
            <Flex align="center">
                <Box m="20px">
                    <Input placeholder="輸入資料" size="md" onChange={handleChange} value={inputValueStore} >
                    </Input>
                </Box >
                <Box m="20px">
                    <Button colorScheme="teal" onClick={handleAddList}>Button</Button>
                </Box >
            </Flex >
            {listStore?.length > 0 &&
                <List >
                    {listStore.map((listString, index) => (<ListItem w="50%" bg="tomato" m="10px" >
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
    )
}
export default TodoList