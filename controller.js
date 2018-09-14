const fs = require('fs');

function addMapping(router, mapping) {
    console.log(mapping,"mapping");
    for (let url in mapping) {
        if(url.startsWith('GET')) {
            let path = url.substring(4);

            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if(url.startsWith('POST')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if(url.startsWith('DELETE')){
            let path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DEL ${path}`);
        }else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    let files = fs.readdirSync(__dirname + dir);

    let js_file = files.filter((f) => {
        return f.endsWith('.js');
    });
    for(let f of js_file) {
        let mapping = require(__dirname + dir + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || '/controllers/', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};