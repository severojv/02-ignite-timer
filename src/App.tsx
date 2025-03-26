import { ThemeProvider } from "styled-components" //
import { defaultTheme } from "./styles/thems/defaut" // alterar o tema " ligth and dark" por exemplo
import { GlobalStyle } from "./styles/global"
import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { CyclesConstextProvaider } from "./context/CyclesContext"
function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesConstextProvaider>
          <Router />
        </CyclesConstextProvaider>
      </BrowserRouter>

      <GlobalStyle></GlobalStyle>
    </ThemeProvider>
  )
}

export default App
