import React,{useState} from 'react'
import NavBarUser from './NavBarUser'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const UserPage = () => {
const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
    <NavBarUser />
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="yyyy-MM-dd"
      className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    </div>
  )
}

export default UserPage