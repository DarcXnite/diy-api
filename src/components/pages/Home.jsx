import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const serverUrl = `${process.env.REACT_APP_SERVER_URL}`

export default function Home() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.get(`${serverUrl}/blogs`)
        // console.log(res.data)
        setBlogs(res.data)
      } catch (err) {
        console.warn(err)
      }
    }

    getBlogs()
  }, [])
  const allBlogs = blogs.map(blog => {
    const { _id, title } = blog
    return (
      <div key={_id}>
        <Link to={`/blogs/${_id}`}>{title}</Link>
      </div>
    )
  })
  return (
    <div>
      <h2>Homepage</h2>
      {allBlogs}
    </div>
  )
}
