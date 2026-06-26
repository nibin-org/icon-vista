import path from 'path';
import { createRequire } from 'module';

export class IconifyProvider {
  constructor() {
    this.name = 'iconify';
    this.cachedFilters = null;
  }

  async init() {
    // Iconify requires no initialization
  }

  async getFilters() {
    if (this.cachedFilters) return this.cachedFilters;
    try {
      const res = await fetch('https://api.iconify.design/collections');
      const data = await res.json();
      
      // Curated whitelist of the highest quality / most popular packs
      const whitelist = [
        'mdi', 'ph', 'lucide', 'heroicons', 'bi', 'tabler', 
        'radix-icons', 'feather', 'ri', 'carbon', 'ion'
      ];

      const packs = Object.keys(data)
        .filter(key => whitelist.includes(key))
        .map(key => ({
          id: key,
          name: data[key].name || key
        }));
        
      // Sort alphabetically
      packs.sort((a, b) => a.name.localeCompare(b.name));
      this.cachedFilters = {
        packs,
        styles: ['line', 'solid', 'duotone']
      };
      return this.cachedFilters;
    } catch (e) {
      return { packs: [], styles: [] };
    }
  }

  async search(query, limit = 100, options = {}, start = 0) {
    let finalQuery = query.trim();
    let searchPromises = [];
    
    let fetchLimit = start + limit;
    if (fetchLimit > 999) fetchLimit = 999;
    
    let urlBase = `https://api.iconify.design/search?limit=${fetchLimit}`;
    if (options.packs && options.packs.length > 0) {
      urlBase += `&prefixes=${options.packs.join(',')}`;
    }
    
    if (options.styles && options.styles.length > 0) {
      let mappedStyles = [];
      options.styles.forEach(s => {
        if (s === 'solid') mappedStyles.push('solid', 'fill');
        else if (s === 'line') mappedStyles.push('line', 'outline');
        else mappedStyles.push(s);
      });
      
      for (const style of mappedStyles) {
        const fetchUrl = `${urlBase}&query=${encodeURIComponent((finalQuery + ' ' + style).trim())}`;
        searchPromises.push(fetch(fetchUrl).then(r => r.ok ? r.json() : {icons:[]}));
      }
    } else {
      const fetchUrl = `${urlBase}&query=${encodeURIComponent(finalQuery)}`;
      searchPromises.push(fetch(fetchUrl).then(r => r.ok ? r.json() : {icons:[]}));
    }
    
    const results = await Promise.all(searchPromises);
    const mergedIcons = new Set();
    
    results.forEach(data => {
      if (data.icons) {
        data.icons.forEach(i => mergedIcons.add(i));
      }
    });
    
    return Array.from(mergedIcons).slice(start, start + limit);
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
    this.availableCategories = [];
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
      
      this.availableCategories = Object.keys(categories);
      
      if (this.availableCategories.length === 0) {
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

  async getFilters() {
    return {
      packs: [{ id: 'untitledui', name: 'Untitled UI Pro' }],
      styles: this.availableCategories
    };
  }

  async search(query, limit = 100, options = {}, start = 0) {
    let results = this.iconList;
    
    if (options.styles && options.styles.length > 0) {
      results = results.filter(icon => options.styles.includes(icon.category));
    }
    
    const q = query ? query.toLowerCase() : '';
    if (q) {
      results = results.filter(icon => icon.searchString.includes(q));
    }
    return results.slice(start, start + limit).map(r => r.id);
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
