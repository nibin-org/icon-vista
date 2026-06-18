export function generateReactIcon(iconName, svgContent, customizations = {}) {
  const defaultSize = customizations.size || 24;
  const defaultColor = customizations.color || "currentColor";

  let reactSvg = svgContent
    .replace(/\bwidth="[^"]*"/g, "")
    .replace(/\bheight="[^"]*"/g, "")
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
  reactSvg = reactSvg.replace(/<svg([^>]*)>/, '<svg$1 width={width} height={height} color={color} {...props}>');

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

  return `import * as React from "react";

export function ${iconName}({
  width = ${formattedSize},
  height = ${formattedSize},
  color = ${formattedColor},
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
${formattedSvg}
  );
}
`;
}