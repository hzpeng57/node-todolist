

const fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

const fn_test = async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.response.body = {
        data: [1,2,3,4,5]
    }
};

module.exports = {
    'GET /hello/:name': fn_hello,
    'GET /test': fn_test
};