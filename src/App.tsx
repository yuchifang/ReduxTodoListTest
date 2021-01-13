import './App.css';
import TodoList from "./pages/TodoList"
import { Provider } from "react-redux"
import store from "./store/index"
const App = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider >
  )
}

export default App;
