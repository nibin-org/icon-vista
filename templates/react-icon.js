export function generateReactIcon(iconName, svgContent, customizations = {}) {
  const defaultSize = customizations.size || 24;
  const defaultColor = customizations.color || "currentColor";

  let reactSvg = svgContent
    .replace(/\s*\bwidth="[^"]*"/g, "")
    .replace(/\s*\bheight="[^"]*"/g, "")
    .replace(/\s*\bcolor="[^"]*"/g, "")
    .replace(/stroke-width/g, "strokeWidth")
    .replace(/stroke-linecap/g, "strokeLinecap")
    .replace(/stroke-linejoin/g, "strokeLinejoin")
    .replace(/stroke-dasharray/g, "strokeDasharray")
    .replace(/stroke-dashoffset/g, "strokeDashoffset")
    .replace(/stroke-opacity/g, "strokeOpacity")
    .replace(/stroke-miterlimit/g, "strokeMiterlimit")
    .replace(/fill-opacity/g, "fillOpacity")
    .replace(/fill-rule/g, "fillRule")
    .replace(/clip-path/g, "clipPath")
    .replace(/clip-rule/g, "clipRule")
    .replace(/class=/g, "className=")
    .replace(/font-size/g, "fontSize")
    .replace(/font-family/g, "fontFamily")
    .replace(/text-anchor/g, "textAnchor")
    .replace(/xmlns:xlink/g, "xmlnsXlink")
    .replace(/xml:space/g, "xmlSpace")
    .replace(/vector-effect/g, "vectorEffect")
    .replace(/stop-color/g, "stopColor")
    .replace(/stop-opacity/g, "stopOpacity")
    .replace(/color-interpolation-filters/g, "colorInterpolationFilters")
    .replace(/<!--[\s\S]*?-->/g, ""); // remove any comments

  // We DO NOT manually replace "currentColor" with the hex code in the SVG paths!
  // Instead, we let the SVG retain "currentColor" so it naturally cascades from the React `color` prop.

  // Inject width, height, color, and {...props} into the opening <svg> tag
  reactSvg = reactSvg.replace(/<svg([^>]*)>/, (match, p1) => {
    const cleanedAttrs = p1.replace(/\s+/g, ' ').trim();
    const prefix = cleanedAttrs ? ` ${cleanedAttrs}` : '';
    return `<svg${prefix} width={width} height={height} color={color} {...props}>`;
  });

  // Format SVG with proper indentation
  let formattedSvg = reactSvg.replace(/>\s*</g, '>\n<');
  let pad = 0;
  formattedSvg = formattedSvg.split('\n').map(line => {
    if (line.match(/^<\//)) {
      pad -= 2;
    }
    const currentPad = Math.max(0, pad);
    if (line.match(/^<[^/]/) && !line.match(/\/>$/)) {
      pad += 2;
    }
    return '    ' + ' '.repeat(currentPad) + line;
  }).join('\n');

  // Determine if size should be a number or string in the typescript definition
  const formattedSize = isNaN(defaultSize) ? `"${defaultSize}"` : defaultSize;
  const formattedColor = `"${defaultColor}"`;

  const isTS = customizations.language !== 'js'; // Defaults to TS
  const isArrow = customizations.exportStyle === 'arrow';

  const propsType = isTS ? `: React.SVGProps<SVGSVGElement>` : ``;
  const propsString = `{
  width = ${formattedSize},
  height = ${formattedSize},
  color = ${formattedColor},
  ...props
}${propsType}`;

  let componentCode = '';

  if (isArrow) {
    componentCode = `export const ${iconName} = (${propsString}) => {
  return (
${formattedSvg}
  );
};`;
  } else {
    componentCode = `export function ${iconName}(${propsString}) {
  return (
${formattedSvg}
  );
}`;
  }

  return `import * as React from "react";\n\n${componentCode}\n`;
}