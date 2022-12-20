import styled from "styled-components";

const Button = styled.button`
   background: none;
   font-size: 1.5em;
   height: 2em;
   aspect-ratio: 1;
   padding: 0;
   border-radius: 50%;
   text-align: center;
   border: none;
   color: white;

   background-color: ${props => props.colour};

   display:flex;
   justify-content: center;
   align-items: center;

   cursor: pointer;

   &:hover {
      background-color: lightgray;
   }

   &:active {
      background-color: grey;
   }
`;

export default Button;