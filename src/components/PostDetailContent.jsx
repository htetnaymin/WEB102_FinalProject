import './PostDetailContent.css'
import UpvoteButton from "./UpvoteButton"
import { Link } from 'react-router-dom'

function PostDetailContent({id, title, prompt_text, image_url, up_votes = 0, created_at}){

    const displayTime = created_at? new Date(created_at).toLocaleDateString('en-US', {
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
    }): "Just now"

    return(
        <div className="post-detail">
            <div className='post-detail-content'>
                
                <div className="post-title-container">
                    {title?(
                        <h3 className="post-title">{title}</h3>
                    ):
                    (
                        <h3 className="post-title placeholder">Enter a title to preview</h3>
                    )}
                    <Link className="edit-button" to={`/edit/${id}`}> Edit</Link>
                </div>

                {image_url && (
                    <div className="post-image-section">
                        <h3>Generated Image</h3>
                        <img
                        src={image_url}
                        alt ={"AI-generated image"}
                        className="post-image-large"
                        />
                    </div>
                )}


                <div className="post-content-section">
                    <h3>Prompt</h3>
                    {prompt_text&&(
                        <p>{prompt_text}</p>
                    )}
                </div>

            </div>
            <div className="post-meta">
                <span className="post-time">{displayTime}</span>
                <UpvoteButton
                    id={id}
                    up_votes = {up_votes}
                />
            </div>
        </div>
    )
}

export default PostDetailContent