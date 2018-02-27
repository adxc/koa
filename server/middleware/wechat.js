const config = require('../../config/server/index');
const OAuth = require('co-wechat-oauth');
const client = new OAuth(config.wechat.appId, config.wechat.appSecret);
const WechatCtrl = require('./../controller/WechatController')

module.exports = () => {
    return async(ctx, next) => {
        try {
            if (ctx.originalUrl.match('login')) {
                await next();
            } else {
                if (WechatCtrl.isWechatBrowser(ctx)) {
                    if (ctx.method !== 'POST' && !ctx.session.userInfo) {
                        if (!ctx.query.code) {
                            let url = client.getAuthorizeURL("http://" + ctx.hostname + ctx.originalUrl, '123', config.wechat.scope);
                            ctx.redirect(url)
                        } else {
                            const token = await client.getAccessToken(ctx.query.code);
                            const userInfo = await client.getUser(token.data.openid);
                            ctx.session.userInfo = userInfo;
                        }
                    }
                }
                await next();
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}