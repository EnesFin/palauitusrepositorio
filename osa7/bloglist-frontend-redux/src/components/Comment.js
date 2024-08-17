import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { createComment } from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

const Comment = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const { id, comments } = blog

  const handleComment = (event) => {
    event.preventDefault()
    console.log(comment)
    dispatch(createComment(id, comment))
    setComment('')
  }

  return (
    <div>
      <h3>comments</h3>
      {comments.length > 0 && (
        <ListGroup as='ul' variant='flush'>
          {comments.map((comment, i) => (
            <ListGroup.Item as='li' key={i}>
              {comment}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <Form onSubmit={handleComment}>
        <Form.Group
          className='mb-3'
          controlId='exampleForm.ControlTextarea1'
          onChange={({ target }) => setComment(target.value)}>
          <Form.Label>Comment</Form.Label>
          <Form.Control as='textarea' rows={3} />
        </Form.Group>
        <button id='comment' type='submit'>
          comment
        </button>
      </Form>
    </div>
  )
}

export default Comment
