// 首页 Latest News
// 首页 最新新闻
import {useTranslation} from 'next-i18next';
import PlainMenu, {PlainMenuProp} from '../PlainMenu';
import ListBox from '../ui/ListBox';
import {useState} from 'react';
import Link from 'next/link';
import PostList from '../PostList';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import OverlappingItems, {generateOverlappingImage} from '../OverlappingItems';
import PostCard, {PostCardProp} from '../PostCard';
import PaginationDash from 'components/PaginationDash';
import {gql, useQuery} from '@apollo/client';
import {NextRouter, useRouter} from 'next/router';
import {toUpperLocale} from '../../utils/i18n';
import Main from '../layout/Main';
import {Category, toLocaleCategory} from '../../utils/category';
import {serverDateStringToLocalDate} from '../../utils/date';
import LinkPath from "../../utils/LinkPath";

const POST_PER_PAGE = 5;
let postCount = 0;

export const getPosts: (data: any) => PostCardProp[] = (data) => data?.posts?.nodes?.map((item) => ({
    id: item?.id,
    image: item?.featuredImage?.node?.sourceUrl,
    category: item?.categories?.edges[0]?.node?.slug,
    title: item?.title,
    date: item?.date && serverDateStringToLocalDate(item.date),
    link: `${LinkPath.news}${item?.slug}`,
    excerpt: item?.vsComposerExcerptRendered,
    reportLinks: item?.meetingReport?.reportLinks?.map((link) => link.link)
        ?? (item?.newsletterAndAnnualReport?.link && [item?.newsletterAndAnnualReport?.link])
}));

const getListedPosts: (posts: PostCardProp[]) => PostCardProp[] = (posts) => posts && posts.length > 0 ? posts.slice(1) : [];

const getCount: (data: any, lastCount: number) => number = (data, lastCount) => {
    const count: number = Number(data?.posts?.pageInfo?.offsetPagination?.total);
    return Number.isNaN(count) ? lastCount : count;
};

export const getCategories: (id: string, router: NextRouter) => Category[] = (id, router) => {

    switch (id) {
        case 'All':
            return ["tcci-in-the-news", "announcements", "research-news", "meeting-reports"]
                .map((item) => toLocaleCategory(item as Category, router));
        default:
            return [toLocaleCategory(id as Category, router)];
    }
}

export default function NewsOverview({
                                         postData
                                     }) {
    const {t} = useTranslation('common');
    const upperLocale = toUpperLocale(useRouter());
    const router = useRouter();

    const [selectedId, setSelectedId] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    let {data} = useQuery(NewsOverview.query, {
        variables: {
            postLocale: upperLocale,
            offset: (currentPage - 1) * POST_PER_PAGE,
            categories: getCategories(selectedId, router)
        },
    });


    let posts = getPosts(data);
    let listedPosts = getListedPosts(posts);
    postCount = getCount(data, postCount);

    const menus: PlainMenuProp[] = [
        {
            id: 'All',
            title: t('All'),
            onClick(e) {
                setSelectedId('All');
                setCurrentPage(1);
            },
        },
        {
            id: 'tcci-in-the-news',
            title: t('TCCI in the News'),
            onClick(e) {
                setSelectedId('tcci-in-the-news');
                setCurrentPage(1);
            },
        },
        {
            id: 'announcements',
            title: t('Announcements'),
            onClick(e) {
                setSelectedId('announcements');
                setCurrentPage(1);
            },
        },
        {
            id: 'research-news',
            title: t('Research News'),
            onClick(e) {
                setSelectedId('research-news');
                setCurrentPage(1);
            },
        },
        {
            id: 'meeting-reports',
            title: t('Meeting Reports'),
            onClick(e) {
                setSelectedId('meeting-reports');
                setCurrentPage(1);
            },
        }
    ];

    let viewMoreLink: string = '/newsroom';
    if (selectedId !== 'All') {
        viewMoreLink += `?category=${selectedId}`
    }

    return (
        <div className="bg-neutral-100 py-12 sm:py-24">
            <Main>
                <div className="pb-0 md769:pb-8 items-center flex justify-between flex-wrap ">
                    <p className="text-2xl mr-16">{t('Latest News')}</p>
                    <PlainMenu menus={menus}
                               className="space-x-4 lg:space-x-12 hidden md769:flex"
                               textClass="text-[#8fa0ab] font-light hover:text-tcci-blue"
                               selectClass="!text-tcci-blue !font-normal"
                               selectId={selectedId}/>
                </div>
                <ListBox className="flex md769:hidden -ml-3"
                         menus={menus}
                         selectId={selectedId}
                         onChange={(id) => setSelectedId(id)}
                         optionsClassName={'!w-auto'}
                />
                <div className="flex justify-between">
                    <div
                        className={[" hidden md:block py-8", listedPosts && listedPosts.length ? 'w-2/5' : 'w-full'].join(' ')}>
                        <div className="flex justify-center">
                            <div className="relative w-[30rem] h-[28rem]">
                                {posts && posts.length > 0 && <OverlappingItems
                                    backItem={generateOverlappingImage(posts[0].image)}
                                    frontItem={<PostCard post={posts[0]} showImage={false}/>}
                                    direction="bottom-left"
                                    percentage="1/4"/>}
                            </div>
                        </div>
                    </div>
                    {listedPosts && listedPosts.length > 0 && <div className="hidden md:block w-1/2 flex justify-end">
                        <div className="flex justify-end">
                            <PostList className="max-w-xl" posts={listedPosts}/>
                        </div>
                    </div>}
                    {posts && posts.length > 0 && <div className="block md:hidden flex justify-end">
                        <div>
                            <PostList className="max-w-xl" posts={posts}/>
                        </div>
                    </div>}
                </div>
                {<PaginationDash
                    className="flex justify-center"
                    current={currentPage}
                    total={postCount <= 15 ? postCount : 15}
                    pageSize={5}
                    onChange={(current) => setCurrentPage(current)}
                />}
                <Link href={viewMoreLink}>
                    <a className="block relative bottom-0 p-8 pb-0 text-center hover:text-tcci-orange-o70">{t('View more')}
                        <ChevronRightIcon className="w-5 h-5 inline-block" aria-hidden={true}/></a>
                </Link>
            </Main>

        </div>
    );
}

NewsOverview.query = gql`
query getData (
  $postLocale: LanguageCodeFilterEnum!
  $offset: Int
  $categories: [String]
){
  posts(
    where: {
      taxQuery: {
        taxArray: [
          {
            taxonomy: CATEGORY, 
            field: SLUG, 
            terms: $categories, 
            includeChildren: false, 
            operator: IN
          }
        ]
      }
      language: $postLocale, 
      offsetPagination: {size: 5, offset: $offset}, orderby: [{field: DATE, order: DESC}]}
  ) {
    pageInfo{
      offsetPagination{
        total
      }
    }
    nodes {
      id
      slug
      featuredImage {
        node {
          sourceUrl(size: MEDIUM_LARGE)
        }
      }
      categories {
        edges {
          node {
            slug
          }
        }
      }
      title(format: RENDERED)
      date
      link
      vsComposerExcerptRendered
      meetingReport {
        reportLinks {
          link
        }
      }
      newsletterAndAnnualReport {
        link
      }
    }
  }
}
`;
