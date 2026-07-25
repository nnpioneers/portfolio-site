const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace standard links
content = content.replace(/href="registration\.html"/g, 'href="/registration"');
content = content.replace(/href="ai\.html"/g, 'href="/business-partner"');
content = content.replace(/href="startup-hub\.html"/g, 'href="/startup-hub"');
content = content.replace(/href="internship\.html"/g, 'href="/careers"'); // Or internship if it exists
content = content.replace(/href="careers\.html"/g, 'href="/careers"');
content = content.replace(/href="start-project\.html"/g, 'href="/contact"');

fs.writeFileSync('src/app/page.tsx', content);
console.log('Fixed page.tsx links');
