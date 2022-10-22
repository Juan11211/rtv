

import React, {useState, useContext} from "react";
import { UserContext } from "../context/UserContext";
import IssueEdit from "./IssueEdit";

export default function Issue(props) {

    const [ canEdit, toggleEdit] = useState(false)

    const {addIssue, deleteIssue} = useContext(UserContext)
    const {title, description, _id} = props

    return (
        <div className="issue">
            {
                !canEdit?
            <>
                <h1> { title } </h1>
                <h3> { description } </h3>
                <button onClick={() => deleteIssue(_id)}>Delete Issue</button>
                <button onClick={() => toggleEdit(prevState => !prevState)}>Edit Issue</button>
            </>
            :
            <>
                <IssueEdit {...props} addIssue={addIssue} toggleEdit={toggleEdit} />
                <button onClick={() => deleteIssue(_id)}>Delete Issue</button>
                <button onClick={() => toggleEdit(prevState => !prevState)}>Cancel</button>
            </>
            }
        </div>
    )
    
}