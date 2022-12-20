import styled from "styled-components";

const Button = styled.button`
   background: none;
   border: 0.5px solid black;
   font-size: 1.5em;
   height: 1.5em;
   width: 1.5em;
   padding: 0;
   border-radius: 50%;
   text-align: center;

   cursor: pointer;

   &:hover {
      background-color: lightgray;
   }

   &:active {
      background-color: grey;
   }
`;

export default Button;