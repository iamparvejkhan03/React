import InputBox from "./components/InputBox";
import Todos from "./components/Todos";
import store from "./App/store";
import { Provider } from "react-redux";

function App(){
    return (
        <Provider store={store}>
            <div className="min-h-screen w-full bg-slate-900 flex justify-center">
                <div className="w-10/12 mt-5 md:w-3/5 lg:w-1/2">
                    <InputBox />
                    <Todos />
                </div>
            </div>
        </Provider>
    );
}

export default App;