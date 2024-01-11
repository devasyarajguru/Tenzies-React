// import React from 'react'; // In newer versions of React(since React 17) it is not necessary to import React in files where JSX is used
import './app.css'
import Dice from './Components/Dice'
import { useState } from 'react';


export default function App()
{
  const[diceValues,setdiceValues] = useState(allNewDice())

  console.log(diceValues)

  function allNewDice()
  {
    const result = [];
    for(let i=0;i<10;i++)
    {
      const randomNum = Math.ceil(Math.random() * 6);
      result.push(randomNum)
    }
      return result
  }

  function rollDice()
  {
    setdiceValues(allNewDice())
  }
    
  // const randomNumbers = allNewDice();
  // console.log(randomNumbers)

  const diceElements = diceValues.map((value,index) => <Dice value={value} key={index}/>)

  return(
    <>
    {/* Main element for which our Dice component will render */}
      <main>
        {/* Dice Container of our Dice Component */}
        <div className='dice-container'>
          {diceElements}
        </div>
        <button onClick={rollDice}>Roll</button>
      </main>
    </>
  )
}