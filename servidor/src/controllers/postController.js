import { getModel, createPostModel } from '../models/postModel.js'


export const getAllPosts = async (req, res) => {
  try {
    const post = await getModel() 
    res.json({ post }) 
  } catch (error) {
    res.json({ error: 'Error al procesar la solicitud' })
  }
}

export const createPost = async (req, res) => {
  try {
    const {titulo,img,descripcion,likes  } = req.body
    const newPost = await createPostModel(titulo,img,descripcion,likes)// llamo al modelo
    res.json({ post: newPost })
  } catch (error) {
    res.json({ error: 'Error al procesar la solicitud' })
    console.error('Error =>', error)
  }
}
