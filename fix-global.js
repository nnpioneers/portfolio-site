const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk('src/app', function(filePath) {
    if (filePath.endsWith('page.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/onsubmit="[^"]*"/gi, 'onSubmit={(e) => e.preventDefault()}');
        
        // Let's also check for tabindex
        content = content.replace(/tabindex=/gi, 'tabIndex=');
        
        // Let's also check for autocomplete
        content = content.replace(/autocomplete=/gi, 'autoComplete=');

        fs.writeFileSync(filePath, content);
    }
});
console.log('Fixed onsubmit globally');
