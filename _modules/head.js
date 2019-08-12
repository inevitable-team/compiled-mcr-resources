module.exports = (title, metaDesc, metaTags) => `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="${metaDesc.replace(/(<([^>]+)>)/ig, "").slice(0, 152)}...">
    <meta name="keywords" content="${metaTags.join(",")}">
    <title>${title}</title>
    <link href="style.css" rel="stylesheet"/>
    <link rel="shortcut icon" href="favicon.ico">
</head>
`