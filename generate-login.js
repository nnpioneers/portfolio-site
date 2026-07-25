const fs = require('fs');
const htmlPath = '../NNP web site/src/pages/auth/login.html';
const outPath = 'src/app/login/page.tsx';

if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const match = html.match(/<div id="app-content"[^>]*>([\s\S]*?)<\/body>/i);
    
    if (match) {
        let content = match[1];
        // Strip out trailing scripts
        content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
        content = content.replace(/<\/div>\s*$/i, ''); // remove the closing div of app-content that might be left
        
        content = content.replace(/class=/g, 'className=');
        content = content.replace(/<!--/g, '{/*');
        content = content.replace(/-->/g, '*/}');
        content = content.replace(/<(img|br|hr|input)([^>]*?)([^\/])>/g, '<$1$2$3 />');
        content = content.replace(/<i\s+data-lucide="([^"]+)"([^>]*)><\/i>/g, '<span className="icon-placeholder-$1"></span>');
        content = content.replace(/onsubmit="[^"]*"/gi, 'onSubmit={(e) => e.preventDefault()}');
        
        fs.writeFileSync(outPath, `"use client";\nimport React from 'react';\n\nexport default function LoginPage() {\n  return (\n    <div className="min-h-[80vh] flex items-center justify-center p-6">\n${content}\n    </div>\n  );\n}`);
        console.log('Successfully generated login/page.tsx');
    } else {
        console.log('app-content not found');
    }
}
