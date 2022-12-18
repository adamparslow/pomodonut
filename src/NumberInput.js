export default function NumberInput(props) {
   return (
      <div className="numberInputContainer">
         <button onClick={props.increment}>+</button>
         <p>{props.value}</p>
         <button onClick={props.decrement}>-</button>
      </div>
   )
}