const fs = require('fs');
const path = require('path');

const cssPath = path.join('d:', 'Ecommers', 'src', 'app', 'globals.css');
const content = fs.readFileSync(cssPath, 'utf8');

// Strip out keyframe blocks to avoid matching percentages
const contentWithoutKeyframes = content.replace(/@keyframes[^{]+\{[^{}]+\{[^{}]+\}[^{}]+\}/g, '');

const selectorRegex = /([^{}\n@]+)\s*\{/g;
let match;
const selectors = {};

while ((match = selectorRegex.exec(contentWithoutKeyframes)) !== null) {
    const rawSelector = match[1].trim();
    if (rawSelector.startsWith('from') || rawSelector.startsWith('to') || /^\d+%$/.test(rawSelector)) continue;
    
    const parts = rawSelector.split(',').map(s => s.trim());
    
    parts.forEach(selector => {
        if (!selector) return;
        if (!selectors[selector]) {
            selectors[selector] = [];
        }
        const lineNum = content.substring(0, match.index).split('\n').length;
        selectors[selector].push(lineNum);
    });
}

const duplicates = Object.entries(selectors).filter(([name, lines]) => lines.length > 1);

if (duplicates.length === 0) {
    console.log("No duplicate selectors found.");
} else {
    console.log("Repeated CSS selectors found:");
    duplicates.forEach(([name, lines]) => {
        console.log(`- "${name}": found ${lines.length} times (lines: ${lines.join(', ')})`);
    });
}
