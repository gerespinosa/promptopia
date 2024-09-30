'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PromptCard from "@app/components/PromptCard";

const UserProfile = () => {

    const { username } = useParams()

    const [user, setUser] = useState(null)
    const [userPrompts, setUserPrompts] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/users/by-username/${username}`)
            const data = await response.json()
            setUser(data)
        }
        fetchUser()
    }, [username])

    useEffect(() => {
        const fetchPromps = async () => {
            const promptResponse = await fetch(`/api/users/by-id/${user?._id}/posts`)
            const promptData = await promptResponse.json()
            console.log(promptData)
            setUserPrompts(promptData)
        }
        fetchPromps()
    }, [user])

    const handleTagClick = (tag) => {
        let filteredPosts = posts.filter((p) =>
            p.tag.toLowerCase().includes(`${tag}`)
        )
        setPosts(filteredPosts)
    }

    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">
                    {user?.username}'s Profile
                </span>
            </h1>
            <div className="mt-10 prompt_layout">
                {userPrompts.map((post) => (
                    <PromptCard key={post.id}
                        post={post}
                    />)
                )}
            </div>

        </section>

    );
};

export default UserProfile;
