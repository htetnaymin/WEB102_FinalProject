import "./PostPage.css"
import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { useParams} from 'react-router-dom'
import PostDetailContent from "../components/PostDetailContent"

function PostPage(){
    const {id} = useParams()
    const [prompt, setPrompt] = useState(null)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    useEffect(()=>{
        async function loadPromptAndComments(){
            //Load Prompts
            const {data} = await supabase
                                .from('prompts')
                                .select("*")
                                .eq('id', id)
                                .single()
            setPrompt(data)

            //Load comments
            const {data: commentsData} = await supabase
                                            .from('comments')
                                            .select("*")
                                            .eq('post_id', id)
                                            .order('created_at', {ascending:false})
            setComments(commentsData || [])
        }

        loadPromptAndComments()
    }, [id])

    const handleAddComment = async (e) =>{
        e.preventDefault()
        if(!newComment.trim()) return
        const {data} = await supabase
                                .from("comments")
                                .insert([{
                                    post_id: id, 
                                    content: newComment.trim(),
                                }])
                                .select()
        if (data) {
            setComments([data[0], ...comments])
        }
        setNewComment('')
    }

    const handleDeleteComment = async(commentId) =>{
        if(!window.confirm("Delete this comment?")) return
        await supabase
                .from("comments")
                .delete()
                .eq('id', commentId)
        setComments(comments.filter((c)=> c.id !=commentId))
    }

    if(!prompt) return <div>Prompt not found</div>
    return(
        <div className="post-page">
            <PostDetailContent
                title={prompt.title}
                prompt_text={prompt.prompt_text}
                image_url={prompt.image_url}
                up_votes={prompt.up_votes}
                created_at={prompt.created_at}
                id = {prompt.id}
            />

            <div className="comments-section">
                <h3>Comments ({comments.length})</h3>

                <form onSubmit={handleAddComment} className="comment-form">
                    <textarea 
                        value={newComment}
                        onChange={(e)=> setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        row="3"
                        required></textarea>
                        <button type="submit" disabled={!newComment.trim()}>
                            Post Comment
                        </button>
                </form>
                <div className="comments-list">
                    {comments.length === 0?(
                        <p className="no-comments">No comments yet. Be the first!</p>
                    ):(
                        comments.map((comment)=>(
                            <div key={comment.id} className="comment-item">
                                <div className="comment-content">
                                    <p>{comment.content}</p>
                                    <small className="comment-meta">
                                        {new Date(comment.created_at).toLocaleDateString()} 
                                    </small>

                                    <button
                                        onClick={()=> handleDeleteComment(comment.id)}
                                        className="delete-comment-btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    )
}
export default PostPage