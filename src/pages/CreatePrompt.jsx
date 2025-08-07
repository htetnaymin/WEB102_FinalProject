import { useState } from "react"
import { supabase } from "../supabaseClient"
import { Link } from "react-router-dom"
import PostCard from "../components/PostCard"
import './CreatePrompt.css'
import PostForm from "../components/PostForm"

function CreatePrompt(){
    // const [formData, setFormData] = useState({
    //     title:'', 
    //     prompt_text: '', 
    //     image_url: '', 
    //     ai_model: '', 
    //     user_id: null,
    // })

    // const handleChange = (e)=>{
    //     const {name, value} = e.target

    //     setFormData((prev) => ({
    //         ...prev, 
    //         [name]: value
    //     }))
    // }

    const handleSubmit = async (formData) =>{
        if(!formData.title.trim()){
            return
        }

        if(!formData.prompt_text.trim()){
            return
        }
        await supabase
            .from('prompts')
            .insert([formData]);
        window.location="/";
    }

    return(
        <div className="create-prompt-page">
            <div className="form-container">
                <h1>Create a New AI Prompt</h1>
                <p>Share your best AI image generation prompts with the community. </p>

                <PostForm 
                submit_label={"Create Post"}
                onSubmit={handleSubmit}
                />

                <Link 
                className="btn-cancel"
                to="/">
                    Cancel
                </Link>
                {/* <form onSubmit={handleSubmit} className="prompt-form">
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
                        onChange={handleChange}
                        placeholder="https://example.com/ai-generated-image.jpg" />
                    </div>

                    <button type="submit" className="submit-btn">
                        Create Prompt
                    </button>
                </form> */}

                

            </div>

            {/* <div className="preview-section">
                <PostCard 
                title={formData.title} 
                image_url={formData.image_url}
                prompt_text={formData.prompt_text} />
            </div> */}
        </div>
    )
}

export default CreatePrompt