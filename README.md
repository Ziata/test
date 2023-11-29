# TCCI官网

 
## Setup

See the [setup steps](https://github.com/wpengine/faustjs#quick-start).

## Run

```bash
npm install
npm run dev
```

[http://localhost:3000]()

# 更新纪要
- 2023年11月17日 新增页面 字段增加 url更改 重定向
  - 新增supporting-scientists-caltech-page页面
  - 新增supporting-scientists-shanghai-page页面
  - 增加`/chen-scholars`和`/zh/陈氏学者`路径对应映射`physician-scientist-page.tsx`
---
- 2023年10月12日 导航支持新窗口打开 Custom Fields增加open字段 控制,增加AI Scholars列表展示
---
- 2023年8月25日 记录url更改,后台已发布文章需要修改url链接,修改next.config.js文件,增加redirects配置进行映射
---
  - 如果再次修改url会导致wp-graphql通过自定义固定链接,找不到帖子
---
- 2023.5.15 版本升级，全部页面改成服务端渲染，提高seo效果，提高网站性能，提高用户体验
----
- 相关faustwp包升至当前最新版本，next更新至12.3.4版本
- 增加谷歌统计功能
- 增加自定义文章Career，用于招聘信息展示
- 增加`pages/clear.tsx`页面，用于清除缓存，默认缓存设置120秒。[点击查看NextJs官网详细介绍Incremental Static Regeneration
  ](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration)
- 为什么没有使用`getServerSideProps`函数？
  - 因为`getServerSideProps`函数每次都会请求数据，会导致服务器压力过大，所以使用`getStaticProps`函数，每隔120秒更新一次数据，保证数据的实时性
  - 其次当前`@faustwp/core`版本有bug，使用`getServerSideProps`函数会导致页面跳转404。[点击查看相关issue](https://github.com/wpengine/faustjs/issues/1423)

# 注意事项
- 对于@faustwp/cli@0.2.2和@faustwp/core@0.2.4的两个包,不要轻易升级,如果后续必须要升级,升级后,网站功能要全部回测一遍!!!
- 目前已知问题@faustwp/core@0.2.6版本,会影响子组件更新渲染 (2023.3月)
- <font color=red>任何修改Permalink的插件不可以使用！查看官网了解一下faust框架获取数据机制</font>（如果后续wpgraphql插件更新支持了该功能可以尝试使用）
- <font color=red> WP Mail SMTP 密码，需要每三个月联系施凌更新一次密码</font>
- 注意`utils/LinkPath.ts`和`.env.local`文件中的相关配置
- <font color=red>2023年6月22日 增加自定义文章后记得在wp-templates/index.tsx增加对应的模板</font>




### windows电脑启动项目报错

相关issuse https://github.com/wpengine/faustjs/issues/1144

解决方案针对`@faustwp/cli 0.1.4`版本,修改node_modules里面源码

此问题再0.2.2版本已经修复！！！ 此处作为记录

```javascript
// node_modules/@faustwp/cli/dist/index.js
// 第83行代码
spawn('next', getCliArgs(), {stdio: 'inherit'});
// 修改为
spawn('next', getCliArgs(), {stdio: 'inherit', shell: true});
```

解决方案针对`@faustwp/cli 0.2.0`版本,修改node_modules里面源码

```javascript
// node_modules/@faustwp/cli/dist/index.js
// 第71行代码
process.exit((_a = spawnSync('next', getCliArgs(), {
	stdio: 'inherit', encoding: 'utf8'
})) === null || _a === void 0 ? void 0 : _a.status);
// 修改为
process.exit((_a = spawnSync('next', getCliArgs(), {
	stdio: 'inherit', encoding: 'utf8', shell: true
})) === null || _a === void 0 ? void 0 : _a.status);
```

### pm2启动项目命令

```shell
pm2 start npm --watch --name next -- start # 启动

pm2 stop all           # 停止所有进程

pm2 restart all        # 重启所有进程
```

### 前端运行环境

```shell
nodejs 16.16.0
pm2 
nginx
```

### 后端运行环境

```shell
php 7.4.33
WordPress 6.1.1
nginx
MySql 5.7.41
```

### WordPress备份还原,迁移上线

- 主要通过WordPress插件All in One进行备份,恢复,迁移

### test地址

前端地址
[https://chen.test.thenextstone.com/]()

WordPress后台地址
[https://chenadmin.test.thenextstone.com/wp-admin/]()
```shell
# 后台账号
admin
tcci@123456
```

### test环境部署

```shell
# 服务器地址 (联系相关运维同事,添加私钥)
10.241.132.192

# 执行命令
su - dev -c /data/tcci_build.sh

# 舍弃修改
git reset --hard

# 压缩tar 用于图片上传 用zip有中文乱码问题
tar cvf uploads.tar uploads

# 解压tar 用zip有中文乱码问题
tar -xvf uploads.tar /uploads

# 前端项目目录
/mnt/data/nodejs/TCCIWebSite

# WordPress目录
/data/wordpress


# WordPress后台MySQL
# The name of the database for WordPress  
define( 'DB_NAME', 'wordpress_test' );
# Database username 
define( 'DB_USER', 'root' );
# Database password  
define( 'DB_PASSWORD', '123456' );
# Database hostname 
define( 'DB_HOST', '10.241.132.185' );
```


### 生产环境部署
- 代码推送到Azure仓库prod分支，会自动部署到生产环境



### 修改此项目需要掌握了解的东西

- [faustjs](https://faustjs.org/) 前端框架
- [wordpress](https://cn.wordpress.org/support/) wordpress相关基础(php基础代码)
- [wp-graphql](https://www.wpgraphql.com/) wpgraphql插件用于获取数据
- MySQL数据库
- Nginx相关代理转发配置
- 以及WordPress后台，相关插件用途

### 如何同步数据到本地开发
- 本地电脑安装WordPress,并通过All-In-One插件恢复所有数据,保证数据同步
- 通过All插件备份时候,可以不选择备份媒体文件,这样会减少备份文件大小,提高备份速度
- 媒体文件可以打成tar压缩包下载，然后解压到本地WordPress的uploads目录下(注意: 有中文乱码问题,建议使用tar压缩包)
- 或者同步数据到test环境服务器，进行开发测试，省去本地搭建环境步骤。

### 前端项目相关说明

- 前端使用[https://faustjs.org/]()框架，结合WordPress实现，具体介绍，请查看官网介绍
- 数据获取主要通过WordPress后台WP GraphQL插件，以及周边插件实现，具体使用，请查看官网介绍

### WordPress相关问题

- 运行版本安装官网WordPress 6.1.1 (安装英文版，安装中文版会有部分Bug)
- WordPress主要使用All-in-One WP Migration插件恢复备份数据(有个扩展插件,开放上传文件大小,联系Nick获取)
- WordPress后台有相关设置代码主要集中于/wordpress/wp-content/themes/twentytwentytwo/functions.php文件内，部分设置相关代码在/wordpress/wp-config.php文件内。
- <font color="red">表单功能通过WPForms插件完成</font>，Nginx做相应接口转发，具体参考测试环境服务器Nginx配置
- <font color="red">记录片页面订阅功能接口通过Nginx转发实现</font>，Nginx做相应接口转发，具体参考测试环境服务器Nginx配置

### 相关信息
- 运维相关问题以及服务器相关问题，联系赵志阳
- WordPress后台插件相关，联系Nick Kuo

### 如何自定义新闻,会议,人员详情页链接记录

- 使用插件Custom Post Type
    - 1.修改`Rewrite`选择`ture`
    - 2.修改`Custom Rewrite Slug`添加你的自定义链接,如`events`
    - 3.修改 `With Front`选择`false`
- 修改详情页链接使用WordPress本身功能,`settings`->`Permalink`设置`Custom Structure`参数,例如`/news/%postname%/`
- 然后再修改前端项目`\utils\LinkPath.ts`文件，改一下path路径
- 增加自定义文章类型后，需要npm run generate重新生成possibleTypes.json文件

### 关于自定义固定链接相关问题记录 2023年3月7日
- 以下作为参考，结合faust框架使用，达不到预期效果，根本原因在于wp-graphql对URL的查询条件，如何查询，如何匹配到URL并返回页面数据

- https://github.com/wp-graphql/wp-graphql/discussions/2750 <font color="red">作者答复 (1.14版本可能修复) 时间2023年3月10日
  1.14版本没有支持Permalink Manager Lite插件</font>
- https://github.com/wpengine/faustjs/issues/1313 <font color="red">作者答复(使用插件等类似方法解决)</font>
- Permalink Manager Lite插件,修改自定义文章Permalink

---

- https://github.com/wp-graphql/wp-graphql/issues/2430 最接近的问题
- https://github.com/wp-graphql/wp-graphql/discussions/2714 类似问题
- https://www.cnblogs.com/huangcong/p/4249370.html 黄聪：wordpress自定义post_type，并且自定义固定链接
- WordPress中这个功能是【wordpress自定义post_type，并且自定义固定链接】
- 修改自定义固定链接,wp-graphql通过自定义固定链接,找不到帖子,wp-graphql问题.
- faustjs原理 https://faustjs.org/docs/faustwp/seed-query 就是通过url匹配WordPress后台链接,找到该页面或帖子,并返回内容
- CPT插件With Front选项
