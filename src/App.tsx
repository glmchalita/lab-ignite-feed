import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Post, { PostType } from "./components/Post";

import styles from './App.module.css'

import "./global.css"

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/glmchalita.png',
      name: 'Guilherme Chalita',
      role: 'Web Developer'
    },
    content: [
      {type: 'paragraph', content: 'Fala galera 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'glmchalita.design/doctorcare'},
    ],
    publishedAt: new Date('2023-12-20 15:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/lukasbiscaro.png',
      name: 'Lukas Biscaro',
      role: 'Web Developer'
    },
    content: [
      {type: 'paragraph', content: 'Fala galera 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'lukasbiscaro.design/doctorcare'},
    ],
    publishedAt: new Date('2023-12-24 12:00:00'),
  }
]

export default function App() {
  return (
    <>
      <Header />
      
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post 
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}
