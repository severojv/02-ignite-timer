import { ThemeProvider } from "styled-components" //
import { defaultTheme } from "./styles/thems/defaut" // alterar o tema " ligth and dark" por exemplo
import { GlobalStyle } from "./styles/global"
import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <GlobalStyle></GlobalStyle>
    </ThemeProvider>
  )
}

export default App
