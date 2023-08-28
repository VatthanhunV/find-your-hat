const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this.field = field
    this.locationX = 0
    this.locationY = 0
    this.field[0][0] = pathCharacter
  }
  static generateField(height, width, percentage = 0.2) {
    let field = new Array(height)
    for (let i=0; i<field.length; i++){
      field[i] = new Array(width)
    }
    for(let i=0; i<field.length; i++){
      for(let j=0; j<field[i].length; j++){
        field[i][j] = Math.random()>percentage ? fieldCharacter : hole
      }
    }
    const hatLocation = {
      x: Math.floor(Math.random()*width),
      y: Math.floor(Math.random()*height)
    }
    field[hatLocation.y][hatLocation.x] = hat
    return field
  }

  instruction() {
    console.log('\n\n**INSTRUCTIONS:** \nFIND THE HAT! \nType up(u), down(d), left(l), right(r) and hit Enter to find the hat --> ^\nPress control+c to exit.\n')
  }
  
  askQuestion() {
    const answer = prompt('Which way do you want to go? --> ').toLowerCase()
    switch (answer) {
      case 'u': this.locationY-=1; break;
      case 'd': this.locationY+=1; break;
      case 'l': this.locationX-=1; break;
      case 'r': this.locationX+=1; break;
      default : console.log('Invalid. Enter u, d, l or r only.'); this.askQuestion(); break;
    }
  }
  
  isInBounds() {
    return (
      this.locationY >= 0 && 
      this.locationX >= 0 && 
      this.locationY < this.field.length && 
      this.locationX < this.field[0].length
      )
    }

  isHat() {
      return this.field[this.locationY][this.locationX] === hat
    }

  isHole() {
      return this.field[this.locationY][this.locationX] === hole
    }

  print() {
      clear();
      this.instruction()
      const displayString = this.field
      .map(row=>{
        // console.log(row)
        return row.join(' ')
      }).join('\n')
      console.log(displayString)
    }
  play() {
      let playing = true
      while(playing) {
        this.print()
        this.askQuestion()
        if(!this.isInBounds()) {
          console.log('Whoops. Out of bounds!')
          playing = false
          break
        } else if(this.isHole()) {
          console.log('Sorry, you fell down a hole!')
          playing = false
          break
        } else if(this.isHat()) {
          console.log('Yey, you found your hat!')
          playing = false
          break
        }
        this.field[this.locationY][this.locationX] = pathCharacter
      }
    }
  }
  
  const newField = new Field(Field.generateField(10,10))
  newField.play()