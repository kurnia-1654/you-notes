import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="overlay"></div>
      <main>
        <div class="header-wrapper">
          <div class="header">
            <span class="icon menu-btn"></span>
            <div class="searchbox">Search your note...</div>
            <span class="icon user-login"></span>
          </div>
        </div>

        <div class="empty-notes" >
          <span class="icon ilus-note"></span>
          <div class="text">
            <span>There is no notes</span>
            <span><span class="icon ic-pencil"></span>Make a new one</span>
          </div>

        </div>

        <div class="notes-wrapper">
          <span>Pinned</span>
          <div id="pinned-notes">
          </div>
          <span class="all">All</span>
          <div id="all-notes"></div>
        </div>

        <span class="add-note-btn"></span>



        <div class="search">
          <div class="search-form">
            <span class="icon back-btn"></span>
            <input type="text" name="search" id="search-input" placeholder="Search your note..." />
          </div>
          <span class="body-text">Your notes will be displayed here</span>
        </div>

        <div class="menu">
          <div class="top-menu">
            <div class="logo-text">You<br />Notes.</div>
            <ul class="menu-list">
              <li class="all-note"><span class="icon"></span>All notes</li>
              <li class="reminders"><span class="icon"></span>Reminders</li>
              <li class="labels"><span class="icon"></span>Labels</li>
              <li class="trash"><span class="icon"></span>Trash</li>
            </ul>
          </div>


          <div class="bottom-menu-list">
            <ul>
              <li class="sync"><span class="icon"></span>Account and Sync</li>
              <li class="settings"><span class="icon"></span>Settings</li>
            </ul>
            <span>Version 1.2</span>
          </div>


        </div>



        <div class="empty-trash-info">
          <span class="trash-can"></span>
          <span>Your trash is empty</span>
        </div>

        <div class="deleted-wrapper">
          <p class="info">Your note here will be automatically deleted in 7 days.</p>
          <div id="deleted-notes">
            <div class="note"></div>
          </div>
        </div>


        <div class="setting-page">
          <div class="page-nav">
            <button title="back" class="icon back-btn"></button>
            <span>Settings</span>
          </div>
          <span class="group-title">Theme</span>
          <div class="setting-item">
            <span>Dark Mode</span>
            <button title="Swicth Mode" class="dark-mode toggle-btn" ><span></span></button>
          </div>
        </div>
      </main>
      <div class="add-note">
        <div class="page-nav">
          <span class="icon back-btn"></span>
          <span class="save-info"></span>
          <div class="right-btn">
            <span class="icon pin"></span>
          </div>
        </div>
        <div class="form-note-input">
          <form>
            <textarea type="text" placeholder="Title" class="note-title" rows="1" ></textarea>

            <textarea type="text" id='note-body' placeholder="Notes..." class="note-body"></textarea>
            <span class="last-mod">Edited : <span></span></span>
            <ul class="note-label">
              {/* <!-- <li class="labels"><span></span>Label name<span class="del-lbl">x</span></li> --> */}
            </ul>
          </form>

        </div>

        <div class="bottom-menu">
          <ul class="left-menu">
            <li class="icon image-galery"></li>
            <li class="icon image-camera"></li>
            <li class="icon sound-record"></li>
          </ul>
          <span class="date-created">Created : <span></span></span>
          <span class="more-menu"></span>
        </div>
      </div>


      <ul class="more-menu-list">
        <li class="delete"><span class="icon"></span>Delete</li>
        <li class="duplicate"><span class="icon"></span>Duplicate</li>
        <li class="share"><span class="icon"></span>Share</li>
        <li class="add-label"><span class="icon"></span>Add Label</li>
      </ul>



      <div class="label-page">
        <div class="page-nav">
          <button title="Back" class="icon back-btn"></button>
          <span>Labels</span>
        </div>
        <ul class="label-list">


        </ul>

        <button class="add-label"><span class="plus-icon">+</span> Add new label</button>
      </div>


      <div class="add-new-label-overlay"></div>
      <div class="add-new-label">
        <span class="title">Add new label</span>
        <input type="text" name="label-input" id="label-input" placeholder="Type label..." />
        <button class="act-add">Add Label</button>
      </div>


      <div class="set-label-overlay"></div>
      <div class="set-label">
        <span class="title">Select label</span>
        <select title="Select Label" class="label-selection" >
          <option selected disabled>Select Label</option>
        </select>
        <button class="act-set-label">Set Label</button>

        <button class="add-label"><span class="plus-icon">+</span> Add new label</button>
      </div>
      <div class="popupInfo"></div>
    </>
  )
}

export default App
