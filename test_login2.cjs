async function test() {
  const formData = new URLSearchParams();
  formData.append('email', 'admin@antarlaundry.com');
  formData.append('password', 'password');

  const res = await fetch('http://localhost:5173/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  });

  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Body:', text.substring(0, 500));
}
test();
