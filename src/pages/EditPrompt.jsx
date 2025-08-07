import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from "../supabaseClient"
import PostForm from '../components/PostForm';
import './EditPrompt.css';

function EditPrompt(){
    const {id} = useParams();
    const [prompt, setPrompt] = useState(null);

    useEffect(()=>{
        const fetchPost = async()=>{
            const {data} = await supabase
                                .from('prompts')
                                .select("*")
                                .eq('id', id)
                                .single();
            if(!data) return; 
            setPrompt(data);
        }
        fetchPost();
    }, [id]);

    const handleUpdate = async (updatedData) =>{
        await supabase
                .from("prompts")
                .update({...updatedData})
                .eq("id", id);
        window.location= `/prompt/${id}`
    }

    const handleDelete = async()=>{
        if (!window.confirm('Delete this prompt? This cannot be undone.')) return;
        await supabase.from('prompts').delete().eq('id', id);

        window.location = "/";
    }

    return(
        <div className="edit-prompt-page">
        <h1>Edit Prompt</h1>

        <PostForm
            initialData={prompt}
            onSubmit={handleUpdate}
            submit_label = "Save Changes"
        />
        <div className="edit-prompt-actions">
            <Link to={`/prompt/${id}`} className="btn-cancel">
                Cancel
            </Link>

            <button onClick={handleDelete} className="btn-delete">
                Delete Prompt
            </button>
        </div>
        </div>

    )
}

export default EditPrompt