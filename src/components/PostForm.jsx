import './PostForm.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './PostForm.css';

const AI_MODELS = [
  'Midjourney',
  'DALL·E',
  'Stable Diffusion',
  'Adobe Firefly',
  'Leonardo.Ai',
  'Other',
];


function PostForm({initialData = null, submit_label, onSubmit}){
    const [formData, setFormData] = useState({
        title: initialData?.title ||'', 
        prompt_text: initialData?.prompt_text|| '', 
        image_url: initialData?.image_url || '', 
        ai_model: initialData?.ai_model || '', 
        user_id: initialData?.user_id || null,
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                prompt_text: initialData.prompt_text || '',
                image_url: initialData.image_url || '',
                ai_model: initialData.ai_model || '',
                user_id: initialData.user_id || null,
            });
        }
    }, [initialData]);

    const handleChange= (e)=>{
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }



    return(
        <form onSubmit={handleFormSubmit} className="prompt-form">
            <div className="form-group">
                <label htmlFor="title"></label>
                <input 
                type="text" 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Cyberpunk Cat in Neon City"
                required/>
            </div>

            <div className="form-group">
                <label htmlFor="prompt-text">Full Prompt Text</label>
                <textarea 
                name="prompt_text" 
                id="prompt_text"
                value={formData.prompt_text}
                onChange={handleChange}
                rows="5"
                placeholder="e.g., A cyberpunk cat wearing a glowing jacket, walking in a neon-lit Tokyo street at night, cinematic lighting, 8k, detailed, unreal engine"
                required
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="image_url">Image URL (Optional)</label>
                <input 
                type="url"
                name="image_url"
                id="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/ai-generated-image.jpg" />
            </div>

            <button type="submit" className="submit-btn">
                {submit_label}
            </button>
        </form>
    )
}
export default PostForm