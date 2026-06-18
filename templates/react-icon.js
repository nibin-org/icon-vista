export function generateReactIcon(iconName, svgContent) {
  let reactSvg = svgContent
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

  // Inject {...props} into the opening <svg> tag
  reactSvg = reactSvg.replace(/<svg([^>]*)>/, '<svg$1 {...props}>');

  return `import * as React from "react";

export function ${iconName}(props: React.SVGProps<SVGSVGElement>) {
  return (
    ${reactSvg.trim()}
  );
}
`;
}