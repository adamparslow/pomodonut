import styled from "styled-components";

const Button = styled.button`
   background: none;
   font-size: 1.5em;
   height: 2em;
   padding-inline: 11px;
   /* aspect-ratio: 1; */
   border-radius: 50%;
   text-align: center;
   border: none;
   color: white;

   background-color: ${(props) => props.colour};

   display: flex;
   justify-content: center;
   align-items: center;

   font-family: "Arial Rounded MT Bold", sans-serif;

   cursor: pointer;

   &:hover {
      background-color: lightgray;
   }

   &:active {
      background-color: grey;
   }

   &:disabled {
      background-color: darkcyan;
   }
`;

export const Pill = styled(Button)`
   border-radius: 30px;
`;

export default Button;
