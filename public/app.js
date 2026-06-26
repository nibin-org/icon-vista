
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const searchInput = document.getElementById('searchInput');
    const grid = document.getElementById('grid');
    const toast = document.getElementById('toast');
    let debounceTimer;

    // Global Search Shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape') {
        closeModal();
        searchInput.blur();
      }
    });

    // Modal state
    const customizeModal = document.getElementById('customizeModal');
    const modalPreview   = document.getElementById('modalPreview');
    let currentIconId = null;
    let currentPrefix = null;
    let currentName   = null;
    let pickr         = null;

    // Curated themes for random inspiration
    const curatedThemes = [
      'dashboard', 'home', 'user', 'heart', 'star', 'music',
      'camera', 'mail', 'rocket', 'code', 'coffee', 'cloud',
      'shield', 'game', 'compass', 'leaf', 'book', 'zap'
    ];

    function showSkeletons() {
      grid.innerHTML = '';
      for (let i = 0; i < 24; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        skeleton.innerHTML = `
          <div class="skeleton-icon"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text-small"></div>
        `;
        grid.appendChild(skeleton);
      }
    }

    function loadRandomTheme() {
      const randomTheme = curatedThemes[Math.floor(Math.random() * curatedThemes.length)];
      searchInput.placeholder = `Search icons… (showing '${randomTheme}' inspiration)`;
      searchIcons(randomTheme);
    }

    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value.trim();
      if (!query && activeFilters.packs.size === 0 && activeFilters.styles.size === 0) {
        loadRandomTheme();
        return;
      }
      searchInput.placeholder = 'Search for icons (e.g., home, user, cart)…';
      debounceTimer = setTimeout(() => {
        searchIcons(query);
      }, 400);
    });

    // ── Filter Logic ──
    let availableFilters = { packs: [], styles: [] };
    let activeFilters = { packs: new Set(), styles: new Set() };

    function renderFilterPanel() {
      const panel = document.getElementById('filterSidebar');
      panel.innerHTML = '';

      // Sidebar header
      const header = document.createElement('div');
      header.className = 'sidebar-header';
      header.innerHTML = `
        <span class="sidebar-title">Filters</span>
        <button class="sidebar-clear-btn" id="clearFiltersBtn" onclick="clearAllFilters()">Clear all</button>
      `;
      panel.appendChild(header);

      if (availableFilters.styles.length > 0) {
        const styleSec = document.createElement('div');
        styleSec.innerHTML = `<div class="filter-section-title">Style</div>`;
        const list = document.createElement('div');
        list.className = 'filter-list';
        availableFilters.styles.forEach(style => {
          list.appendChild(createCheckbox(style, style, 'styles'));
        });
        styleSec.appendChild(list);
        panel.appendChild(styleSec);
      }

      if (availableFilters.packs.length > 0) {
        const packSec = document.createElement('div');
        packSec.innerHTML = `<div class="filter-section-title">Icon Pack</div>`;
        const list = document.createElement('div');
        list.className = 'filter-list';
        availableFilters.packs.forEach(pack => {
          list.appendChild(createCheckbox(pack.id, pack.name, 'packs'));
        });
        packSec.appendChild(list);
        panel.appendChild(packSec);
      }

      if (availableFilters.styles.length === 0 && availableFilters.packs.length === 0) {
        panel.innerHTML += '<div style="color:var(--text-tertiary);font-size:0.78rem;text-align:center;padding:1rem 0;">No filters available</div>';
      }
    }

    function clearAllFilters() {
      activeFilters.packs.clear();
      activeFilters.styles.clear();
      renderFilterPanel();
      const query = searchInput.value.trim() || currentQuery || 'home';
      searchIcons(query);
    }

    function updateClearBtn() {
      const btn = document.getElementById('clearFiltersBtn');
      if (!btn) return;
      const hasActive = activeFilters.packs.size > 0 || activeFilters.styles.size > 0;
      btn.classList.toggle('visible', hasActive);
    }

    function createCheckbox(id, labelText, category) {
      const label = document.createElement('label');
      label.className = 'filter-checkbox-label';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = id;
      cb.checked = activeFilters[category].has(id);
      cb.onchange = (e) => {
        if (e.target.checked) activeFilters[category].add(id);
        else activeFilters[category].delete(id);
        updateClearBtn();
        const query = searchInput.value.trim() || currentQuery || 'home';
        searchIcons(query);
      };
      const span = document.createElement('span');
      span.className = 'filter-checkbox-custom';
      const text = document.createElement('span');
      text.textContent = labelText;

      label.appendChild(cb);
      label.appendChild(span);
      label.appendChild(text);
      return label;
    }

    let currentQuery = '';
    let currentStart = 0;
    let isLoadingMore = false;
    let hasMore = true;
    const LIMIT = 100;

    async function searchIcons(query) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      currentQuery = query;
      currentStart = 0;
      hasMore = true;
      isLoadingMore = false;
      showSkeletons();
      try {
        const p = Array.from(activeFilters.packs).join(',');
        const s = Array.from(activeFilters.styles).join(',');
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}&limit=${LIMIT}&start=${currentStart}&packs=${p}&styles=${s}`);
        const data = await res.json();

        grid.innerHTML = '';

        if (data.icons && data.icons.length > 0) {
          data.icons.forEach(iconId => {
            const [prefix, name] = iconId.split(':');
            createCard(iconId, prefix, name);
          });
          currentStart += LIMIT;
          if (data.icons.length < LIMIT) hasMore = false;
        } else {
          hasMore = false;
          grid.innerHTML = `
            <div class="empty-state">
              <div class="empty-state-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <h3>No icons found</h3>
              <p>Try searching for something else like "user" or "settings".</p>
            </div>
          `;
        }
      } catch (err) {
        grid.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon" style="color:#ef4444">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </div>
            <h3>Something went wrong</h3>
            <p>${err.message}</p>
          </div>
        `;
      }
    }

    function createCard(iconId, prefix, name) {
      const card = document.createElement('div');
      card.className = 'card';

      const preview = document.createElement('div');
      preview.className = 'icon-preview';
      preview.innerHTML = `<img src="/api/svg?id=${iconId}&color=white" alt="${name}" loading="lazy">`;

      const nameEl = document.createElement('div');
      nameEl.className = 'icon-name';
      nameEl.textContent = name;
      nameEl.title = name;

      const setEl = document.createElement('div');
      setEl.className = 'icon-set';
      setEl.textContent = prefix;
      setEl.title = prefix;

      const spinner = document.createElement('div');
      spinner.className = 'card-spinner';
      spinner.innerHTML = '<div class="spinner-ring"></div>';

      card.onclick = () => openModal(iconId, prefix, name);

      card.appendChild(preview);
      card.appendChild(nameEl);
      card.appendChild(setEl);
      card.appendChild(spinner);
      grid.appendChild(card);
    }

    async function loadMoreIcons() {
      if (isLoadingMore || !hasMore) return;
      isLoadingMore = true;

      const skeletons = [];
      for (let i = 0; i < 12; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        skeleton.innerHTML = `
          <div class="skeleton-icon"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text-small"></div>
        `;
        grid.appendChild(skeleton);
        skeletons.push(skeleton);
      }

      try {
        const p = Array.from(activeFilters.packs).join(',');
        const s = Array.from(activeFilters.styles).join(',');
        const res = await fetch(`/api/search?query=${encodeURIComponent(currentQuery)}&limit=${LIMIT}&start=${currentStart}&packs=${p}&styles=${s}`);
        const data = await res.json();

        skeletons.forEach(s => s.remove());

        if (data.icons && data.icons.length > 0) {
          data.icons.forEach(iconId => {
            const [prefix, name] = iconId.split(':');
            createCard(iconId, prefix, name);
          });
          currentStart += LIMIT;
          if (data.icons.length < LIMIT) hasMore = false;
        } else {
          hasMore = false;
        }
      } catch (err) {
        skeletons.forEach(s => s.remove());
      } finally {
        isLoadingMore = false;
      }
    }

    // Observer target for infinite scroll
    const observerTarget = document.createElement('div');
    observerTarget.style.height = '10px';
    observerTarget.style.width = '100%';
    document.querySelector('.grid-wrap').appendChild(observerTarget);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreIcons();
      }
    }, { rootMargin: '400px' });
    observer.observe(observerTarget);

    async function quickDownload(iconId, spinnerEl) {
      spinnerEl.classList.add('active');
      try {
        const res = await fetch('/api/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ icon_id: iconId, customizations: {} })
        });
        const data = await res.json();
        if (data.success) {
          showToast(`Saved <br/> <small style="opacity:0.75">${data.fileName}</small>`);
        } else {
          showToast(`<span style="color:#f87171">Error: ${data.error}</span>`);
        }
      } catch (err) {
        showToast(`<span style="color:#f87171">Network error</span>`);
      } finally {
        spinnerEl.classList.remove('active');
      }
    }

    // ── Modal state ───────────────────────────────────────
    let isCurrentColor = false;

    function setInheritMode(on) {
      isCurrentColor = on;
      inheritToggle.checked = on;
      colorPickerArea.classList.toggle('dimmed', on);
      applyColorToPreview();
      updateCodeSnippet();
    }

    let activeBg = 'dark';

    const sizeInput          = document.getElementById('sizeInput');
    const sizeValueEl        = document.getElementById('sizeValue');
    const colorHex           = document.getElementById('colorHex');
    const colorSwatchPreview = document.getElementById('colorSwatchPreview');
    const inheritToggle      = document.getElementById('inheritToggle');
    const colorPickerArea    = document.getElementById('colorPickerArea');
    const codeSnippet        = document.getElementById('codeSnippet');

    let currentLang = localStorage.getItem('iconvista_lang') || 'ts';
    let currentStyle = localStorage.getItem('iconvista_style') || 'standard';

    function updateSliderFill() {
      const min = sizeInput.min || 12;
      const max = sizeInput.max || 128;
      const val = sizeInput.value;
      const percent = ((val - min) / (max - min)) * 100;
      sizeInput.style.setProperty('--slider-fill', `${percent}%`);
    }

    // ── Open modal ────────────────────────────────────────
    async function openModal(iconId, prefix, name) {
      currentIconId = iconId;
      currentPrefix = prefix;
      currentName   = name;

      isCurrentColor = false;
      inheritToggle.checked = false;
      colorPickerArea.classList.remove('dimmed');
      setColor('#ffffff', false);
      renderSwatchRow();
      sizeInput.value = '24';
      sizeValueEl.textContent = '24px';
      setActiveSizePreset(24);
      updateSliderFill();

      document.getElementById('modalIdName').textContent = name;
      document.getElementById('modalIdSet').textContent = prefix;
      document.getElementById('modalThumbImg').src = `/api/svg?id=${iconId}&color=white`;

      customizeModal.classList.add('show');
      modalPreview.innerHTML = '<div style="color:var(--text-tertiary);font-size:0.8rem">Loading…</div>';

      try {
        const res     = await fetch(`/api/svg?id=${iconId}`);
        const svgText = await res.text();
        modalPreview.innerHTML = svgText;
        updatePreview();
      } catch (err) {
        modalPreview.innerHTML = `<div style="color:#ef4444">Failed to load SVG</div>`;
      }
    }

    function closeModal() {
      customizeModal.classList.remove('show');
    }

    // ── Swatch row ────────────────────────────────────────
    const RECENT_KEY = 'iconvista_recent_colors';
    const RECENT_MAX = 5;

    function getRecentColors() {
      try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); }
      catch { return []; }
    }

    function pushRecentColor(hex) {
      if (!hex || !/^#[0-9a-fA-F]{6}$/i.test(hex)) return;
      let recents = getRecentColors().filter(c => c.toLowerCase() !== hex.toLowerCase());
      recents.unshift(hex);
      recents = recents.slice(0, RECENT_MAX);
      localStorage.setItem(RECENT_KEY, JSON.stringify(recents));
    }

    function renderSwatchRow() {
      const container = document.getElementById('colorSwatches');
      const wrap      = document.getElementById('recentColorsContainer');
      const currentHex = colorHex.value.toLowerCase();
      const recents   = getRecentColors();

      wrap.style.display = recents.length > 0 ? 'flex' : 'none';
      container.innerHTML = '';
      recents.forEach((hex) => {
        const btn     = document.createElement('button');
        const classes = ['color-swatch-pill'];
        if (hex.toLowerCase() === currentHex) classes.push('active');
        btn.className        = classes.join(' ');
        btn.style.background = hex;
        if (hex === '#08090f' || hex === '#0f172a') btn.style.border = '1px solid rgba(255,255,255,0.15)';
        btn.title = hex;
        btn.addEventListener('click', () => {
          setInheritMode(false);
          setColor(hex);
          applyColorToPreview();
          updateCodeSnippet();
        });
        container.appendChild(btn);
      });
    }

    // ── Color helpers ─────────────────────────────────────
    function setColor(hex, addToRecent = true) {
      colorHex.value = hex;
      colorSwatchPreview.style.background = hex;
      if (pickr && pickr.getColor().toHEXA().toString() !== hex) {
        pickr.setColor(hex);
      }
      if (addToRecent) {
        pushRecentColor(hex);
        renderSwatchRow();
      }
    }

    function applyColorToPreview() {
      if (isCurrentColor) {
        if (activeBg === 'light') {
          modalPreview.style.color = '#0f172a';
        } else if (activeBg === 'blue') {
          modalPreview.style.color = '#ffffff';
        } else {
          modalPreview.style.color = 'currentColor';
        }
      } else {
        modalPreview.style.color = colorHex.value;
      }
    }

    // ── Size helpers ──────────────────────────────────────
    function setActiveSizePreset(size) {
      document.querySelectorAll('.size-preset').forEach(btn => {
        btn.classList.toggle('active', Number(btn.dataset.size) === Number(size));
      });
    }

    // ── Update preview + code ─────────────────────────────
    function updatePreview() {
      const svg = modalPreview.querySelector('svg');
      if (!svg) return;
      const size = sizeInput.value || 24;
      svg.setAttribute('width',  size);
      svg.setAttribute('height', size);
      applyColorToPreview();
      updateCodeSnippet();
    }

    let currentSnippetString = '';
    let snippetDebounceTimer;

    function updateCodeSnippet() {
      if (!currentIconId) return;
      const customizations = {
        size: Number(sizeInput.value),
        color: isCurrentColor ? 'currentColor' : colorHex.value,
        language: currentLang,
        exportStyle: currentStyle
      };
      codeSnippet.innerHTML = '<span style="color:var(--text-tertiary)">Generating snippet…</span>';
      clearTimeout(snippetDebounceTimer);
      snippetDebounceTimer = setTimeout(async () => {
        try {
          const res = await fetch('/api/generate-snippet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ icon_id: currentIconId, customizations })
          });
          const data = await res.json();
          if (data.success) {
            currentSnippetString = data.code;
            const escapedCode = data.code
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/([a-zA-Z0-9]+)=/g, '<span class="prop">$1</span>=')
              .replace(/"([^"]*)"/g, '<span class="str">"$1"</span>')
              .replace(/{([^}]*)}/g, '<span class="val">{$1}</span>');
            codeSnippet.innerHTML = escapedCode;
          } else {
            codeSnippet.innerHTML = `<span style="color:#ef4444">Error: ${data.error}</span>`;
          }
        } catch (err) {
          codeSnippet.innerHTML = `<span style="color:#ef4444">Failed to fetch snippet</span>`;
        }
      }, 400);
    }

    document.getElementById('copyCodeBtn').addEventListener('click', async () => {
      if (!currentSnippetString) return;
      try {
        await navigator.clipboard.writeText(currentSnippetString);
        showToast('Code copied to clipboard!');
      } catch (err) {
        showToast('<span style="color:#f87171">Failed to copy</span>');
      }
    });

    // ── Initial load ──────────────────────────────────────
    let currentProvider = 'iconify';

    window.addEventListener('DOMContentLoaded', async () => {
      document.querySelectorAll('.segment-btn').forEach(btn => {
        const type = btn.dataset.type;
        const val = btn.dataset.val;
        if (type === 'lang') btn.classList.toggle('active', val === currentLang);
        if (type === 'style') btn.classList.toggle('active', val === currentStyle);
      });
      try {
        const configRes = await fetch('/api/config');
        const config = await configRes.json();
        currentProvider = config.provider;

        if (currentProvider === 'untitled-ui') {
          document.querySelector('.hero h1 span').textContent = 'Premium icons,\ninstantly typed.';
          document.querySelector('.hero p').textContent = 'Search your private Untitled UI Pro library. Click any icon to instantly generate a strictly-typed React component.';
          document.querySelector('.logo-text').textContent = 'Untitled UI';
        }

        const filterRes = await fetch('/api/filters');
        availableFilters = await filterRes.json();
        renderFilterPanel();
      } catch(e) {}

      loadRandomTheme();
    });

    // ── Size slider ───────────────────────────────────────
    sizeInput.addEventListener('input', () => {
      sizeValueEl.textContent = `${sizeInput.value}px`;
      setActiveSizePreset(sizeInput.value);
      updateSliderFill();
      updatePreview();
    });

    document.querySelectorAll('.size-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        sizeInput.value = btn.dataset.size;
        sizeValueEl.textContent = `${btn.dataset.size}px`;
        setActiveSizePreset(btn.dataset.size);
        updateSliderFill();
        updatePreview();
      });
    });

    // ── Color picker ──────────────────────────────────────
    pickr = Pickr.create({
      el: '#colorSwatchBtn',
      useAsButton: true,
      theme: 'nano',
      default: '#ffffff',
      position: 'bottom-middle',
      swatches: null,
      components: {
        preview: false,
        opacity: false,
        hue: true,
        interaction: { hex: false, input: false, clear: false, save: false }
      }
    });

    pickr.on('change', (color) => {
      const hex = color.toHEXA().toString();
      isCurrentColor = false;
      inheritToggle.checked = false;
      colorPickerArea.classList.remove('dimmed');
      setColor(hex, false);
      applyColorToPreview();
      updateCodeSnippet();
    });

    pickr.on('changestop', () => {
      const hex = colorHex.value;
      pushRecentColor(hex);
      renderSwatchRow();
    });

    colorHex.addEventListener('input', () => {
      let val = colorHex.value.trim();
      let testVal = val.startsWith('#') ? val : '#' + val;
      if (/^#[0-9a-fA-F]{6}$/i.test(testVal)) {
        isCurrentColor = false;
        inheritToggle.checked = false;
        colorPickerArea.classList.remove('dimmed');
        setColor(testVal.toLowerCase());
        applyColorToPreview();
        updateCodeSnippet();
      }
    });

    colorHex.addEventListener('change', () => {
      let val = colorHex.value.trim();
      let testVal = val.startsWith('#') ? val : '#' + val;
      if (/^#[0-9a-fA-F]{3}$/i.test(testVal)) {
        testVal = '#' + testVal[1]+testVal[1] + testVal[2]+testVal[2] + testVal[3]+testVal[3];
      }
      if (/^#[0-9a-fA-F]{6}$/i.test(testVal)) {
        isCurrentColor = false;
        inheritToggle.checked = false;
        colorPickerArea.classList.remove('dimmed');
        setColor(testVal.toLowerCase());
        applyColorToPreview();
        updateCodeSnippet();
      } else if (pickr) {
        colorHex.value = pickr.getColor().toHEXA().toString();
      }
    });

    inheritToggle.addEventListener('change', () => {
      setInheritMode(inheritToggle.checked);
    });

    document.querySelectorAll('.segment-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = btn.dataset.type;
        const val  = btn.dataset.val;
        btn.parentElement.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (type === 'lang') {
          currentLang = val;
          localStorage.setItem('iconvista_lang', val);
        }
        if (type === 'style') {
          currentStyle = val;
          localStorage.setItem('iconvista_style', val);
        }
        updateCodeSnippet();
      });
    });

    // ── Background switcher ───────────────────────────────
    document.querySelectorAll('.bg-swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bg-swatch').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeBg = btn.dataset.bg;
        modalPreview.className = 'modal-preview';
        if (activeBg !== 'dark') modalPreview.classList.add(`bg-${activeBg}`);
        applyColorToPreview();
      });
    });

    // Close on backdrop click
    customizeModal.addEventListener('click', (e) => {
      if (e.target === customizeModal) closeModal();
    });

    // ── Save ─────────────────────────────────────────────
    document.getElementById('saveComponentBtn').addEventListener('click', async () => {
      const customizations = {
        size:  Number(sizeInput.value),
        color: isCurrentColor ? 'currentColor' : colorHex.value,
        language: currentLang,
        exportStyle: currentStyle
      };
      const saveBtn = document.getElementById('saveComponentBtn');
      const original = saveBtn.innerHTML;
      saveBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Saving…';
      saveBtn.disabled = true;
      try {
        const res  = await fetch('/api/download', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ icon_id: currentIconId, customizations })
        });
        const data = await res.json();
        if (data.success) {
          closeModal();
          showToast(`Saved <br/> <small style="opacity:0.75">${data.fileName}</small>`);
        } else {
          showToast(`<span style="color:#f87171">Error: ${data.error}</span>`);
        }
      } catch (err) {
        showToast(`<span style="color:#f87171">Network error</span>`);
      } finally {
        saveBtn.innerHTML = original;
        saveBtn.disabled  = false;
      }
    });

    document.getElementById('downloadSvgBtn').addEventListener('click', () => {
      const svg = modalPreview.querySelector('svg');
      if (!svg) return;
      const clone = svg.cloneNode(true);
      const finalColor = isCurrentColor ? 'currentColor' : colorHex.value;
      clone.setAttribute('color', finalColor);
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(clone);
      if (!source.match(/^<\?xml[^>]+>/)) {
        source = '<?xml version="1.0" encoding="utf-8"?>\n' + source;
      }
      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentName}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('SVG Downloaded!');
    });

    document.getElementById('copySvgBtn').addEventListener('click', async () => {
      const svg = modalPreview.querySelector('svg');
      if (!svg) return;
      const clone = svg.cloneNode(true);
      const finalColor = isCurrentColor ? 'currentColor' : colorHex.value;
      clone.setAttribute('color', finalColor);
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(clone);
      try {
        await navigator.clipboard.writeText(source);
        showToast('Raw SVG copied!');
      } catch (err) {
        showToast('<span style="color:#f87171">Failed to copy</span>');
      }
    });

    function showToast(msg) {
      const toastSpan = toast.querySelector('span');
      toastSpan.innerHTML = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  