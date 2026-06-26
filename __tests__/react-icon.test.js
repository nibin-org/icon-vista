import { describe, it, expect } from 'vitest';
import { generateReactIcon } from '../templates/react-icon.js';

describe('React Component Generator', () => {
  const sampleSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`;

  it('should generate a TypeScript function by default', () => {
    const result = generateReactIcon('ActivityIcon', sampleSvg);
    
    // Check TS typings
    expect(result).toContain('React.SVGProps<SVGSVGElement>');
    // Check function style
    expect(result).toContain('export function ActivityIcon(');
    // Check default injected props
    expect(result).toContain('width = 24');
    expect(result).toContain('color = "currentColor"');
    // Check camelCasing
    expect(result).toContain('strokeWidth="2"');
    expect(result).toContain('strokeLinecap="round"');
    expect(result).toContain('className="feather feather-activity"');
  });

  it('should strip hardcoded width and height from the original SVG', () => {
    const result = generateReactIcon('ActivityIcon', sampleSvg);
    
    // The `<svg ... width={width} height={height}` is injected, 
    // but the original `width="24" height="24"` from the raw SVG should be gone.
    const openingTag = result.match(/<svg[^>]*>/)[0];
    expect(openingTag).not.toMatch(/width="\d+"/);
    expect(openingTag).not.toMatch(/height="\d+"/);
    expect(openingTag).toContain('width={width}');
    expect(openingTag).toContain('height={height}');
  });

  it('should generate a JavaScript arrow function when specified', () => {
    const result = generateReactIcon('ActivityIcon', sampleSvg, {
      language: 'js',
      exportStyle: 'arrow'
    });
    
    // No TS typings
    expect(result).not.toContain('React.SVGProps');
    // Arrow function format
    expect(result).toContain('export const ActivityIcon = (');
  });

  it('should apply custom colors and sizes properly', () => {
    const coloredSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" color="#FF0000"><path d="M0 0h24v24H0z"/></svg>`;
    const result = generateReactIcon('CustomIcon', coloredSvg, {
      size: 32,
      color: '#06b6d4'
    });

    // Check defaults
    expect(result).toContain('width = 32');
    expect(result).toContain('height = 32');
    expect(result).toContain('color = "#06b6d4"');
    
    // Ensure the original hardcoded color="#FF0000" was stripped
    expect(result).not.toContain('color="#FF0000"');
  });

  it('should preserve currentColor in paths/strokes so it cascades', () => {
    const result = generateReactIcon('ActivityIcon', sampleSvg, {
      color: '#7c3aed'
    });
    
    // The component prop should be the custom color
    expect(result).toContain('color = "#7c3aed"');
    // The SVG body should still contain stroke="currentColor" so it uses the prop
    expect(result).toContain('stroke="currentColor"');
  });
});
