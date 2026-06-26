import { transform } from '@svgr/core';
import jsxPlugin from '@svgr/plugin-jsx';

export async function generateReactIcon(iconName, svgContent, customizations = {}) {
  const defaultSize = customizations.size || 24;
  const defaultColor = customizations.color || "currentColor";
  const formattedSize = isNaN(defaultSize) ? `"${defaultSize}"` : defaultSize;
  const formattedColor = `"${defaultColor}"`;
  
  const isTS = customizations.language !== 'js';
  const isArrow = customizations.exportStyle === 'arrow';

  const propsType = isTS ? `: React.SVGProps<SVGSVGElement>` : ``;
  const propsString = `{
  width = ${formattedSize},
  height = ${formattedSize},
  color = ${formattedColor},
  ...props
}${propsType}`;

  const template = (variables, { tpl }) => {
    if (isArrow) {
      return tpl`
import * as React from "react";

export const ${variables.componentName} = (props) => {
  return (
    ${variables.jsx}
  );
};
`;
    } else {
      return tpl`
import * as React from "react";

export function ${variables.componentName}(props) {
  return (
    ${variables.jsx}
  );
}
`;
    }
  };

  const jsCode = await transform(
    svgContent,
    { 
      icon: false,
      typescript: isTS,
      template: template,
      plugins: [jsxPlugin],
      svgProps: {
        width: "{width}",
        height: "{height}",
        color: "{color}"
      },
      expandProps: 'end'
    },
    { componentName: iconName }
  );

  // Replace generic props with our strict destructured signature
  let finalCode = jsCode.replace(/export function (\w+)\(props\)/, 'export function $1(' + propsString + ')');
  finalCode = finalCode.replace(/export const (\w+) = \(?props\)? =>/, 'export const $1 = (' + propsString + ') =>');

  return finalCode + '\n';
}