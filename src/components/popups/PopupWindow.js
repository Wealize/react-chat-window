import React, { useState } from 'react';


const PopupWindow = (props) => {
  const {
    isOpen,
    onClickedOutside,
    onInputChange,
    children
  } = props

  const [scLauncher, setscLauncher] = useState(null)
  const [emojiPopup, setEmojiPopup] = useState(null)

  useState(() => {
    if (!scLauncher) {
      let launcher = document.getElementById('sc-launcher')

      if (launcher) {
        launcher.addEventListener('click', interceptLauncherClick)
        setscLauncher(launcher)
      }
    }
  })

  useState(() => {
    return () => {
      if (scLauncher) {
        scLauncher.removeEventListener('click', interceptLauncherClick)
      }
    }
  }, [])

  const interceptLauncherClick = (e) => {
    const clickedOutside = !emojiPopup.contains(e.target) && isOpen
    clickedOutside && onClickedOutside(e)
  }

  return (
    <div className="sc-popup-window" ref={e => setEmojiPopup(e)}>
      <div className={`sc-popup-window--cointainer ${isOpen ? '' : 'closed'}`}>
        <input
          onChange={onInputChange}
          className="sc-popup-window--search"
          placeholder="Search emoji..."
        />
        {children}
      </div>
    </div>
  )
}

export default PopupWindow
