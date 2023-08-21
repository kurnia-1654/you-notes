export default function Trash() {
    const trash = localStorage.getItem('deleted')

    return (
        <div className={trash ? "deleted-notes-wrapper" : "empty-trash-info"}>
            {trash ? (
                <>
                    <p className="info">Your note here will be automatically deleted in 7 days.</p>
                    <div id="deleted-notes">
                        <div className="note"></div>
                    </div>
                </>
            ) : (
                <>
                    <span className="trash-can"></span>
                    <span>Your trash is empty</span>
                </>
            )}
        </div>
    )
}
