module.exports = (title, desc, slug, bg) => `
<a href="${slug}.html">
    <div class="homeItem" ${bg ? "class='background: " + bg + "'" : ""}>
        <h3>${title}</h3>
        <p>${desc}</p>
    </div>
</a>
`