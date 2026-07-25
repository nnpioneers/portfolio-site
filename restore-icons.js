const fs = require('fs');
const path = require('path');

function toPascalCase(str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const original = content;
            
            const iconsUsed = new Set();
            
            // Replace <span className="icon-placeholder-xyz"></span>
            content = content.replace(/<span\s+className="icon-placeholder-([a-z0-9-]+)"\s*><\/span>/g, (match, iconName) => {
                const pascalIcon = toPascalCase(iconName);
                iconsUsed.add(pascalIcon);
                // In most places, it was an icon inside a flex container or a button
                return `<${pascalIcon} className="w-6 h-6 inline-block" />`;
            });

            if (iconsUsed.size > 0) {
                // Generate import statement
                const importStmt = `import { ${Array.from(iconsUsed).join(', ')} } from 'lucide-react';\n`;
                
                // Add import if not exists
                // We'll just prepend it after the first import or at the top
                if (!content.includes('from \'lucide-react\'') && !content.includes('from "lucide-react"')) {
                    content = importStmt + content;
                } else {
                    // It already has a lucide-react import. We might need to merge, 
                    // but for simplicity, we can just add another import line.
                    // (It's valid in ES6 to have multiple import statements from same module)
                    content = importStmt + content;
                }
                
                fs.writeFileSync(fullPath, content);
                console.log('Restored icons in', fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src', 'app'));
console.log('Done restoring icons!');
