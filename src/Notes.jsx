function EmptyNote() {
    return (
        <div className="empty-notes" >
            <span className="icon ilus-note"></span>
            <div className="text">
                <span>There is no notes</span>
                <span><span className="icon ic-pencil"></span>Make a new one</span>
            </div>
        </div>
    )
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function AddNoteButton({ setActivity, notes, setNotes, setNoteId }) {
    let date = new Date()
    let dateCreated = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

    const createNewNote = () => {
        const id = crypto.randomUUID()
        setNoteId(id)
        setNotes([
            ...notes,
            { id, title: "", note: "", dateCreated, dateModified: "", labels: [], pinned: false }
        ])

    }

    const showAddNotePage = () => {
        createNewNote()
        setActivity("Edit Note")
    }

    return <span className="add-note-btn" onClick={showAddNotePage}></span>
}


function Note({ note }) {
    return (
        <div className="note" id={note.id}>
            <div className="inner-wrapper">
                {note.pinned && <span className="icon pinned"></span>}
                {/* <img className="thumbnail" alt="" /> */}
                <h3 className="title">{note.title}</h3>
                <p className="text">{note.note}</p>
                <div className="info">
                    <span className="date">{note.dateCreated}</span>
                    {/* <span className="lbl">
                        <span className="icon"></span>{note.label}
                    </span> */}
                    <span style={{ display: "none" }} className="mod-date">
                        {note.mod_date}
                    </span>
                </div>
            </div>
        </div>
    )
}

function PinnedNotes({ notes }) {
    const pinnedNotes = notes.filter(note => note.pinned == true)
    return (
        <div id="pinned-notes">
            {pinnedNotes.length > 0 &&
                <>
                    <h2>Pinned</h2>
                    {pinnedNotes.map(note => (
                        <Note note={note} />
                    ))}
                </>
            }

        </div>
    )
}

function AllNote({ notes }) {
    const unPinnedNotes = notes.filter(note => note.pinned == false)

    return (
        <div id="all-notes">
            {unPinnedNotes.length > 0 &&
                <>
                    <h2 className="all">All notes</h2>
                    {unPinnedNotes.map(note => (
                        <Note note={note} />
                    ))}
                </>
            }

        </div>
    )
}

export default function Notes({ activity, setActivity, notes, setNotes, setNoteId }) {

    return (
        <>
            {notes.length === 0 ? (
                <>
                    <EmptyNote />
                    <AddNoteButton setActivity={setActivity} notes={notes} setNotes={setNotes} setNoteId={setNoteId} />
                </>
            ) : (
                <>
                    <div className="notes-wrapper">
                        <PinnedNotes notes={notes} />
                        <AllNote notes={notes} />
                    </div>
                    <AddNoteButton setActivity={setActivity} notes={notes} setNotes={setNotes} setNoteId={setNoteId} />
                </>
            )}
        </>
    )
}
