import path from 'path';
import { createRequire } from 'module';

export class IconifyProvider {
  constructor() {
    this.name = 'iconify';
  }

  async init() {
    // Iconify requires no initialization
  }

  async search(query, limit = 100) {
    const res = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=${limit}`);
    if (!res.ok) throw new Error('Iconify search failed');
    const data = await res.json();
    return data.icons || [];
  }

  async getSvg(iconId) {
    const [prefix, name] = iconId.split(':');
    const res = await fetch(`https://api.iconify.design/${prefix}/${name}.svg`);
    if (!res.ok) throw new Error('Iconify SVG fetch failed');
    return await res.text();
  }
}

export class UntitledUIProvider {
  constructor() {
    this.name = 'untitled-ui';
    this.iconList = [];
    this.iconCache = {};
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    
    console.log('Loading Untitled UI Provider...');
    const cwd = process.cwd();
    // Create a require function scoped to the end-user's directory
    const userRequire = createRequire(path.join(cwd, 'package.json'));
    
    let React, renderToStaticMarkup;
    let categories = {};

    try {
      React = userRequire('react');
      renderToStaticMarkup = userRequire('react-dom/server').renderToStaticMarkup;
      
      try { categories.line = userRequire('@untitledui-pro/icons/line'); } catch(e) {}
      try { categories.solid = userRequire('@untitledui-pro/icons/solid'); } catch(e) {}
      try { categories.duotone = userRequire('@untitledui-pro/icons/duotone'); } catch(e) {}
      try { categories.duocolor = userRequire('@untitledui-pro/icons/duocolor'); } catch(e) {}
      
      if (Object.keys(categories).length === 0) {
        throw new Error("No Untitled UI icon modules found.");
      }
    } catch (err) {
      console.error('\n❌ Untitled UI Provider Error:');
      console.error('You have configured "untitled-ui" as your icon provider, but the required packages are not installed in your project.');
      console.error('Please run: npm install @untitledui-pro/icons\n');
      throw err;
    }

    let count = 0;
    for (const [category, moduleObj] of Object.entries(categories)) {
      if (!moduleObj) continue;
      
      for (const [name, Component] of Object.entries(moduleObj)) {
        if (name === 'default' || (typeof Component !== 'function' && typeof Component !== 'object')) continue;
        
        try {
          const svgString = renderToStaticMarkup(React.createElement(Component));
          let cleanSvg = svgString.replace(/width="[^"]*"/, '').replace(/height="[^"]*"/, '');
          
          if (!cleanSvg.includes('xmlns=')) {
            cleanSvg = cleanSvg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
          }

          const id = `${category}:${name}`;
          this.iconCache[id] = cleanSvg;
          
          const searchTokens = name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
          
          this.iconList.push({ 
            id, 
            name, 
            category, 
            searchString: `${category} ${searchTokens}` 
          });
          count++;
        } catch (err) {
          // Ignore non-components
        }
      }
    }
    this.initialized = true;
    console.log(`✅ Successfully indexed ${count} premium Untitled UI icons.`);
  }

  async search(query, limit = 100) {
    const q = query.toLowerCase();
    if (!q) {
      return this.iconList.slice(0, limit).map(r => r.id);
    }
    const results = this.iconList.filter(icon => icon.searchString.includes(q)).slice(0, limit);
    return results.map(r => r.id);
  }

  async getSvg(iconId) {
    return this.iconCache[iconId] || null;
  }
}

export async function getProvider(providerName) {
  let provider;
  if (providerName === 'untitled-ui') {
    provider = new UntitledUIProvider();
  } else {
    provider = new IconifyProvider(); // fallback default
  }
  await provider.init();
  return provider;
}
