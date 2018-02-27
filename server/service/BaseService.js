const config = require('../../config/server/index');
const rp = require('request-promise');

class BaseService {
    constructor() {
        this.url = config.hostUrl
    }

    error() {
        const error = "数据请求失败"
        return error;
    }

    async getData(params) {
        let options = {
            method: 'GET',
            json: true,
        };
        options = Object.assign(options,params);

        try {
            const response = await rp(options);
            return response;

        } catch (error) {
            throw new Error(error);
        }
    }

    async postData(params) {
        let options = {
            method: 'POST',
            json: true
        };
        options = Object.assign(options,params);

        try {
            const response = await rp(options);
            return response;

        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = BaseService;