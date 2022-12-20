import styled from "styled-components";

const Button = styled.button`
   background: none;
   font-size: 1.5em;
   height: 1.5em;
   width: 1.5em;
   padding: 0;
   border-radius: 50%;
   text-align: center;
   border: none;
   color: white;

   background-color: ${props => props.colour};

   cursor: pointer;

   &:hover {
      background-color: lightgray;
   }

   &:active {
      background-color: grey;
   }
`;

export default Button;