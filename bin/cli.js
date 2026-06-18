#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import express from 'express';
import { exec } from 'child_process';
import { generateReactIcon } from '../templates/react-icon.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const cwd = process.cwd();

const CONFIG_FILE = path.join(cwd, 'icon-vista.json');

const args = process.argv.slice(2);

if (args[0] === 'init') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Where would you like to save your icons? (default: ./src/components/icons) ', (answer) => {
    const savePath = answer.trim() || './src/components/icons';
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ savePath }, null, 2));
    console.log(`\n✅ Configuration saved to icon-vista.json`);
    console.log(`Icons will be saved to: ${savePath}\n`);
    rl.close();
  });
} else {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error('❌ Configuration not found. Please run `npx icon-vista init` first.');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  const savePath = path.resolve(cwd, config.savePath);

  const app = express();
  app.use(express.json());
  
  // Serve public folder
  app.use(express.static(path.join(projectRoot, 'public')));

  app.post('/api/download', async (req, res) => {
    try {
      const { icon_id } = req.body;
      if (!icon_id) {
        return res.status(400).json({ error: 'icon_id is required' });
      }

      // icon_id is typically prefix:name
      const [prefix, name] = icon_id.split(':');
      
      const response = await fetch(`https://api.iconify.design/${prefix}/${name}.svg`);
      if (!response.ok) {
        throw new Error(`Failed to fetch icon: ${response.statusText}`);
      }

      const svgContent = await response.text();
      
      // Clean icon name 
      // e.g., shopping-cart -> ShoppingCartIcon
      const baseName = name.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
                          .replace(/^([a-z])/, (m, chr) => chr.toUpperCase());
      const iconName = `${baseName}Icon`;
      const fileName = `${iconName}.tsx`;

      const componentCode = generateReactIcon(iconName, svgContent);

      if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath, { recursive: true });
      }

      const filePath = path.join(savePath, fileName);
      fs.writeFileSync(filePath, componentCode, 'utf-8');

      res.json({ success: true, message: `Saved ${fileName}`, fileName, filePath });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  function startServer(port) {
    const server = app.listen(port, () => {
      console.log(`\n🚀 icon-vista is running at http://localhost:${port}`);
      console.log(`Saving icons to: ${config.savePath}\n`);
      
      const url = `http://localhost:${port}`;
      const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
      exec(`${startCmd} ${url}`).on('error', () => {
         console.log(`Failed to open browser automatically. Please visit ${url}`);
      });
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    });
  }

  startServer(3000);
}