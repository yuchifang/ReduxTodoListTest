import { GET_INIT_LIST, INPUT_CHANGE, ADD_LIST, DELETE_LIST } from "./actionType"
import axios from "axios"

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

export const getInitListAction = (data: any) => ({
    type: GET_INIT_LIST,
    value: data
})

export const getDataAction = () => {
    return (dispatch: any) => {
        axios.get("http://localhost:8080/list")
            .then((res: any) => {
                const action = getInitListAction(res.data)
                dispatch(action)
            }).catch((err: any) => {
                console.log(err)
            })
    }
}