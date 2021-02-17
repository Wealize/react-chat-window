import React, { useState } from 'react';


const PopupWindow = (props) => {
  const {
    isOpen,
    onBlur,
    onInputChange,
    children
  } = props

  return (
    <div 
      className="sc-popup-window"
    >
      <div 
        className={`sc-popup-window--cointainer ${isOpen ? '' : 'closed'}`}
      >
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
