const log4js = require('log4js')
const path = require('path')
const fs = require('fs')
const basePath = path.resolve('./Logs')

const errorPath = basePath + '/errors/'
const resPath = basePath + '/responses/'

const errorFilename = errorPath + '/error'
const resFilename = resPath + '/response'

/**
 * 确定目录是否存在，如果不存在则创建目录
 */
const confirmPath = function(pathStr) {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr);
        console.log('createPath: ' + pathStr);
    }
}

log4js.configure({
    appenders: {
        console: {
            type: 'console',
            layout: { type: 'coloured' }
        },
        res: {
            category: 'responseLog',
            type: 'dateFile',
            filename: resFilename,
            layout: { type: 'coloured' },
            alwaysIncludePattern: true,
            pattern: "-yyyy-MM-dd-hh.log"
        },
        err: {
            category: 'errorLog',
            type: 'dateFile',
            filename: errorFilename,
            layout: { type: 'coloured' },
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd-hh.log'
        },

    },
    categories: {
        default: {
            appenders: ['console'],
            level: 'all'
        },
        responseLog: {
            appenders: ['res'],
            level: 'info'
        },
        errorLog: {
            appenders: ['err', 'console'],
            level: 'error'
        }
    },
    pm2: true
})

//创建log的根目录'logs'
//根据不同的logType创建不同的文件目录
if (basePath) {
    confirmPath(basePath)
    confirmPath(errorPath)
    confirmPath(resPath)
}

module.exports = log4js