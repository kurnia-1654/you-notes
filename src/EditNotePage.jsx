import { useEffect, useState } from "react"

export default function EditNotePage({ activity, setActivity, notes, setNotes, id }) {

    const currentNote = (id) // if the id is exist, it means editing existing note
        ? notes.find((note) => note.id === id)  // find the note with the given id
        : notes[notes.length - 1] // else, assign the last note (new added note)
    
    const noteId = currentNote.id
    const dateCreated = currentNote.dateCreated

    const [title, setTitle] = useState(currentNote.title)
    const [note, writeNote] = useState(currentNote.note)
    const [pinned, setPinned] = useState(currentNote.pinned) 
    
    useEffect(() => {
        currentNote.title = title
        currentNote.note = note
        currentNote.pinned = pinned
    }, [title, note, pinned])
    
    useEffect(() => {
        const newNotes = notes.filter(note => note.id !== noteId)
        newNotes.push(currentNote) 
        setNotes(newNotes)
    }, [currentNote])

    const saveNote = () => {
        if (title === "" && note === "") {
            const newNotes = notes.slice(0, -1)
            setNotes(newNotes) 
            localStorage.setItem("notes", JSON.stringify(newNotes))
        } else {
            localStorage.setItem("notes", JSON.stringify(notes))
        }
    }

    const closeAddNotePage = () => {
        saveNote()
        setActivity("Notes")
    }

    return (
        <div className="edit-note" id={noteId}>
            <div className="page-nav">
                <span className="icon back-btn" onClick={closeAddNotePage}></span>
                <span className="save-info"></span>
                <div className="right-btn">
                    <input type="checkbox" checked={pinned} className="icon pin" onChange={(e) => setPinned(e.target.checked)} />
                </div>
            </div>
            <div className="form-note-input">
                <form>
                    <textarea type="text" placeholder="Title" value={title} className="note-title" rows="1" autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                    <textarea type="text" value={note} id='note-body' placeholder="Notes..." className="note-body"
                        onChange={(e) => writeNote(e.target.value)}
                    ></textarea>

                    <span className="last-mod">Edited : <span></span></span>
                    <ul className="note-label">
                        {/* <!-- <li className="labels"><span></span>Label name<span className="del-lbl">x</span></li> --> */}
                    </ul>
                </form>

            </div>
            <div className="bottom-menu">
                <ul className="left-menu">
                    <li className="icon image-galery"></li>
                    <li className="icon image-camera"></li>
                    <li className="icon sound-record"></li>
                </ul>
                <span className="date-created">Created : {dateCreated}</span>
                <span className="more-menu"></span>
            </div>
        </div>
    )
}