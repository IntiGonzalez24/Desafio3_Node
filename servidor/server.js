import express from 'express'
import cors from 'cors'
import pool from './db/config.js'

import 'dotenv/config'







const PORT = process.env.PORT || 3000

const app = express()

app.use(cors());
app.use(express.json())



app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts")
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al obtener los posts" })
  }
})
app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body
  try {
    const result = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *",
      [titulo, img, descripcion]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al crear el post" })
  }
})






app.listen(PORT, console.log(`🔥 Server on 🔥 http://localhost:${PORT}`))
