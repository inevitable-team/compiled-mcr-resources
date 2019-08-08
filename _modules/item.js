module.exports = (imgSrc, title, role, url, desc) => `
<div class="item">
    <div class="itemImgContainer"><img src="${imgSrc}" alt="${title + " Profile Picture" }" loading="lazy"></div>
    <div class="itemContent">
        <h3>${title}</h3>
        <p class="itemShort">${ role ? (role + " | ") : "" }<a href="${ url }" target="_blank" rel="noopener noreferrer">${ url }</a></p>
        <p class="itemDesc">${desc}</p>
    </div>
</div>
`