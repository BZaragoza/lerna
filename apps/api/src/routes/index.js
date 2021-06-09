import glob from 'glob';

export default function (router, pool) {
    glob("src/routes/*.js", function async (err, files) {
        
        files.forEach(async fileName => {
            fileName = fileName.split('/')[2]
            
            if (fileName == 'index.js') return;

            const { default: route } = await import(`./${fileName}`);
            route(router, pool);

        });

    })
}