const fs = require('fs');
const path = require('path');

function generatePage(htmlPath, outPath, componentName) {
    if (!fs.existsSync(htmlPath)) {
        console.error('File not found: ' + htmlPath);
        return;
    }
    const html = fs.readFileSync(htmlPath, 'utf8');
    const match = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if(!match) {
        console.error('Main tag not found in ' + htmlPath);
        return;
    }
    
    let content = match[1];
    content = content.replace(/class=/g, 'className=');
    content = content.replace(/<!--/g, '{/*');
    content = content.replace(/-->/g, '*/}');
    
    // Fix styles
    content = content.replace(/style="([^"]*)"/g, (match, styleString) => {
        const parts = styleString.split(';');
        const styleObj = {};
        parts.forEach(p => {
            if(!p.trim()) return;
            const [key, val] = p.split(':');
            if(!key || !val) return;
            const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            styleObj[camelKey] = val.trim();
        });
        return 'style={{ ' + Object.entries(styleObj).map(([k,v]) => k + ': "' + v + '"').join(', ') + ' }}';
    });
    
    // Fix void elements
    content = content.replace(/<(img|br|hr|input)([^>]*?)([^\/])>/g, '<$1$2$3 />');
    
    // Replace old Lucide tags with placeholders or actual icons
    content = content.replace(/<i\s+data-lucide="([^"]+)"([^>]*)><\/i>/g, '<span className="icon-placeholder-$1"></span>');
    
    // Replace SVG `clip-rule` and `fill-rule` and `stroke-width` etc.
    content = content.replace(/([a-z]+)-([a-z]+)=/g, (match, p1, p2) => {
        // Only replace valid SVG attributes
        const valid = ['clip-rule', 'fill-rule', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'view-box', 'stroke-miterlimit', 'fill-opacity'];
        if(valid.includes(`${p1}-${p2}`)) {
            if(`${p1}-${p2}` === 'view-box') return 'viewBox=';
            return p1 + p2[0].toUpperCase() + p2.slice(1) + '=';
        }
        return match; // return as is like data-x
    });
    
    // Some SVGs use viewBox (which might have been caught by the regex but let's make sure)
    content = content.replace(/viewbox=/gi, 'viewBox=');

    const outDir = path.dirname(outPath);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(outPath, `import React from 'react';\n\nexport default function ${componentName}() {\n  return (\n    <>\n${content}\n    </>\n  );\n}`);
    console.log('Successfully generated ' + outPath);
}

generatePage('../NNP web site/src/pages/about.html', 'src/app/about/page.tsx', 'AboutPage');
generatePage('../NNP web site/src/pages/services.html', 'src/app/services/page.tsx', 'ServicesPage');
generatePage('../NNP web site/src/pages/portfolio.html', 'src/app/portfolio/page.tsx', 'PortfolioPage');
generatePage('../NNP web site/src/pages/startup-hub.html', 'src/app/startup-hub/page.tsx', 'StartupHubPage');
generatePage('../NNP web site/src/pages/registration.html', 'src/app/registration/page.tsx', 'RegistrationPage');
generatePage('../NNP web site/src/pages/contact.html', 'src/app/contact/page.tsx', 'ContactPage');
generatePage('../NNP web site/src/pages/auth/login.html', 'src/app/login/page.tsx', 'LoginPage');
