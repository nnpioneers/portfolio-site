const fs = require('fs');

const files = [
  'src/app/contact/page.tsx', 
  'src/app/registration/page.tsx', 
  'src/app/startup-hub/page.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('use client')) {
      content = '"use client";\n' + content;
      fs.writeFileSync(file, content);
    }
  }
}
console.log('Added use client to forms');
