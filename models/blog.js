const mongoose = require('mongoose')
/**
mongoose.set('strictQuery', false)
const password = process.argv[2]
const connectionStr = `mongodb+srv://anna:${password}@fullstack.9qs6gkk.mongodb.net/?retryWrites=true&w=majority&appName=FullStack`
const url = connectionStr

console.log('connecting to', url)
try{
  mongoose.connect(url)
  console.log('connected to MongoDB')
}catch(error) {
  console.log('error connecting to MongoDB:', error.message)
}
*/
const BlogSchema = new mongoose.Schema({
  content:{
  _id: String,
  title: String,
  author: String,
  url: String,
  likes: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

BlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', BlogSchema)
