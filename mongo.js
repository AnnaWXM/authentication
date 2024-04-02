const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  _id: String,
  title: String,
  author: String,
  url: String,
  likes: Number
})

const password = process.argv[2]
const title = process.argv[3]
const author = process.argv[4]
const url = process.argv[5]

// connect to the database
const connectionStr = `mongodb+srv://anna:${password}@fullstack.9qs6gkk.mongodb.net/?retryWrites=true&w=majority&appName=FullStack`
mongoose.connect(connectionStr, {})
const Blog = mongoose.model('Blog', BlogSchema)

// No Password to github
const correctPassword = 'Anna1998'

if (password !== correctPassword) {
  console.log('Invalid password')
  process.exit(1)
}

const getMaxId = async () => {
  try {
    const maxId = await Blog.find().sort({ _id: -1 }).exec()
    if (maxId.length === 0) {
      return 1
    }
    return maxId ? maxId._id + 1 : 1
  } catch (error) {
    console.log('Error:', error)
    return null
  }
}

const addNewEntry = async () => {
  const nextId = await getMaxId()
  if (nextId === null) {
    console.log('Error: Error adding entry to phone book')
    mongoose.connection.close()
    process.exit(1)
  }
  const newEntry = new Blog({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    author: author,
    url: url,
    likes: likes
  })
  try {
    await newEntry.save()
    console.log(`Added ${title} author: ${author} url:${url} to Blog`)
  } catch (error) {
    console.log('Error:', error)
  }
  mongoose.connection.close()
}

const fetchAllEntries = async () => {
  const data = await Blog.find()
  console.log('Blog:')
  data.forEach(entry => {
    console.log(`${entry.title} ${entry.author}${entry.url}${entry.likes}`)
  })
  mongoose.connection.close()
  process.exit(1)
}

if (process.argv.length === 3) {
  fetchAllEntries()
} else if (process.argv.length > 3) {
  addNewEntry()
}

module.exports = {
  addNewEntry,
  fetchAllEntries
}