import pool from '../../db/config.js'

export const getModel = async (req,res) => {
  

  const result = await pool.query("SELECT * FROM posts")
  return res.json(result.rows)

}

export const createPostModel = async (titulo,img,descripcion) => {
  const sqlQuery = {
    text: 'INSERT INTO POSTS (titulo,img,descripcion,likes) values ($1,$2,$3,0) RETURNING *',
    values: [titulo,img,descripcion]
  }
  const result = await pool.query(sqlQuery)
  console.log('Viaje agregado', result)
  return result.rows
}
