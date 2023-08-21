import { useState } from "react"

// function searchNote() {
//     document.querySelector('.search').style.display = "block"
//     $('.search').fadeIn(150)
//     $('#search-input').focus()

//     window.onpopstate = function () {
//         $('.search').fadeOut(150)
//         showNote()
//     }

//     back_btn.click(function () {
//         window.onpopstate = function () { }
//         $('.search').fadeOut(150, showNote())
//         history.back()
//     })
// }

function Search({ activity, isSearch, setIsSearch, placeholder}) {
    const [query, setQuery] = useState("")
    const search = (e) => {
        setQuery(e.target.value)
    }

    const closeSearch = () => setIsSearch(false)


    return (
        isSearch && (
            <div className="search" onClick={closeSearch}>
                <div className="search-form">
                    <span className="icon back-btn" onClick={closeSearch}></span>
                    <input type="text" name="search" value={query} onChange={search} id="search-input"
                        placeholder={placeholder}
                        autoFocus={true} />
                </div>
                <span className="body-text">Your notes will be displayed here</span>
            </div>
        )
    )
}

export default function Header({ activity, setIsMenuOpen }) {
    const placeholder = activity == "Notes"
        ? "Search your notes..."
        : "Search your trash..."

    const showMenu = () => setIsMenuOpen(true)
    const [isSearch, setIsSearch] = useState(false)
    const showSearchInput = () => setIsSearch(true)

    return (
        <>
            <div className="header-wrapper">
                <div className="header">
                    <span className="icon menu-btn" onClick={showMenu}></span>
                    <div className="searchbox" onClick={showSearchInput}>
                        {placeholder}
                    </div>
                    <span className="icon user-login"></span>
                </div>
            </div>
            <Search activity={activity} isSearch={isSearch} setIsSearch={setIsSearch} placeholder={placeholder} />
        </>
    )
}