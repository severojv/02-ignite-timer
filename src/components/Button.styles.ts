 import styled ,{css} from "styled-components"; // ferramenta de style
 
 export type ButtonVariant = 'primary' | 'secundary' | 'danger' | 'success';

 interface ButtonContainerProps{
    variant: ButtonVariant;
}

const ButtonVariants={
    primary: 'purple',
    secundary:'orange',
    danger: 'red',
    success:'green'
};

 export const ButtonContainer = styled.button <ButtonContainerProps>` //recebe as "props"
    width: 100px; //css
    height: 40px;


    background-color: ${props=>props.theme['green-500']}; //acessa a cor do thema para o background: ;
    //color : ${props=>props.theme.white}; // coloca a cor como white 


    /*${props =>{ //function para mudar a cor de acordo com o type das props
        return css`
            background-color: ${ButtonVariants[props.variant]};
        `
    }}*/
 `