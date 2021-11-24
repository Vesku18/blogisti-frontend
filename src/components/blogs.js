import React, {useState} from 'react'


const Blogs = ({user, blogs, updateBlog}) => { 
    
    if (user !== null) { 
        return(
            blogs.map(n=> <Rivi key = {n.id} n = {n} author = {n.author} likes = {n.likes} url = {n.url} updateBlog = {updateBlog} />)
        )
    }
    else
        return ( "nobody logged in yet" )
}


const Rivi = ({n,author, likes, url, updateBlog}) => { 
    const [details, set_detail_level] = useState(false)

    const toggleDetails = () => { set_detail_level(!details)} 

    let style = {display: 'none'}
    let text = 'Show'
    if (details){ 
        style = {display: ''}
        text = 'hide'
    }

    const addLike = (event) => {
        event.preventDefault()
        const newData = n
        newData['likes'] = n['likes'] +1
        updateBlog(n.id, newData)
    }

    return( 
    <div>        
        <div> 
            Juttu: {n.title}   
            <button onClick = {toggleDetails} > {text} </button>
        </div>
        <div style={style} >
            <p>Url:{n.url}</p>
            <p>likes:{n.likes} <button  onClick={addLike}> like </button>
            </p>
            <p> Tuottaja: {n.author} </p>
        </div>
    </div>
    )

}

export default Blogs

