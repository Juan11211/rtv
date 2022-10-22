// import React, { useContext } from 'react'
// import TodoForm from './TodoForm.js'
// import TodoList from './TodoList.js'
// import Todo from './Todo.js'
// import { UserContext } from '../context/UserContext.js'

// export default function Profile(){
//   const { 
//     user: { 
//       username 
//     }, 
//     addTodo, 
//     todos 
//   } = useContext(UserContext)

//   return (
//     <div className="profile">
//       <h1>Welcome @{username}!</h1>
//       <h3>Add A Todo</h3>
//       <TodoForm addTodo={addTodo}/>
//       <h3>Your Todos</h3>
//       <TodoList todos={todos}/>
//     </div>
//   )
// }

import React, {useContext, useEffect}  from "react";
import { UserContext } from "../context/UserContext";
import IssueForm from "./IssueForm";
import IssueList from "./IssueList";

export default function Profile() {

    const {
        user: {
            username
        },
        getUserIssues,
        addIssue,
        issues,
    } = useContext(UserContext)

    useEffect(getUserIssues, [])

    return (
        <div className="profile">
            <h1>Welcome { username[0].toUpperCase() + username.substring(1) }!</h1>
            <h3>Add an Issue ➕</h3> 
                <IssueForm addIssue={addIssue}/>
            <h3>Your Issues 📓</h3>
                <IssueList issues={issues} />
        </div>
    )
    
}