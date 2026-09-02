async function test() {
	const formData = new URLSearchParams();
	formData.append('name', 'Test User');
	formData.append('email', 'test999@example.com');
	formData.append('phone', '08123456789');
	formData.append('password', 'password123');
	formData.append('role', 'CUSTOMER');

	const res = await fetch('http://localhost:5173/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: formData.toString()
	});

	const text = await res.text();
	console.log('Status:', res.status);
	console.log('Body:', text.substring(0, 500));
}
test();
