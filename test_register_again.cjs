async function test() {
  const formData = new URLSearchParams();
  formData.append('name', 'Test 2');
  formData.append('email', 'test998@example.com');
  formData.append('phone', '08123456788');
  formData.append('password', 'password123');
  formData.append('role', 'CUSTOMER');

  const res = await fetch('http://localhost:5173/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  });

  const text = await res.text();
  console.log('Status:', res.status);
}
test();
