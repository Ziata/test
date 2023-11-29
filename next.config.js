const {withFaust, getWpHostname} = require('@faustwp/core');
const {i18n} = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: false
})

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withBundleAnalyzer(withFaust({
	i18n,
	images: {
		domains: [getWpHostname()],
		formats: ['image/webp'],
	},
	async redirects() {
		return [
			{
				// 匹配中文会议
				source: '/cn/events/:path*',
				destination: '/zh/meetings/:path*',
				permanent: false
			},
			{
				// 匹配中文新闻
				source: '/cn/news/:path*',
				destination: '/zh/news/:path*',
				permanent: false
			},
		]
	},
	async rewrites() {
		return [
			{
				source: '/meetings',
				destination: '/supporting-scientific-meetings-and-conferences',
			},
			{
				source: '/zh/会议',
				destination: '/zh/supporting-scientific-meetings-and-conferences',
			},
			{
				source: '/zh/%E4%BC%9A%E8%AE%AE',
				destination: '/zh/supporting-scientific-meetings-and-conferences',
				locale: false
			},
			
			{
				source: '/chen-fellowship',
				destination: '/physician-scientists',
			},
			{
				source: '/zh/chen-fellowship',
				destination: '/zh/physician-scientists',
				locale: false,
			},
			{
				source: '/fellowship',
				destination: '/physician-scientists',
			},
			{
				source: '/zh/%E5%A4%A9%E6%A1%A5%E8%84%91%E7%A7%91%E5%AD%A6%E7%A0%94%E7%A9%B6%E9%99%A2%E4%B8%B4%E5%BA%8A%E7%A7%91%E5%AD%A6%E5%AE%B6%E8%B5%84%E5%8A%A9%E8%AE%A1%E5%88%92',
				destination: '/zh/physician-scientists',
				locale: false,
			},
			
			
			{
				source: '/chen-scholars',
				destination: '/physician-scientists',
			},
			{
				source: '/zh/陈氏学者',
				destination: '/zh/physician-scientists',
				locale: false,
			},
			{
				source: '/zh/%E9%99%88%E6%B0%8F%E5%AD%A6%E8%80%85',
				destination: '/zh/physician-scientists',
				locale: false,
			},
			
			{
				source: '/zh/奖学金',
				destination: '/zh/physician-scientists',
				locale: false,
			},
			{
				source: '/zh/%E5%A5%96%E5%AD%A6%E9%87%91',
				destination: '/zh/physician-scientists',
				locale: false,
			},
			{
				source: '/training',
				destination: '/chen-science-writer-fellowship',
			},
			{
				source: '/zh/training',
				destination: '/zh/chen-science-writer-fellowship',
			},
		]
	},
	// 注意：Next.js 的默认静态生成超时为 60 秒。
	// 如果在超时时间内没有新的页面生成完成，它会再尝试生成三次。
	// 如果第四次尝试失败，构建将失败。
	// 可以使用以下配置修改此超时
	staticPageGenerationTimeout: 300,
}));
