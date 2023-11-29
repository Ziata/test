import {gql, useQuery} from '@apollo/client';
import {toUpperLocale} from '../../utils/i18n';
import {useRouter} from 'next/router';
import Grid from '../layout/Grid';
import PostCard, {PostCardProp} from '../PostCard';
import FilterBar from './FilterBar';
import Loading from '../ui/Loading';
import PaginationNumber from '../PaginationNumber';
import {useEffect, useState} from 'react';
import {getCategories} from '../homePage/NewsOverview';
import {serverDateStringToLocalDate} from '../../utils/date';
import LinkPath from "../../utils/LinkPath"

export const getPosts: (data: any) => PostCardProp[] = (data) => data?.posts?.nodes?.map((item) => ({
    id: item?.id,
    image: item?.featuredImage?.node?.sourceUrl,
    category: item?.categories?.edges[0]?.node?.slug,
    title: item?.title,
    date: item?.date && serverDateStringToLocalDate(item.date),
    link: `${LinkPath.news}${item?.slug}`,
    excerpt: item?.vsComposerExcerptRendered,
    reportLinks: item?.meetingReport?.reportLinks?.map((link) => link.link)
}));

interface NewsGridProps {
    showFilterBar?: boolean;
    search?: string;
}

export default function NewsGrid({
                                     showFilterBar = true,
                                     search = ''
                                 }: NewsGridProps) {
    const router = useRouter();

    const [state, setState] = useState({
        yearType: router.query.year ? router.query.year as string : 'All',
        categoryType: router.query.category ? router.query.category as string : 'All',
        meetingReportType: router.query.meetingReports ? router.query.meetingReports as string : 'All',
        page: router.query.page ? parseInt(router.query.page as string) : 1,
        total: 0,
        PAGE_TYPE:'Search'
    });

    const stanfordEWearTagID = [758, 760];
    const queryVariables = {
        postLocale: toUpperLocale(router),
        offset: (state.page - 1) * 9,
        categories: getCategories(state.categoryType, router),
        tagIn: state.meetingReportType === 'Stanford eWear' ? stanfordEWearTagID : null,
        tagNotIn: state.meetingReportType === 'General' ? stanfordEWearTagID : null,
        year: state.yearType === 'All' ? null : Number(state.yearType),
        search: search
    };
    const {data, loading} = useQuery(NewsGrid.query, {
        variables: queryVariables
    });


    const posts: PostCardProp[] = getPosts(data);

    useEffect(() => {
        if (!loading) {
            // setState({...state, total: data?.posts?.pageInfo?.offsetPagination?.total});
            setState((newState) => {
                return {
                    ...newState,
                    total: data?.posts?.pageInfo?.offsetPagination?.total ? data?.posts?.pageInfo?.offsetPagination?.total : 0
                }
            });
        }
    }, [loading, data]);

    return (
        <section className="">
            {showFilterBar && <FilterBar
							yearType={state.yearType}
							categoryType={state.categoryType}
							meetingReportType={state.meetingReportType}
							onChange={(filterProps) => {
                  setState((newState) => {
                      return {
                          ...newState,
                          ...filterProps,
                          page: 1
                      }
                  });
              }}/>}
            {loading ? <Loading/> :
                <>
                    <Grid rowCount={3}>
                        {posts?.map((item) => <PostCard key={item.id} post={item}/>)}
                    </Grid>
                </>}
            <div className="mt-16 flex justify-center">
                <PaginationNumber current={state.page}
                                  pageSize={9}
                                  state={state}
                                  total={state.total}
                                  onChange={(current) => {
                                      // setState({...state, page: current})
                                      // setState((newState) => {
                                      //     return {
                                      //         ...newState,
                                      //         page: current
                                      //     }
                                      // });
                                  }}/>
            </div>
        </section>

    );
}

NewsGrid.query = gql`
query getData(
  $postLocale: LanguageCodeFilterEnum!, 
  $offset: Int, 
  $categories: [String],
  $tagIn: [ID],
  $tagNotIn:[ID],
  $year: Int,
  $search: String
) {
  posts(
    where: {
      search: $search,
      language: $postLocale,
      offsetPagination: {size: 9, offset: $offset}, 
      orderby: [{field: DATE, order: DESC}], 
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
      tagIn: $tagIn, 
      tagNotIn: $tagNotIn
      dateQuery: {year: $year}
    }
  ) {
    pageInfo {
      offsetPagination {
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
      vsComposerExcerptRendered
      meetingReport {
        reportLinks {
          link
        }
      }
    }
  }
}
`;
