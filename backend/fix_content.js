require('dotenv').config();
const db = require('./config/db');

async function fixContent() {
  try {
    const { rows } = await db.query("SELECT id, content FROM blogs WHERE slug = 'ai-driven-solutions-for-business'");
    if (rows.length === 0) return console.log('Blog not found');
    let content = rows[0].content;

    // Fix hard line breaks. 
    // We replace single newlines with spaces, unless they are followed by a bullet point (•) or a number (1., 2.)
    // or unless it's a short line (like a heading).
    const lines = content.split(/\r?\n/);
    let newContent = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '') {
        newContent += '\n\n';
        continue;
      }
      
      // If it's a bullet point, keep it on its own line
      if (line.startsWith('•') || /^\d+\./.test(line)) {
        newContent += '\n' + line;
        continue;
      }

      // If the next line is a bullet, we should end this line.
      const nextLine = (lines[i+1] || '').trim();
      const isHeading = line.split(' ').length <= 5 && !line.endsWith('.');
      
      if (isHeading || nextLine.startsWith('•') || nextLine.startsWith('1.') || line.endsWith('.')) {
        newContent += '\n\n' + line;
      } else {
        newContent += ' ' + line;
      }
    }

    // Clean up extra newlines and spaces
    newContent = newContent.replace(/\n{3,}/g, '\n\n').trim();

    // Since we now have ReactQuill, let's just convert paragraphs to <p> and headings to <h3>, bullets to <li> etc.
    // Wait, simple text is fine if we keep whitespace-pre-wrap, or we can wrap in HTML.
    // Let's just wrap it in basic HTML since they have a rich text editor now!
    let htmlContent = '';
    const paragraphs = newContent.split('\n\n');
    for (const p of paragraphs) {
      if (!p.trim()) continue;
      if (p.includes('\n•')) {
        const parts = p.split('\n');
        htmlContent += `<p><strong>${parts[0].trim()}</strong></p><ul>`;
        for (let j = 1; j < parts.length; j++) {
          htmlContent += `<li>${parts[j].replace('•', '').trim()}</li>`;
        }
        htmlContent += `</ul>`;
      } else if (p.split(' ').length <= 6 && !p.endsWith('.')) {
        htmlContent += `<h3><strong>${p}</strong></h3>`;
      } else {
        htmlContent += `<p>${p.replace(/\n/g, '<br/>')}</p>`;
      }
    }

    await db.query("UPDATE blogs SET content = $1 WHERE id = $2", [htmlContent, rows[0].id]);
    console.log('Content updated successfully with HTML!');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

fixContent();
