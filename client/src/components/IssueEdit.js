import React, {useState, useContext} from "react";
import { UserContext } from "../context/UserContext";

export default function IssueEdit(props) {

    const initInputs = {
        title: props.title || "",
        description: props.description || ""
    }

    const [ inputs, setInputs ] = useState(initInputs)
    const { editIssue } = useContext(UserContext)

    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        editIssue(inputs, props._id)
        props.toggleEdit(prevState => !prevState)
    }

    const { title, description } = inputs

    return (
        <form className="issue-edit" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"
            />
            <textarea 
                type="textarea"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
            />            
            <button>Save Changes</button>
        </form>
    )

}