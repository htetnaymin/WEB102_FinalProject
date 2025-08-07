import './PostCard.css'
import { Link } from 'react-router-dom'
function PostCard({id, title, prompt_text, image_url, up_votes = 0, created_at}){

    const displayTime = created_at? new Date(created_at).toLocaleDateString('en-US', {
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
    }): "Just now"

    return(
        <Link 
        to={`prompt/${id}`}
        className="post-card">
            {/* Only show title */}
            <h3 className="post-title">{title}</h3>

            {/* Only show creation time and upvotes */}
            <div className="post-meta">
                <span className="post-time">{displayTime}</span>
                <span className="post-upvotes">👍 {up_votes}</span>
            </div>
        </Link>
    )
}

export default PostCard