import { useState } from "react"
import { supabase } from "../supabaseClient"

function UpvoteButton({ id, up_votes: initialUpvotes }){
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [isUpvoted, setIsUpvoted] = useState(false);

    const handleUpvote = async () => {
        const originalUpvotes = upvotes;
        const originalIsUpvoted = isUpvoted;

        const newUpvotes = isUpvoted ? upvotes - 1 : upvotes + 1;
        
        setUpvotes(newUpvotes);
        setIsUpvoted(!isUpvoted);

        const { error } = await supabase
            .from('prompts')
            .update({ up_votes: newUpvotes })
            .eq('id', id);

        if (error) {
            console.error("Error upvoting post:", error);
            // Revert state if the API call fails
            setUpvotes(originalUpvotes);
            setIsUpvoted(originalIsUpvoted);
            alert("Failed to upvote.");
        }
    };

    return(
        <button 
        className={`upvote-button ${isUpvoted ? 'upvoted' : ''}`}
        onClick={handleUpvote}
        >
            👍 {upvotes}
        </button>
    )
}
export default UpvoteButton