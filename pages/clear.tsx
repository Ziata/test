import Main from "../components/layout/Main";
import React, {useEffect, useRef, useState} from "react";
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import DefaultBackground from "../components/ui/DefaultBackground";
import Body from "../components/layout/Body";
import axios from "axios";
import {Button, Input, Select, Space, message} from 'antd';


function flattenArray(arr) {
    if (!arr.length) return
    return arr.reduce((acc, cur) => {
        if (cur.children && Array.isArray(cur.children)) {
            return acc.concat(flattenArray(cur.children));
        } else {
            return acc.concat(cur);
        }
    }, []);
}

const uniqueArray = (arrArg) => {
    return arrArg.reduce((acc, current) => {
        if (!acc.lookup[current.link]) {
            acc.lookup[current.link] = true;
            acc.result.push(current);
        }
        return acc;
    }, {lookup: {}, result: []}).result;
}


export default function Clear(props) {

    const [messageApi, contextHolder] = message.useMessage();

    const [selectedItems, setSelectedItems] = useState([]);
    const [options, setOptions] = useState([]);
    const [btnLoading, setBtnLoading] = useState(false);

    const secret = useRef(null)
    const path = useRef(null)
    // const filteredOptions = options.filter((o) => !selectedItems.includes(o.value));

    const {data, loading} = useQuery(Clear.query);


    useEffect(() => {
        if (loading) return

        let enMenus = flattenArray([...data?.navmenu?.enMenu?.navMenus?.navmenus, ...data?.footerNavmenu?.enMenu?.footerNavMenus?.footermenus])
        let zhMenus = flattenArray([...data?.navmenu?.zhMenu?.navMenus?.navmenus, ...data?.footerNavmenu?.zhMenu?.footerNavMenus?.footermenus]).map(item => {
            return {
                ...item,
                link: '/zh' + item.link
            }
        })
        setOptions(uniqueArray([{title: 'home page', link: '/'}, ...enMenus, {
            title: '首页',
            link: '/zh'
        }, ...zhMenus]).map(item => {
            return {
                ...item,
                value: item.link,
                label: item.title,
            }
        }))
    }, [loading])


    const handelClear = () => {

        let secretValue = secret.current.input.value
        let pathValue = path.current.input.value
        let selectedItemsValue = selectedItems

        if (!secretValue) {
            messageApi.open({
                type: 'error',
                content: 'input secret text',
            });
            return;
        }

        if (!pathValue && !selectedItemsValue) {
            messageApi.open({
                type: 'error',
                content: 'Please enter or select the page path',
            });
            return;
        }
        setBtnLoading(true)

        if (!pathValue && selectedItemsValue) {
            pathValue = selectedItemsValue
        }


        axios.get(`/api/revalidate?secret=${secretValue}&path=${encodeURIComponent(pathValue)}`)
            .then(res => {
                if (res.data.revalidated) {
                    messageApi.open({
                        type: 'success',
                        content: 'Clear cache successfully',
                    });
                }
            })
            .catch((err) => {
                messageApi.open({
                    type: 'error',
                    content: err.response.data.message,
                });
            })
            .finally(() => {
                setBtnLoading(false)
            })
    }


    return (
        <>
            {contextHolder}

            <DefaultBackground>
                <Body className='h-screen'>
                    <Main>
                        <section className="mt-0 page-content">
                            <header className="text-tcci-blue">
                                <h1 className="mb-8">
                                    <span className="text-3xl">Clear Cache</span>
                                </h1>
                            </header>


                            <div className="text-neutral-500 my-8 ">
                                <div className="article_content__5RXjl">

                                    <Space.Compact>
                                        <Input
                                            addonBefore="secret:"
                                            placeholder="input secret text"
                                            allowClear
                                            ref={secret}
                                        />
                                    </Space.Compact>
                                    <br/>
                                    <Space.Compact>
                                        <Input
                                            addonBefore="path:"
                                            placeholder="input page path"
                                            allowClear
                                            ref={path}
                                        />
                                    </Space.Compact>

                                    <Select
                                        // mode="multiple"
                                        allowClear
                                        placeholder="please select page"
                                        value={selectedItems}
                                        onChange={setSelectedItems}
                                        style={{width: '100%'}}
                                        options={options}
                                    />

                                    <p>优先使用path，如果path为空，则使用select的值</p>

                                </div>
                                <div className='mt-10 text-right'>
                                    <Button loading={btnLoading} onClick={handelClear} type="primary" danger
                                            size='large'>Clear</Button>
                                </div>
                            </div>

                        </section>


                    </Main>
                </Body>
            </DefaultBackground>
        </>
    )
}

Clear.query = gql`
query GetPageData{
  navmenu(id: "11891", idType: DATABASE_ID) {
    enMenu:translation(language: EN) {
      navMenus {
        navmenus {
          link
          parent
          title
          open
          children {
            link
            title
            open
            children {
              link
              title
              open
            }
          }
        }
      }
    }
    zhMenu:translation(language: ZH) {
      navMenus {
        navmenus {
          link
          parent
          title
          open
          children {
            link
            title
            open
            children {
              link
              title
              open
            }
          }
        }
      }
    }
  }
 footerNavmenu:navmenu(id: "11906", idType: DATABASE_ID) {
    enMenu: translation(language: EN) {
      footerNavMenus {
        footermenus {
          link
          title
        }
      }
    }
    zhMenu: translation(language: ZH) {
      footerNavMenus {
        footermenus {
          link
          title
        }
      }
    }
  }
}
`;



