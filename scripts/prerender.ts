import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, '..', p);

async function prerender() {
  const templatePath = toAbsolute('dist/client/index.html');
  
  if (!fs.existsSync(templatePath)) {
    console.error('Template not found at:', templatePath);
    console.log('Did you run the client build first?');
    process.exit(1);
  }
  
  const template = fs.readFileSync(templatePath, 'utf-8');

  try {
    // Import the server bundle built by Vite
    // Note: the file name might be index.js or entry-server.js depending on Vite's output
    // We explicitly build it to dist/server/entry-server.js
    const { pathToFileURL } = await import('url');
    const serverEntryPath = pathToFileURL(toAbsolute('dist/server/entry-server.js')).href;
    const renderModule = await import(serverEntryPath);
    const { html, head } = renderModule.render();

    // Inject rendered HTML and Head tags
    const htmlWithContent = template
      .replace(`<!--ssr-outlet-->`, html)
      .replace(`<!--ssr-head-->`, head);

    // Save final HTML
    fs.writeFileSync(toAbsolute('dist/client/index.html'), htmlWithContent);
    console.log('Prerendering completed successfully.');
  } catch (err) {
    console.error('Error during prerendering:', err);
    process.exit(1);
  }
}

prerender();
