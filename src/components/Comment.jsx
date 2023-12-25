import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import Avatar from './Avatar'
import { useState } from 'react'

export default function Comment({content, onDeleteComment}) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
  }
  
  function handleLikeComment() {
    setLikeCount(likeCount + 1)
  }
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/glmchalita.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Guilherme Chalita</strong>

              <time title='23 de Dezembro de 2023 às 16:25h' dateTime='2023-12-23 16:25:00'>Cerca de 3h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24}/>
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp onClick={handleLikeComment}/>
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}