const fs = require('fs-extra'),
    shell = require('shelljs'),
    beautify = require('beautify'),
    minify = require('minify'),
    pageURL = './_pages',
    pages = fs.readdirSync(pageURL).map(page => require(`${pageURL}/${page}`)).sort((a,b) => a.order - b.order),
    pageLayout = require('./_layouts/page.js'),
    homeItemModule = require('./_modules/homeItem'),
    itemModule = require('./_modules/item'),
    headModule = require('./_modules/head');

let globals = require('./_config.js'),
    domain = 'compiledmcr.com',
    site = `https://${domain}`,
    sitemap = [];

// Moving static files to site
shell.mkdir('-p', './_site');
fs.copySync('./_static', './_site');


// Creating Home Page
let index = pageLayout(
    headModule(globals.metaTitlePrefix + globals.title, globals.desc, globals.metaTags),
    globals.img,
    globals.title,
    globals.desc,
    globals.social,
    globals.itemNames,
    pages.map(page => {
        return homeItemModule(
            `${page.name} (${page.items.length})` ,
            page.desc,
            page.slug,
            page.background
        )
    }).join("\n"),
    globals.background
);

sitemap.push({ url: `${site}/${globals.slug}.html`, priority: '1.0' });
fs.writeFileSync(`./_site/${globals.slug}.html`, index, () => {});

// Creating Other Pages

pages.forEach(page => {
    let pageHTML = pageLayout(
        headModule(globals.metaTitlePrefix + page.name, page.desc, globals.metaTags),
        "",
        page.name,
        page.desc,
        [],
        page.itemNames,
        page.items.map(item => {
            return itemModule(
                item.img,
                item.name,
                item.tags ? item.tags : [],
                item.title,
                item.url,
                item.desc
            )
        }).join("\n"),
        page.background
    );  
    sitemap.push({ url: `${site}/${page.slug}.html`, priority: '0.8' });
    fs.writeFileSync(`./_site/${page.slug}.html`, pageHTML, () => {});
});

// Extra SEO

fs.writeFileSync('./_site/CNAME', domain, () => { });
fs.writeFileSync(`./_site/sitemap.xml`, beautify(rtnSiteMap(sitemap), { format: 'xml' }), () => { });
minifyFile('./_site/style.css');

// Extra Functions

function minifyFile(fileLocation) {
    minify(fileLocation).then(minified => fs.writeFileSync(fileLocation, minified, () => {}));
}

function rtnSiteMap(array) {
    return `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${ array.reduce((pre, curr) => pre += '<url><loc>' + curr.url + '</loc><priority>' + curr.priority + '</priority></url>', "")}
                </urlset>`;
}