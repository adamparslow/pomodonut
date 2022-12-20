import styled from "styled-components"
import Button from './Button';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Container = styled.div`
   display: flex;
   align-items: center;
   gap: 20px;
   height: 50px;
`;

const Number = styled.p`
   font-size: 1.5em;
`;

export default function NumberInput(props) {
   return (
      <Container>
         <Button colour={props.colour} onClick={props.decrement}><FaMinus /></Button>
         <Number>{props.value}</Number>
         <Button colour={props.colour} onClick={props.increment}><FaPlus /></Button>
      </Container>
   )
}