let objectFake = {
    one: "thirty four",
    two: "fifty five"
}
let testJson = `{
    "pictures": {
        "figure1": "testjbkjbf",
        "figure2": "henbkdknbkfkknf"
    }
}`
let rawObject = `{
    pictures : {
        test1 : fifty,
        test2: ${objectFake}
    }
}`
let stringified = JSON.stringify(rawObject)
let newObj = JSON.parse(testJson)
console.log(`stringified text: ${stringified}`)
let objectParsed = JSON.parse(stringified)
console.log(`object parsed: ${objectParsed.pictures}`)

// realized that the json can not be accessed directly.
console.log(`json object converted to object: \n ${newObj.pictures.figure1}`)