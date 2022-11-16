const { json } = require('express')
const express =require('express')
const {Router} = express


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const Productos = []


const RouterProductos = new Router()


RouterProductos.post('/', (req, res)=>{
    const obj = req.body
    const objs = Productos
    let newId 
    if (objs.length == 0) {
        newId = 1    
    } else {
        newId = objs[objs.length - 1].id + 1
    }
    const newObj = { ...obj, id: newId }
    Productos.push(newObj)
    console.log (newObj)
    console.log (Productos)
    res.json({"producto agregado con la id" : newObj})
})


RouterProductos.get('/', (req, res)=>{
    res.json({"Productos disponibles" : Productos})
})


RouterProductos.get('/:id',(req, res) => {
    const id = req.params.id
    console.log (id)
    const productoEnc = Productos.find(o => o.id == id)
    console.log(productoEnc)
    if (!productoEnc){
        res.json({"error": "producto no encontrado"})
    }
    else{
        res.json({"producto encontrado" : productoEnc})
    }
})


RouterProductos.put('/:id',(req, res) => {
    const id = req.params.id
    const objNuev = req.body
    console.log (id)
    console.log (objNuev)
    const objAnt = Productos[parseInt(id) -1 ]
    console.log(objAnt)
    Productos[parseInt(id) -1] = { ...objNuev, id: objAnt.id }
    if (!objAnt){
        res.json({"error": "producto no encontrado"})
    }
    else{
        res.json({actualizado : objAnt, por: objNuev})
    }
})


RouterProductos.delete('/:id',(req, res) => {
    const {id} = req.params
    console.log (id)
    const objEli = Productos.find(o => o.id == id)
    const objSel = Productos.findIndex(o => o.id == id)
    console.log(objSel)
    Productos.splice(objSel, 1)
    if (!objEli){
        res.json({"error": "producto no encontrado"})
    }
    else{
        res.json({Eliminado : objEli})
    }

})

const server = app.listen(8080, () =>{
    console.log("Servidor escuchando en el 8080")
})


app.use('/api/productos', RouterProductos)