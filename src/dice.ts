import {emojis} from './emojis'

const getRandomEmoji = () => {
  return emojis[~~(Math.random() * emojis.length)]
}

export const NUMBER_OF_FACES = 6
export const NUMBER_OF_DICE = 9

type DiceSet = Array<Array<string>>

export const INITIAL_SET: DiceSet = [
  ['π','π','π','π','π','π'],
  ['πΌ','π','π€Ά','π§βπ','π¦Έ','π¦ΈββοΈ'],
  ['π΅','π','π¦','π¦§','πΆ','π'],
  ['π','π','π','π','π','π'],
  ['π','β°','π','π»','π','π'],
  ['π','π','π','π','π§¨','β¨'],
  ['π','πΆ','π₯½','π₯Ό','π¦Ί','π'],
  ['π₯','π','π½','π¬','πΊ','π·'],
  ['π¨','πͺ','β','β','π ','π‘'],
]

const RANDOM_EMOJI_DICE_SET: DiceSet = []

for (let i = 0; i < NUMBER_OF_DICE; i++) {
  RANDOM_EMOJI_DICE_SET.push([])
  for (let j = 0; j < NUMBER_OF_FACES; j++) {
    RANDOM_EMOJI_DICE_SET[i][j] = getRandomEmoji()
  }
}

export const randomizeDice = (numberOfDice: number = 1, diceSet: DiceSet = RANDOM_EMOJI_DICE_SET): Array<string> => {
  const result = []
  for (let i = 0; i < numberOfDice; i++) {
    const randomFace = Math.floor(Math.random() * NUMBER_OF_FACES)
    result.push(diceSet[i][randomFace])
  }
  return result
}
