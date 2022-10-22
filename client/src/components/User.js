import React, {useState, useEffect} from "react";
import PublicIssue from "./PublicIssue";
import axios from "axios";

export default function User(props) {

    const { username, _id } = props
    const [issues, setIssues] = useState([])
    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    useEffect(() => {
        userAxios.get(`/api/issue/user/${_id}`)
            .then(res => setIssues(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    },
    [])

    issues.sort((a, b) => (a.upVotes < b.upVotes ? 1 : -1))

    return (
        <div className="user-card">
            <h1> { username }'s Issues </h1>
            {issues.map(issue => <PublicIssue {...issue} key={issue._id} />)} 
        </div>
    )
}