import React, { useState, useEffect, useReducer } from 'react';


const notesReducer = (state, action) => {
  switch(action.type) {
    case 'POPULATE_NOTES':
      return action.notes
    case 'ADD_NOTE':
      return [
        ...state, 
        { title: action.title, body: action.body}
      ]
    case 'REMOVE_NOTE':
      return state.filter((note) => note.title !== action.title)
    default:
      return state
  }
}


const NoteApp = () => {
  // const [notes, setNotes] = useState([])


  const [notes, dispatch] = useReducer(notesReducer, [])

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  
  const addNote = (e) => {
    e.preventDefault()
    // setNotes([
    //     ...notes,
    //     { title, body }
    // ])
    dispatch({ 
      type: 'ADD_NOTE', 
      title,
      body
    })

    setTitle('')
    setBody('')
  }

  const removeNote = (title) => {
    // setNotes(notes.filter((note) => note.title !== title))
    dispatch({ 
      type: 'REMOVE_NOTE', 
      title
    })
  }

  useEffect(() => {
    const notesData =  JSON.parse(localStorage.getItem('notes'))

    if (notesData) {
      dispatch({ type: 'POPULATE_NOTES', notes: notesData })
      // setNotes(notesData)
    }
  }, []) // Fires once

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes]) // notes is not a dependency, only update local storage when 'notes' gets changed

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <Note key={note.title} note={note} removeNote={removeNote} />
      ))}

      <p>Add Note</p>
      <form onSubmit={addNote}>
          <input value={title} onChange={(e) => setTitle(e.target.value)}/>
          <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
          <button>add note</button>
      </form>
    </div>
  )
}

const Note = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('setting up effect')
    return () => {
      console.log('optional clean up function')
    }
  }, [])

  return (
    <div>
      <h3>{note.title}</h3>
      <span>{note.body}</span>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  )
}

export default NoteApp;






// const Counter = (props) => {
//   const [count, setCount] = useState(props.count)
//   const [text, setText] = useState('')

//   useEffect(() => {
//     console.log('This should only run once')
//   }, [])

//   useEffect(() => {
//     console.log('useEffect ran')
//     document.title = count
//   }, [count])

//   return(
//     <div>
//       <p>The current {text || 'count'} is {count}</p>
//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(props.count)}>reset</button>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <input value={text} onChange={(e) => setText(e.target.value)}/>
//     </div>
//   )
// }

// Counter.defaultProps = {
//   count: 0
// }

// export default Counter;