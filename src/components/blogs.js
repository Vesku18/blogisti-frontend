import React, {useState} from 'react'


const Blogs = ({user, blogs}) => { 
    
    if (user !== null) { 
        return(
            blogs.map(n=> <Rivi key = {n.id} n = {n} author = {n.author} likes = {n.likes} url = {n.url} />)
        )
    }
    else
        return ( "nobody logged in yet" )
}


const Rivi = (n,author, likes, url) => { 
    const [details, set_detail_level] = useState(false)

    const toggleDetails = () => { set_detail_level(!details)} 

    let style = {display: 'none'}
    let text = 'Show'
    if (details){ 
        style = {display: ''}
        text = 'hide'
    }

    return( 
    <div>        
        <div> 
            Juttu: {n.title}   
            <button onClick = {toggleDetails} > {text} </button>
        </div>
        <div style={style} >
            <p>Url:{n.url}</p>
            <p>likes:{n.likes}</p>
            <p> Tuottaja: {n.author} </p>
        </div>
    </div>
    )
}

export default Blogs

