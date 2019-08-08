const fs = require('fs-extra'),
    shell = require('shelljs'),
    pageURL = './_pages',
    pages = fs.readdirSync(pageURL).map(page => require(`${pageURL}/${page}`)).sort((a,b) => a.order - b.order),
    pageLayout = require('./_layouts/page.js'),
    homeItemModule = require('./_modules/homeItem'),
    itemModule = require('./_modules/item'),
    headModule = require('./_modules/head');

let globals = require('./_config.js');

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
                item.title,
                item.url,
                item.desc
            )
        }).join("\n"),
        page.background
    );  fs.writeFileSync(`./_site/${page.slug}.html`, pageHTML, () => {});
});
