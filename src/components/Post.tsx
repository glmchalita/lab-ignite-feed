import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import Avatar from './Avatar'
import Comment from './Comment'
import styles from './Post.module.css'
import { ChangeEvent, FormEvent, useState } from 'react'

interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

export interface PostType {
  id: number
  author: Author
  content: Content[]
  publishedAt: Date
}

interface PostProps {
  post: PostType
}

export default function Post({ post }: PostProps) {
  const [comments, setComments] = useState([
    'Dhr'
  ])
  
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBr,
    addSuffix: true,
  })
  
  const isNewCommentEmpty = newCommentText.length === 0

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()
    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewComment(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeletedOne)
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === 'link') {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
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