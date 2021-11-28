const express = require('express')
const app = express()

app.use(express.static('build'))
app.use(express.json())

let anecdotes = [
    {
        'content': 'If it hurts, do it more often',
        'id': '47145',
        'votes': 10
    },
    {
        'content': 'Adding manpower to a late software project makes it later!',
        'id': '21149',
        'votes': 2
    },
    {
        'content': 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'id': '69581',
        'votes': 5
    },
    {
        'content': 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'id': '36975',
        'votes': 0
    },
    {
        'content': 'Premature optimization is the root of all evil.',
        'id': '25170',
        'votes': 7
    },
    {
        'content': 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'id': '98312',
        'votes': 0
    }
]

const generateId = () => {
    const maxId = anecdotes.length > 0
        ? Math.max(...anecdotes.map(n => n.id))
        : 0
    return maxId + 1
}

app.get('/anecdotes', (req, res) => {
    res.json(anecdotes)
})

app.get('/anecdotes/:id', (req, res) => {
    const id = req.params.id
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    res.json(anecdote)
})

app.get('/health', (req, res) => {
    res.send('ok')
  })
  
app.get('/version', (req, res) => {
res.send('2')
})

app.put('/anecdotes/:id', (req, res) => {
    const id = req.params.id
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    res.json(anecdote)
})

app.post('/anecdotes', (req, res) => {
    const body = req.body
    const anecdote = {
        content: body.content,
        votes: 0,
        id: generateId()
    }
    anecdotes = anecdotes.concat(anecdote)
    res.json(anecdote)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})