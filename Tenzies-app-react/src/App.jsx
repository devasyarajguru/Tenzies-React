// import React from 'react'; // In newer versions of React(since React 17) it is not necessary to import React in files where JSX is used
import './app.css'
import Dice from './Components/Dice'
import { useState , useEffect } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

export default function App()
{
  const {width, height} = useWindowSize()
  // State variable to hold on random dice values array
  const[diceValues,setdiceValues] = useState(allNewDice())

  // State variable to see if the game is won and again roll back to new game
  const [tenzies,setTenzies] = useState(false)

  useEffect(() =>
  {
    const allHeld = diceValues.every(die => die.isHeld)
    const firstValue = diceValues[0].value
    const allSameValues = diceValues.every(die => die.value === firstValue)

    // Checking if all values are hold and have same value
    if(allHeld && allSameValues)
    {
      setTenzies(true)
    }
  },[diceValues])

  // To generate new values for dice
  function generateNewDie()
  {
    return{
      value:Math.ceil(Math.random() * 6),
      isHeld:false,
      id:nanoid()
    }
    
  }

  // Function to generate random number and store it an array and manage by state function
  function allNewDice()
  {
    const result = [];
    for(let i=0;i<10;i++)
    {
      result.push(generateNewDie())
    }
      return result
  }

  // function to roll dice and generate new values if the gamem is won
  function rollDice()
  {
    // if the game is not won , till then generate new values
      if(!tenzies)
      {
        setdiceValues(oldDice => oldDice.map(die =>
          {
            return die.isHeld ?
                  die:generateNewDie()
                   
          }))
      }

      // else the game is won again have the new set of values for whole game
      else
      {
        setTenzies(false)
        setdiceValues(allNewDice())
      }
  }

 
  
  // Getting the clicked value ID's to change their isHeld property to change the background
  function holdDice(id) {
    setdiceValues(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
    
}

  // to iterate over random dice value array using map and rendering it in Dice Component
  const diceElements = diceValues.map((value,index) => <Dice value={value.value} isHeld={value.isHeld} key={index} holdDice={() => holdDice(value.id)}/>)

  return(
    <>
    {/* Main element for which our Dice component will render */}
      <main>
        {/* If the game is won , generate Confetti --- Celebration */}
        {tenzies &&
            <Confetti width={width} height={height}/>
        }
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        {/* Dice Container of our Dice Component */}
        <div className='dice-container'>
          {diceElements}
        </div>
        {/* if the game is won generate New Game Button value otherwise have roll button value */}
        <button onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button> 
      </main>
    </>
  )
}