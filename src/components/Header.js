import React from 'react';
import closeIcon from './../assets/close-icon.png';


const Header = (props) => {
    const {
      teamName,
      teamExplanation,
      onClose,
      showCloseButton
    } = props

    return (
      <div className="sc-header">
        <div className="sc-header--basic-info">
          <p className="sc-header--bot-name">{teamName}</p>
          {teamExplanation && <p className="sc-header--bot-explanation">{teamExplanation}</p>}
        </div>
        {
          showCloseButton && (
            <div className="sc-header--close-button" onClick={onClose}>
              <img src={closeIcon} alt=""/>
            </div>
          )
        }
      </div>
    )
}

export default Header
