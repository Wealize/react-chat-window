import React from 'react'


const MessageCount = (props) => {
    const {
        count
    } = props

    return (
      <div className='sc-new-messages-count'>
        {count}
      </div>
    )
}

export default MessageCount
