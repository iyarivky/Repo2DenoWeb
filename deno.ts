function detectMIMEType(url) {
    const match = url.match(/\.([^.]+)$/);
    let typeData = ""
    if (match) {
        const extension = match[1];
        if (extension === 'html') {
            typeData = "text/html;charset=utf-8"
        } else if (extension === 'css') {
            typeData = "text/css"
        } else if (extension === 'js') {
            typeData = "text/javascript"
        } else if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extension)) {
            typeData = `image/${extension}`
        } else if (['mp4', 'webm'].includes(extension)) {
            typeData = `video/${extension}`
        } else {
            typeData = `Ekstensi tidak diketahui: ${extension}`;
        }
    } else {
        console.log('URL tidak memiliki ekstensi');
    }
    return typeData
}

async function fetchUrl(url) {
    const response = await fetch(url);
    return await response.blob();
  }

async function handleRequest(req: Request) {
    const url = new URL(req.url);
    const path = url.pathname;
    let githubURL = "https://raw.githubusercontent.com/iyarivky/iyariv-profile/main/" //input your raw github link here
    let githubDenoPath = githubURL + path
    if (path === '/' || path === '') {
        let indexURL = githubDenoPath + "index.html"
        let mimeType = detectMIMEType(indexURL)
        let fetchGithubUrl = await fetchUrl(indexURL)
        return new Response(fetchGithubUrl,{headers: {"content-type": `${mimeType}`}, status:200})
    } else {
        let mimeType = detectMIMEType(githubDenoPath)
        let fetchGithubUrl = await fetchUrl(githubDenoPath)
        return new Response(fetchGithubUrl,{headers: {"content-type": `${mimeType}`}, status:200})
    }
    return new Response("404 : Why are you here?");
}

Deno.serve(handleRequest);
