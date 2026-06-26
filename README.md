# 🌄 Icon Vista

A beautiful, local CLI tool to search, generate, and strictly type React icons directly into your codebase. By default, it searches across 200,000+ open-source icons via Iconify. It also features a built-in enterprise plugin to seamlessly integrate premium private icon libraries like **Untitled UI Pro**.

<br />
<video src="https://icon-vista.vercel.app/demo.webm" width="100%" controls autoPlay loop muted playsInline></video>
<br />

## ✨ Features
* **Visual Search Engine**: Instantly search thousands of icons via a beautiful local UI.
* **Code Generation**: One-click generation of fully typed React components (TS/JS, Arrow/Standard functions).
* **Enterprise Provider Architecture**: Decoupled backend supports both public APIs (Iconify) and reverse-rendering of private premium packages.
* **No Dependencies**: Generates pure, raw `<svg>` React components that require no external runtime dependencies.

> 📚 **[Read the Full Documentation](https://icon-vista.vercel.app)**  
> *(Note: Replace with your actual deployed URL)*

---

## 🚀 Quick Start (Free Iconify Provider)

In any React project, initialize the configuration wizard:
```bash
npx icon-vista init
```
This will prompt you for a save directory and generate an `icon-vista.json` file.

To start the visual search engine, simply run:
```bash
npx icon-vista
```

---

## 💎 Premium Setup (Untitled UI Pro)

If your company has a license for **Untitled UI Pro**, Icon Vista can dynamically reverse-render the minified package into raw SVGs and serve them to your local UI.

**1. Install the Premium Package**
Ensure you have authenticated with your `.npmrc` token, then install the package in your project:
```bash
npm install @untitledui-pro/icons react react-dom
```

**2. Update your Configuration**
Open `icon-vista.json` in your project root and update the `provider` field to `untitled-ui`:
```json
{
  "savePath": "./src/components/icons",
  "provider": "untitled-ui"
}
```

**3. Boot the Engine**
```bash
npx icon-vista
```
Icon Vista will instantly detect your premium package, index all 4,700+ icons into memory, and switch the UI to your private Untitled UI database. 

*(If you ever remove the provider key or uninstall the package, it gracefully defaults back to the free Iconify library).*

---

## ⚙️ Configuration File (`icon-vista.json`)

| Key | Type | Default | Description |
|---|---|---|---|
| `savePath` | string | `./src/components/icons` | The directory where generated React components are saved. |
| `provider` | string | `iconify` | The active icon database (`iconify` or `untitled-ui`). |

---

## 📜 License
MIT
