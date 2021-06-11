
import './App.css'
import Select from './components/Select.js'
import Tab from './components/Tab.js'
import React, { useState } from 'react'

const App = () => {
  const [selectedValue, setSelectedValue] = useState({
    label:'Select a Value', value:'Select a Value'
  })
const [sqlData, setSqlData] = useState()
  return (
    <div className='App'>
        <Select setSelectedValue={setSelectedValue} selectedValue={selectedValue} setSqlData={setSqlData} />
        <Tab selectedValue={selectedValue} sqlData={sqlData}/>
      </div>
  )
}

export default App
