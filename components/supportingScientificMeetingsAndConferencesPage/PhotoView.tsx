import Grid from '../layout/Grid';
import PostCard, {PostCardProp} from '../PostCard';
import PaginationNumber from '../PaginationNumber';
import {useEffect, useState} from 'react';

export interface ViewProps {
    className?: string;
    events: PostCardProp[];
}

interface PhotoViewProps extends ViewProps {
    state?: object;
    total: number;
    page: number;
    onChange: (page: number) => void;
}

export default function PhotoView({
                                      events,
                                      state,
                                      className = '',
                                      total,
                                      page,
                                      onChange
                                  }: PhotoViewProps
) {
    const [current, setCurrent] = useState(page);
    useEffect(() => {
        onChange(current);
    }, [current]);


    if(!events.length){
        return <div className="text-[#aeaeae] text-3xl sm:text-6xl	text-center py-48">No Result Found</div>
    }

    return (
        <div className={className}>
            <Grid rowCount={3}>
                {events?.map((item) => {
                    return <PostCard key={item.id} post={Object.assign(item, {showExcerpt: false})}/>
                })}
            </Grid>
            <div className="mt-16 flex justify-center">
                <PaginationNumber current={current}
                                  state={state}
                                  pageSize={9}
                                  total={total}
                    // onChange={(currentNum) => setCurrent(currentNum)}
                                  onChange={(currentNum) => {
                                      if(!state){
                                          setCurrent(currentNum)
                                      }
                                  }}
                />
            </div>
        </div>
    );
}
