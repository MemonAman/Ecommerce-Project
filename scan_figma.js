const fs = require('fs');

const data = JSON.parse(fs.readFileSync('figma_response.json', 'utf8'));

function scanNode(node, depth = 0) {
    if (depth <= 2 && node.type === 'FRAME' || node.type === 'CANVAS' || node.type === 'DOCUMENT') {
        console.log('  '.repeat(depth) + `- ${node.name} (${node.type}) [ID: ${node.id}]`);
    }
    if (node.children) {
        for (const child of node.children) {
            scanNode(child, depth + 1);
        }
    }
}

if (data.nodes && data.nodes['0:1']) {
    scanNode(data.nodes['0:1'].document);
} else {
    console.log("Node 0:1 not found.");
}
