import {PostCardProp} from '../PostCard';
import ListViewMonth from './ListViewMonth';
import {ViewProps} from './PhotoView';

const classifyByMonth: (events: PostCardProp[]) => PostCardProp[][] = (events) => {
    const classifiedEvents = new Array<PostCardProp[]>(12);
    events.forEach((item) => {
        const month = item.date[0].getMonth();
        if (!classifiedEvents[month]) {
            classifiedEvents[month] = new Array<PostCardProp>;
        }
        classifiedEvents[month].push(item);
    });
    classifiedEvents.filter((item) => item != null);
    return classifiedEvents;
}

export default function ListView({
                                     events,
                                 }: ViewProps) {



    if(!events.length){
        return <div className="text-[#aeaeae] text-3xl sm:text-6xl	text-center py-48">No Result Found</div>
    }

    return (
        <div className="space-y-8">
            {classifyByMonth(events).map((item, index) => <ListViewMonth key={index} events={item}/>)}
        </div>
    );
}
