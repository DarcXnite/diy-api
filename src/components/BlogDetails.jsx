import CommentForm from './CommentForm'

export default function BlogDetails({
  blog: { name, title, content },
  makeComment,
}) {
  return (
    <div>
      <h1>{title}</h1>
      <h2>By: {name}</h2>
      <p>{content}</p>

      <CommentForm makeComment={makeComment} />
    </div>
  )
}
