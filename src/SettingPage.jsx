export default function SettingPage({ settingIsOpen, setSettingIsOpen }) {
    const closeSetting = () => setSettingIsOpen(false)

    return (
        settingIsOpen && (
            <div className="setting-page">
                <div className="page-nav">
                    <button title="back" className="icon back-btn" onClick={closeSetting}></button>
                    <span>Settings</span>
                </div>
                <span className="group-title">Theme</span>
                <div className="setting-item">
                    <span>Dark Mode</span>
                    <button title="Swicth Mode" className="dark-mode toggle-btn" ><span></span></button>
                </div>
            </div>
        )
    )
}