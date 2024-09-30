'use client'

import React, { useState, useEffect } from "react";

import { PromptCardList } from "./PromptCardList";

const Feed = () => {

    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])
    const [allPosts, setAllPosts] = useState([])

    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearchText(e.target.value)
        if (e.target.value !== '') {
            let filteredPosts = posts.filter((p) =>
                p.prompt.toLowerCase().includes(`${searchText}`) ||
                p.tag.toLowerCase().includes(`${searchText}`) ||
                p.creator.username.toLowerCase().includes(`${searchText}`)
            )
            setPosts(filteredPosts)
        } else {
            setPosts(allPosts)
        }
    }

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()
            setPosts(data)
            setAllPosts(data)
        }
        fetchPost()
    }, [])

    const handleTagClick = (tag) => {
        setSearchText(tag)
        let filteredPosts = posts.filter((p) =>
            p.tag.toLowerCase().includes(`${tag}`)
        )
        setPosts(filteredPosts)
    }

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search_input peer" />
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={() => handleTagClick}
            />

        </section>
    );
};

export default Feed;
