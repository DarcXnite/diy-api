import React, { useState } from 'react'

export default function CommentForm({ makeComment }) {
  const [comment, setComment] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    makeComment({ content: comment })
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='comment'>Make a comment: </label>
      <input
        type='text'
        id='comment'
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  )
}
