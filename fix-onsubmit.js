const fs = require('fs');

const files = ['src/app/contact/page.tsx', 'src/app/registration/page.tsx'];
for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/onsubmit="[^"]*"/g, 'onSubmit={(e) => e.preventDefault()}');
    fs.writeFileSync(file, content);
  }
}
console.log('Fixed onsubmit');
