import {ShapeProps} from '@mirohq/websdk-types';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {NUMBER_OF_DICE, randomizeDice} from "./dice";
import {Variants} from "./variants";
import {useVariants} from "./useVariants";

async function addDieToBoard(die: Partial<ShapeProps>) {
  const shape = await miro.board.createShape({
    shape: 'round_rectangle',
    ...die,
    style: {
      fillColor: "#ffffff",
      fontFamily: "arial",
      fontSize: 148,
      textAlign: "center",
      textAlignVertical: "bottom",
      ...die.style,
    },
  })
}

type Coord = {
  x: number,
  y: number,
}
async function addDiceToBoard(start: Coord, faces: string[], dicePerSide: number, diceSize: number, diceSpacing: number) {
  faces.forEach((face, index) => {
    const row = Math.floor(index / dicePerSide)
    const col = Math.floor(index % dicePerSide)

    console.log('row', row)

    const positionCorrection = -((dicePerSide-1)*diceSize + (dicePerSide-1)*diceSpacing)/2

    const position: Coord = {
      x: start.x + diceSize * col + diceSpacing * col + positionCorrection,
      y: start.y + diceSize * row + diceSpacing * row + positionCorrection,
    }

    console.log('position', position)

    addDieToBoard({
      ...position,
      content: face,
      width: diceSize,
      height: diceSize,
      style: {
        fontSize: Math.round(diceSize * 148/215)
      }
    })
  });
}

async function rollDice(numberOfDice: number) {
  console.log(`Rolling ${numberOfDice} Dice'`)

  const selection = await miro.board.getSelection();

  console.log('SELECTION', selection)

  if (selection.length !== 1) {
    console.error('need to select exactly 1 container')
    return
  }
  const container = selection[0]
  if (container.type !== 'shape') {
    console.error('container needs to be a shape')
    return
  }


  // const faces: string[] = ['🐶', '🐶', '🐶', '🐶', '🐶', '🐶', '🐶', '🐶', '🐶'] //randomize(9);g
  const faces = randomizeDice(numberOfDice)

  const dicePerSide = Math.ceil(Math.sqrt(numberOfDice))
  const diceSize = Math.min(container.height, container.width)/(dicePerSide*2)
  const diceSpacing = diceSize/3

  const start: Coord = {
    x: container.x,
    y: container.y,
  }

  addDiceToBoard(start, faces, dicePerSide, diceSize, diceSpacing)
}

function App() {
  const handleRollDice = () => {
    rollDice(NUMBER_OF_DICE)
  }
  const {
    variantParticipants,
    selectedNumberOfParticipants,
    handleSelectedNumberOfParticipants,
    selectedVariant,
    handleSelectVariant
  } = useVariants();

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <p>Dice breaker is an icebreaker where player randomly are given some graphic to make up a story out of it. To set it up, follow the steps below:</p>
      </div>
      <div className="cs1 ce12">
        <p>1. Choose the amount of players you want:</p>
        <select className="select" onChange={handleSelectedNumberOfParticipants} value={selectedNumberOfParticipants}>
          {variantParticipants.map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
      <div className="cs1 ce12">
        <Variants selectedVariant={selectedVariant} onSelectVariant={handleSelectVariant}/>
      </div>
      <div className="cs1 ce12">
        <p>3. Hit the button and you can start playing now!</p>
        <button
          className="button button-primary"
          onClick={handleRollDice}
        >
          Play the dice!
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
