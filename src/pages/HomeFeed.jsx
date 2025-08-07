import './HomeFeed.css'
import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useEffect } from "react"
import PostCard from '../components/PostCard'


function HomeFeed(){
    const [prompts, setPrompts] = useState([])
    const [filteredPrompts, setFilteredPrompts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('newest')
     
    useEffect(()=>{
        async function loadPrompts(){
            const {data} = await supabase
                            .from('prompts')
                            .select('*');
            setPrompts(data)
            setFilteredPrompts(data);
            console.log(data)
        }
        loadPrompts();
    }, [])
    //Filter by search term
    useEffect(()=>{
        let result = prompts
        if(searchTerm) {
            result = result.filter((prompt)=>
            prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        //Sort
        result = [...result]
        if(sortOrder === 'top'){
            result.sort((a,b) =>b.up_votes - a.up_votes)
        }else{
            result.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
        }

        setFilteredPrompts(result)
    }, [searchTerm, sortOrder, prompts])

    
    return(
        <div className="homepage">
            <h2 className="homepage-header">This is the Home Feed</h2>
        <div className='controls'>
            <div className='search-box'>
                <input 
                type="text"
                placeholder='Search prompts by title...'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                className='search-input' />
            </div>

            <div className='sort-box'>
                <select value={sortOrder} onChange={(e)=> setSortOrder(e.target.value)}>
                    <option value="newest">Newest First</option>
                    <option value="top">Top Prompts</option>
                </select>
            </div>
        </div>
        <div className='post-grid'>
        {filteredPrompts.length === 0? (
            <>
                <p>There is no Post Yet!</p>
            </>
            ): (
                filteredPrompts.map((prompt)=>(
                    <PostCard
                    key={prompt.id}
                    id={prompt.id}
                    title={prompt.title}
                    prompt_text={prompt.prompt_text}
                    image_url={prompt.image_url}
                    up_votes={prompt.up_votes}
                    created_at={prompt.created_at}
                    />
                    // <div
                    // key={prompt.id}
                    // className="post-card"
                    // >
                    //     <h3 className="post-title">{prompt.title}</h3>
                    //     {prompt.image_url ? (
                    //         <img
                    //             src={prompt.image_url}
                    //             alt="Generated AI content"
                    //             className="post-image"
                    //             loading="lazy"
                    //         />
                    //     ): null}
                    //     <div className="post-meta">
                    //         <span className="post-time">{prompt.created_at}</span>
                    //         <span className="post-upvotes">👍 {prompt.upvotes}</span>
                    //     </div>
                    // </div>
                ))
            )}
            </div>
        </div>
    )
}
export default HomeFeed