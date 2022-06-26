import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const serverUrl = `${process.env.REACT_APP_SERVER_URL}`

export default function Comment({
  comment: { _id, content },
  blogId,
  setComments,
}) {
  const [editedComment, setEditedComment] = useState({ content: '' })
  const [edit, setEdit] = useState(false)

  const navigate = useNavigate()

  const deleteComment = async () => {
    try {
      await axios.delete(`${serverUrl}/comment/${_id}`)
      const res = await axios.get(`${serverUrl}/blogs/${blogId}`)
      setComments(res.data.comments)
      console.log(res)
      navigate(`/blogs/${blogId}`)
    } catch (err) {
      console.warn(err)
    }
  }

  const editComment = async e => {
    e.preventDefault()
    try {
      await axios.put(`${serverUrl}/comment/${_id}`, editedComment)
      const res = await axios.get(`${serverUrl}/blogs/${blogId}`)
      setComments(res.data.comments)
      setEdit(!edit)
    } catch (err) {
      console.warn(err)
    }
  }

  const changeToEdit = () => {
    setEdit(!edit)
    setEditedComment({ content })
  }

  return (
    <div>
      {!edit ? (
        <div>
          <p>{content}</p>
          <button onClick={deleteComment}>Delete Comment</button>
          <button onClick={changeToEdit}>Edit</button>
        </div>
      ) : (
        <form onSubmit={editComment}>
          <input
            type='text'
            value={editedComment.content}
            onChange={e => setEditedComment({ content: e.target.value })}
          />
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  )
}
