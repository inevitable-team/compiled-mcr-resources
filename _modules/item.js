module.exports = (imgSrc, title, tags, role, url, desc) => `
<div class="item">
    <div class="itemImgContainer"><img src="${imgSrc}" alt="${title + " Profile Picture" }" loading="lazy"></div>
    <div class="itemContent">
        <h3>${title}</h3>
        <div class="itemTags">${[role ? "<p class='role'>" + role + "</p>" : "", ...tags.map(tag => "<p>" + tag + "</p>")].join("\n")}</div>
        <p class="itemShort"><a href="${ url }" target="_blank" rel="noopener noreferrer">${ url }</a></p>
        <p class="itemDesc">${desc}</p>
    </div>
</div>
`