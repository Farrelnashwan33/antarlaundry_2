async function main() {
	const { SignJWT } = await import('jose');
	const jwt = await new SignJWT({ userId: '123', role: 'ADMIN' })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(new TextEncoder().encode('secret'));
	console.log('JWT:', jwt);
}
main().catch(console.error);
