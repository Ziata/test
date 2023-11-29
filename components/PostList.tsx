import PostCardSmall, {PostInfoProp} from './PostCardSmall';

interface PostListProps {
    posts: PostInfoProp[];
    className: string;
}

function PostList({posts, className}: PostListProps) {
    return (
        <ul className={['py-4', className].join(' ')}>
            {posts.length > 0 && posts.map((post) => <PostCardSmall key={post.id ?? ''} post={post}/>)}
        </ul>
    );
}

export default PostList;
