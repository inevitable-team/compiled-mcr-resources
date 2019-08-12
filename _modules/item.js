module.exports = (imgSrc, title, tags, skills, role, urls, desc) => `
<div class="item">
    <div class="itemImgContainer"><img src="${imgSrc}" alt="${title + " Profile Picture" }" loading="lazy"></div>
    <div class="itemContent">
        <h3>${title}</h3>
        ${urls}
        <div class="itemTags">${[role ? "<p class='role'>" + role + "</p>" : "", ...tags.map(tag => "<p class='tag'>" + tag + "</p>"), ...skills.map(skill => "<p class='skill'>" + skill + "</p>")].join("\n")}</div>
        <p class="itemDesc">${desc}</p>
    </div>
</div>
`