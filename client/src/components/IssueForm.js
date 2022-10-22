import React, {useState} from "react";

export default function IssueForm(props){

    const initInputs = {
        title: "",
        description: ""
    }

    const [ inputs, setInputs ] = useState(initInputs)

    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.addIssue(inputs)
        setInputs(initInputs)
    }

    const { title, description } = inputs

    return (
        <form className="issue-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"
            />
            <textarea 
                type="text"
                cols="20"
                rows="5"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
            />
            <button>Add Issue</button>
        </form>
    )

}