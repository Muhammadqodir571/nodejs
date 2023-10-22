const http=require('http')
const {v4}=require('uuid')
const getBooksData = require('./UUTIL.JS')
let books=[
    {
        id:"1",
        title:"odam bolish qiyin",
        auhtor:"O'tkir Hoshimov",
        pages:250
    }
]


const server= http.createServer(async(req,res)=>{
    if(req.url==='/books'   && req.method==='GET'){
      res.writeHead(200,{'Content-Type':'application/json  charset=utf8'})

        const resp={
            status:'OK',
            books
        }
        res.end(JSON.stringify(resp))
    }else if(req.url==='/books'  && req.method=='POST'){
        const data=await getBooksData(req)

        const {title,pages,author}  = JSON.parse(data)

        const newBook={
            id:v4(),
            title:title,
            pages:pages,
            author:author
        }
        books.push(newBook)
         const resp={
            status:"Creatbook",
            book:newBook
        }
        res.writeHead(200,{'Content-Type':'application/json  charset=utf8'})

        res.end(JSON.stringify(resp))
    }else if(req.url.match(/\/books\/\w+/)  && req.method==='GET'){
        const  id=req.url.split('/')[2]
        const book= books.find(b=>b.id===id)

        res.writeHead(200,{'Content-Type':'application/json  charset=utf8'})

        const resp={
            status:'OK',
            book
        }

        res.end(JSON.stringify(resp))
    }else if(req.url.match(/\/books\/\w+/)  && req.method==='PUT'){
        const id= req.url.split('/')[2]
        const data=await getBooksData(req)

        const {title,pages,author}=JSON.parse(data)

        const idx=books.findIndex(b => b.id===id)

        const changeBook={
            id:books[idx].id,
            title:title || books[idx].title,
            pages:pages || books[idx].pages,
            author:author||books[idx].author
        }

        books[idx]=changeBook

        res.writeHead(200,{'Content-Type':'application/json  charset=utf8'})

        const resp={
            status:'OK',
            book: changeBook
        }
        res.end(JSON.stringify(resp))
    }else if(req.url.match(/\/books\/\w+/)  && req.method==='DELETE'){
        const id = req.url.split('/')[2]

        books= books.filter( b => b.id !==id)
        res.writeHead(200,{'Content-Type':'application/json  charset=utf8'})
            const resp={
            status:'DELETE',
            }
            

            res.end(JSON.stringify(resp))
    }
 })



const PORT=process.env.PORT || 3000;

server.listen(PORT,()=>{
    console.log(`server run ${PORT}`);
})