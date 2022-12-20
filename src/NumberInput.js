import styled from "styled-components"
import Button from './Button';

const Container = styled.div`
   display: flex;
   align-items: center;
`;


const Number = styled.p`
   margin: 10px;
   font-size: 1.5em;
`;

export default function NumberInput(props) {
   return (
      <Container>
         <Button onClick={props.increment}>+</Button>
         <Number>{props.value}</Number>
         <Button onClick={props.decrement}>-</Button>
      </Container>
   )
}