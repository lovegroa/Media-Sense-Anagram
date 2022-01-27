const nReadlines = require('n-readlines')
const fs = require('fs')
const fileLines = new nReadlines(process.argv[2])

let line
let lineNumber = 1
const anagrams = {}

try {

  //the program reads through the text file line by line to reduce memory impact

  while (line = fileLines.next()) {

    const lineValue = line.toString('ascii')
    //it then rearranges the value of the line like so, apple becomes aelpp
    const sortedLineValue = lineValue.split('').sort().join('').toLowerCase()

    //it then checks to see if that value exists in the object array of unique anagram letter sets, if it doesn't exist it creates it, if it does it appends to it.

    if (!anagrams[sortedLineValue]) {

      anagrams[sortedLineValue] = lineValue

    } else {

      anagrams[sortedLineValue] += ' ' + lineValue

    }
    lineNumber++
  }

} catch (error) {

  console.log(`An error had occured when reading ${process.argv[2]}. The error occured on line ${lineNumber}`)
  console.log('The original file has not been affected.')
  console.log('Here is the logged error:')
  console.log(error)

}

console.log('Completed reading the file')

try {

  //it checks to see if the new file already exists, if so it deletes it.

  if (fs.existsSync('output.txt')) {

    fs.unlinkSync('output.txt')

  }

  let firstLine = true
  Object.entries(anagrams).forEach(anagram => {

    //the first line doesn't have a line break before so is added using the below control flow

    if (firstLine) {

      firstLine = false
      fs.appendFileSync('output.txt', anagram[1], 'utf-8')


    } else {

      fs.appendFileSync('output.txt', `\n${anagram[1]}`, 'utf-8')

    }

  })

} catch (error) {

  console.log('There was an issue writing to the new file, it is possible that output.txt has been partially created.')
  console.log('Here is the logged error:')
  console.log(error)

}

console.log('Completed writing to the new file')

//end of process logs to show how much data was used

const used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`)
console.log('output.txt has been succesfully created')
