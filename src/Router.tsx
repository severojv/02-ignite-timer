import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { History  } from "./pages/History"
import { DefaultLayout } from "./layouts/DefaultLayout/Index"

export function Router(){
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}> { /* padrão para todas as rotas "/"    se for apenas para adim "/adim" por exemplo*/ }

            <Route path="/" element={<Home/>}/>
            <Route path="/history"  element={<History/>}/>

            </Route>
        </Routes>
    )
}