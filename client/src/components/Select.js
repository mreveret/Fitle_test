
import AsyncSelect from 'react-select/async'
import './Select.css'
import axios from 'axios'

const Select = (props) => {
    // Load options of the select
    const loadOptions = async () => {
        const response = await axios.get('http://localhost:2727/api/fitle')
        return response.data
    }
    // post the selected value to the backend to get back data from the SQL request 
   const changeValue = async (e) => {
        const selectedValueTemp = e
        props.setSelectedValue(selectedValueTemp)
        if (props.selectedValue !== selectedValueTemp){
            try{
                const response = await axios.post("http://localhost:2727/api/select", selectedValueTemp)
                props.setSqlData(response)
            }catch(error){
                return error
            }
        }
    }
    return (
    <AsyncSelect className='slct' 
    value={props.selectedValue}
    onChange={changeValue}loadOptions={loadOptions} defaultOptions/>
    )
}
export default Select
