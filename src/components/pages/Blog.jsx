import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BlogDetails from '../BlogDetails'
import Comment from '../Comment'

const serverUrl = `${process.env.REACT_APP_SERVER_URL}`

export default function Blog() {
  const [blog, setBlog] = useState({})
  const [comments, setComments] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const singleBlogDeets = async () => {
      try {
        const res = await axios.get(`${serverUrl}/blogs/${id}`)
        setBlog(res.data)
        setComments(res.data.comments)
      } catch (err) {
        console.warn(err)
      }
    }

    singleBlogDeets()
  }, [id, comments])

  const makeComment = async comment => {
    try {
      const res = await axios.post(`${serverUrl}/blogs/${id}/comment`, comment)
      setComments([...comments, res.data])
    } catch (err) {
      console.warn(err)
    }
  }

  const allComments = comments.map(comment => {
    // console.log(comment._id) // ASK WESTON ABOUT WHY THIS RUNS SO MANY TIMES!!!!
    return (
      <div key={comment._id}>
        <Comment comment={comment} blogId={id} />
      </div>
    )
  })

  //   console.log(blog)

  return (
    <div>
      <BlogDetails blog={blog} makeComment={makeComment} />
      {allComments}
    </div>
  )
}
