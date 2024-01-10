// import React from 'react'; // In newer versions of React(since React 17) it is not necessary to import React in files where JSX is used
import './app.css'
import Dice from './Components/Dice'


export default function App()
{
  function allNewDice()
  {
    const result = [];
    for(let i=0;i<6;i++)
    {
      const randomNum = Math.ceil(Math.random() * 6);
      result.push(randomNum)
    }
      return result
  }

  const randomNumbers = allNewDice();
  console.log(randomNumbers)
  return(
    <>
    {/* Main element for which our Dice component will render */}
      <main>
        {/* Dice Container of our Dice Component */}
        <div className='dice-container'>
        <Dice value="1"/>
        <Dice value="1"/>
        <Dice value="1"/>
        <Dice value="1"/>
        <Dice value="1"/>
        <Dice value="1"/>
        <Dice value="1"/>
        <Dice value="1"/>
        <Dice value="1"/>
        <Dice value="1"/>
        </div>
      </main>
    </>
  )
}