const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix style="transition-delay: 100ms" to style={{ transitionDelay: '100ms' }}
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

// Also fix some generic unclosed tags if missed
content = content.replace(/<(img|br|hr|input)([^>]*?)([^\/])>/g, '<$1$2$3 />');

// Remove data-lucide attributes as they are used by old feather/lucide script and we are using React icons now
content = content.replace(/<i\s+data-lucide="([^"]+)"([^>]*)><\/i>/g, '<span className="icon-placeholder-$1"></span>');

fs.writeFileSync('src/app/page.tsx', content);
console.log('Fixed page.tsx');
