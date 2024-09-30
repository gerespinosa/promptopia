
import PromptCard from "./PromptCard";
export const PromptCardList = ({ data, handleTagClick }) => {

    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard key={post.id}
                    post={post}
                    handleTagClick={handleTagClick(post.tag)}
                />)
            )}
        </div>
    )
}