import React from 'react'

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  return (
    <div
      key={tab.name}
      className={`tab-btn rounded-4`}
      onClick={handleClick}
      // style={activeStyles}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={'w-11/12 h-11/12 object-contain'}
      />
    </div>
  )
}

export default Tab
