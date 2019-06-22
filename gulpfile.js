let gulp     = require('gulp');
let cmd      = require('node-cmd');
let fs       = require("fs");
var minimist = require('minimist');

const run = function(txt) {
    return new Promise(function(resolve, reject) {
        try {
            cmd.run(txt);
            resolve();
        } catch(err) {
            reject(err);
        }
        
    })
}
const get = function(txt) {
    return new Promise(function(resolve, reject) {
        try {
            cmd.get(txt, function(err, data, stderr) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        } catch(err) {
            reject(err);
        }
        
    })
}

var options = minimist(process.argv.slice(2));

//执行CLI打包api接口文件
//默认配置：http://api.taishengsys.gejinet.com/swagger/v1/swagger.json
gulp.task('api', async function(cb) {
    try {
        if (options.src) {
            if(options.src.toLowerCase().indexOf('http')) {
                console.log(`src参数有误。`);
                cb();
                return;
            }
            //修改配置信息
            let json = JSON.parse(await get(`type ${__dirname}\\cli\\appsettings.json`));
            json.swaggerUrl = options.src;
            await get(`echo ${JSON.stringify(json)} > ${__dirname}\\cli\\appsettings.json`);
        }
        await run(`del ${__dirname}\\cli\\source\\*.* /q`);
        await run(`dotnet ${__dirname}\\cli\\tools.dll`);
        var timer = async () => {
            let files = (await get(`dir ${__dirname}\\cli\\source\\ /b`)).split('\r\n').slice(0, -1);
            if(files.length) {
                console.log(files);
                run(`copy ${__dirname}\\cli\\source\\*.ts ${__dirname}\\src\\api`);
                console.log(`执行完成，已获取最新API。`);
                cb();
            } else {
                setTimeout(timer, 200);
            }
        };
        timer();
    } catch(err) {
        console.error(`执行失败，错误原因`, err);
    }
});