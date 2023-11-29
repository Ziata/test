import Grid from '../layout/Grid';
import PostCard, {PostCardProp} from '../PostCard';
import React from 'react';

interface PhotoViewProps {
    newsletters: PostCardProp[];
}

export default function PhotoView({
                                      newsletters,
                                  }: PhotoViewProps) {

    return (
        <Grid rowCount={3}>
            {newsletters?.map((item) => {
                return <PostCard key={item.id} post={item} showReadLink={false}/>
            })}
        </Grid>
    )
}
