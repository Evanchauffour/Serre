import React from 'react'

export default function buttonToogle() {
  return (
    <label className="switch">
        <input type="checkbox" name="changeMode" id="changeMode"/>
        <span className="slider round"></span>
    </label>
  )
}
