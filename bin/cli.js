#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import express from 'express';
import { exec } from 'child_process';
import { generateReactIcon } from '../templates/react-icon.js';
import { getProvider } from './providers.js';

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
    rl.question('Which icon provider do you want to use? [iconify | untitled-ui] (default: iconify) ', (answer2) => {
      const provider = answer2.trim() || 'iconify';
      fs.writeFileSync(CONFIG_FILE, JSON.stringify({ savePath, provider }, null, 2));
      console.log(`\n✅ Configuration saved to icon-vista.json`);
      console.log(`Icons will be saved to: ${savePath}`);
      console.log(`Using provider: ${provider}\n`);
      rl.close();
    });
  });
} else {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error('❌ Configuration not found. Please run `npx icon-vista init` first.');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  const savePath = path.resolve(cwd, config.savePath);
  const providerName = config.provider || 'iconify';

  let activeProvider;
  try {
    activeProvider = await getProvider(providerName);
  } catch (err) {
    process.exit(1);
  }

  const app = express();
  app.use(express.json());
  
  // Serve public folder
  app.use(express.static(path.join(projectRoot, 'public')));

  async function fetchAndGenerateCode(icon_id, customizations) {
    if (!icon_id) throw new Error('icon_id is required');

    const [prefix, name] = icon_id.split(':');
    
    const svgContent = await activeProvider.getSvg(icon_id);
    if (!svgContent) {
      throw new Error(`Failed to fetch icon: ${icon_id} not found.`);
    }

    const baseName = name.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
                        .replace(/^([a-z])/, (m, chr) => chr.toUpperCase());
    const iconName = `${baseName}Icon`;
    const ext = customizations.language === 'js' ? 'jsx' : 'tsx';
    const fileName = `${iconName}.${ext}`;

    const componentCode = generateReactIcon(iconName, svgContent, customizations || {});

    return { componentCode, fileName };
  }

  app.post('/api/download', async (req, res) => {
    try {
      const { icon_id, customizations } = req.body;
      const { componentCode, fileName } = await fetchAndGenerateCode(icon_id, customizations);

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

  app.post('/api/generate-snippet', async (req, res) => {
    try {
      const { icon_id, customizations } = req.body;
      const { componentCode } = await fetchAndGenerateCode(icon_id, customizations);

      res.json({ success: true, code: componentCode });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/search', async (req, res) => {
    try {
      const q = req.query.query || '';
      const limit = parseInt(req.query.limit) || 100;
      const icons = await activeProvider.search(q, limit);
      res.json({ icons });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/svg', async (req, res) => {
    try {
      const id = req.query.id;
      let svg = await activeProvider.getSvg(id);
      if (!svg) return res.status(404).send('Not found');
      
      if (req.query.color) {
        svg = svg.replace(/currentColor/gi, req.query.color);
      }
      
      res.setHeader('Content-Type', 'image/svg+xml');
      res.send(svg);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.get('/api/config', (req, res) => {
    res.json({ provider: activeProvider.name });
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