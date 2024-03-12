import React from 'react'

export default function buttonToogle({onChange}) {
  return (
    <label className="switch">
        <input type="checkbox" name="changeMode" id="changeMode" onChange={onChange}/>
        <span className="slider round"></span>
    </label>
  )
}
