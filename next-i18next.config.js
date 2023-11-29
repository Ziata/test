module.exports = {
    i18n: {
        //When localeDetection is set to false Next.js will no longer automatically redirect based on the user's preferred locale and will only provide locale information detected from either the locale based domain or locale path as described above.
        // https://www.nextjs.cn/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
        // 利用cookie切换语言
        // 禁用自动区域设置检测
        // localeDetection: false,
        locales: ['en', 'zh'],
        defaultLocale: 'en'
    }
};
