import { useState } from 'react'
import axios from 'axios'

function Form() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    message: '',
  })
  
  const [responseMessage, setResponseMessage] = useState('') 

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/api/save-data', formData)
      setResponseMessage(response.data.message) 
      setFormData({
        username: '',
        email: '',
        phone: '',
        message: ''
      }) 
    } catch (error) {
      setResponseMessage('Error saving data')
      console.error(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <>
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <form 
      onSubmit={submitHandler}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg">

       <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <input
          type='text'
          name='username'
          onChange={handleChange}
          value={formData.username}
          placeholder='Enter your name'
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type='email'
          name='email'
          onChange={handleChange}
          value={formData.email}
          placeholder='Enter your email'
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type='tel'
          name='phone'
          onChange={handleChange}
          value={formData.phone}
          placeholder='Enter your phone number'
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <textarea
          name='message'
          onChange={handleChange}
          value={formData.message}
          placeholder='Enter your message'
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <button disabled={!formData.username || !formData.email || !formData.phone || !formData.message}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400">Submit</button>
      </form>
      
      {responseMessage && (
        <p className="mt-4 text-center text-lg bg-white p-4 rounded-lg shadow-md w-full max-w-md">
          {responseMessage}
        </p>
      )}
    </div>
    </>
  )
}

export default Form
