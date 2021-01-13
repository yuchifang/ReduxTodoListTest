import { INPUT_CHANGE, GET_DATA, ADD_LIST, DELETE_LIST } from "./actionType"

export const inputChangeAction = (inputValue: string) => ({
    type: INPUT_CHANGE,
    value: inputValue
})

export const inputAddListAction = (listArr: string[]) => ({
    type: ADD_LIST,
    value: listArr
})

export const deleteListAction = (id: number) => ({
    type: DELETE_LIST,
    value: id
})

export const getDataAction = () => ({
    type: GET_DATA,
})