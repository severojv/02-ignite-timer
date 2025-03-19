import { Outlet } from "react-router-dom"
import { Header } from "../../components/Header"
import { LayoutContainer } from "./styles"
export function DefaultLayout(){
    return(
        <LayoutContainer>
            <Header/>    { /* contudo padrao HEADER que será exibido em todas as rotas */ }
            <Outlet/>    { /* contudo especifico de uma pagina */ }
        </LayoutContainer>
    )
}