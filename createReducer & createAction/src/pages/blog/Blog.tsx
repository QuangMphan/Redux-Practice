import CreatePost from './components/CreatePost/CreatePost'
import PostList from './components/PostList/PostList'

const Blog = () => {
    return (
        <div className='p-5'>
            <CreatePost />
            <PostList />
        </div>
    )
}

export default Blog
