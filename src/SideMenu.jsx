import { useEffect, useState } from "react"
import SettingPage from "./SettingPage"


export default function SideMenu({ setActivity, isMenuOpen, setIsMenuOpen }) {
    const [settingIsOpen, setSettingIsOpen] = useState(false)
    const openSetting = () => setSettingIsOpen(true)
    const showTrash = () => setActivity("Trash")
    const showNotes = () => setActivity("Notes")

    const closeMenu = () => setIsMenuOpen(false)

    return (
        isMenuOpen && (
            <>
                <div className="overlay" onClick={closeMenu} />
                <div className="menu">
                    <div className="top-menu" onClick={closeMenu}>
                        <div className="logo-text">You<br />Notes.</div>
                        <ul className="menu-list">
                            <li className="all-note" onClick={showNotes}><span className="icon"></span>All notes</li>
                            <li className="reminders"><span className="icon"></span>Reminders</li>
                            <li className="labels"><span className="icon"></span>Labels</li>
                            <li className="trash" onClick={showTrash}><span className="icon"></span>Trash</li>
                        </ul>
                    </div>
                    <div className="bottom-menu-list">
                        <ul>
                            <li className="sync"><span className="icon"></span>Account and Sync</li>
                            <li className="settings" onClick={openSetting}><span className="icon"></span>Settings</li>
                        </ul>
                        <span>Version 1.2</span>
                    </div>
                </div>
                <SettingPage settingIsOpen={settingIsOpen} setSettingIsOpen={setSettingIsOpen} />
            </>
        )
    )
}

// export default SideMenu;