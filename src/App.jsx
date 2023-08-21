import { useState } from 'react'
import Header from './Header'
import Notes from './Notes'
import SideMenu from './SideMenu'
import Trash from './Trash'
import EditNotePage from './EditNotePage'

function App() {
  const [activity, setActivity] = useState("Notes")
  const [noteId, setNoteId] = useState("")

  const [notes, setNotes] = useState(() => {
    const NOTES = JSON.parse(localStorage.getItem("notes")) || []
    return NOTES;
  })

  const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
    <>
      <main>
        <Header activity={activity} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        {activity == "Notes" && <Notes setActivity={setActivity} activity={activity} notes={notes} setNotes={setNotes} setNoteId={setNoteId} />}
        {activity == "Trash" && <Trash setActivity={setActivity} activity={activity} />}
        {activity == "Edit Note" && <EditNotePage setActivity={setActivity} activity={activity} notes={notes} setNotes={setNotes} noteId={noteId} />}
        <SideMenu setActivity={setActivity} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      </main>


      <ul className="more-menu-list">
        <li className="delete"><span className="icon"></span>Delete</li>
        <li className="duplicate"><span className="icon"></span>Duplicate</li>
        <li className="share"><span className="icon"></span>Share</li>
        <li className="add-label"><span className="icon"></span>Add Label</li>
      </ul>



      <div className="label-page">
        <div className="page-nav">
          <button title="Back" className="icon back-btn"></button>
          <span>Labels</span>
        </div>
        <ul className="label-list">


        </ul>

        <button className="add-label"><span className="plus-icon">+</span> Add new label</button>
      </div>


      <div className="add-new-label-overlay"></div>
      <div className="add-new-label">
        <span className="title">Add new label</span>
        <input type="text" name="label-input" id="label-input" placeholder="Type label..." />
        <button className="act-add">Add Label</button>
      </div>


      <div className="set-label-overlay"></div>
      <div className="set-label">
        <span className="title">Select label</span>
        <select title="Select Label" className="label-selection" >
          <option selected disabled>Select Label</option>
        </select>
        <button className="act-set-label">Set Label</button>

        <button className="add-label"><span className="plus-icon">+</span> Add new label</button>
      </div>
      <div className="popupInfo"></div>
    </>
  )
}

export default App
