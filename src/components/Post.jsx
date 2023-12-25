import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import Avatar from './Avatar'
import Comment from './Comment'
import styles from './Post.module.css'
import { useState } from 'react'

export default function Post({author, publishedAt, content}) {
  const [comments, setComments] = useState([])
  
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  })
  
  const isNewCommentEmpty = newCommentText.length === 0

  function handleCreateNewComment() {
    event.preventDefault()
    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewComment() {
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeletedOne)
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.contet}>{line.content}</p>;
          } else if (line.type === 'link') {
            return <p key={line.contet}><a href='#'>{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          onChange={handleNewComment}
          value={newCommentText}
          placeholder='Deixe um comentário'
        />
        
        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment key={comment} onDeleteComment={deleteComment} content={comment}/>
        })}
      </div>
    </article>
  )
}