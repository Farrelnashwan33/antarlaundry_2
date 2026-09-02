import fs from 'fs';
import path from 'path';

function walk(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		file = path.join(dir, file);
		const stat = fs.statSync(file);
		if (stat && stat.isDirectory()) {
			results = results.concat(walk(file));
		} else {
			if (file.endsWith('.ts') || file.endsWith('.svelte')) {
				results.push(file);
			}
		}
	});
	return results;
}

const files = walk('./src/routes/admin');
files.forEach((file) => {
	const content = fs.readFileSync(file, 'utf8');
	if (content.includes("user.role !== 'ADMIN'")) {
		const newContent = content.replace(
			/user\.role !== 'ADMIN'/g,
			"user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN'"
		);
		fs.writeFileSync(file, newContent);
		console.log('Updated', file);
	}
});
