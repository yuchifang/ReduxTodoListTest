import { Store } from "../InterFace"
import { GET_DATA, INPUT_CHANGE, ADD_LIST, DELETE_LIST } from "./actionType"
import axios from "axios"

const defaultState: Store = {
    inputValue: "",
    list: []
};

export default (state = defaultState, action: any) => {

    const newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case INPUT_CHANGE:
            newState.inputValue = action.value
            return newState
        case ADD_LIST:
            newState.list = [...action.value]
            newState.inputValue = ""
            return newState
        case DELETE_LIST:
            const newlist = newState.list.filter((listStr: string, index: number) => action.value !== index)
            newState.list = newlist
            return newState
        case GET_DATA:
            console.log("4444444444444444")
            axios.get("http://localhost:8000/list").then((res: any) => {
                newState.list = res.data
            }).catch((err: any) => {
                console.log(err)
            })
            return newState
    }
    return state
}