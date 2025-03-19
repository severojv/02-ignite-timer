import { ButtonContainer, ButtonVariant } from "./Button.styles";

interface ButtonProps{

    variant?: ButtonVariant;

}
export function Button ({variant ='primary'}:ButtonProps){ //possui um valor defaut
    return(
        <ButtonContainer variant={variant}>Enviar</ButtonContainer> //Componete estilizado 
    )
}