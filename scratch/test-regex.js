const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
console.log("Password@123:", passwordRegex.test("Password@123"));
console.log("Password123!:", passwordRegex.test("Password123!"));
console.log("Password123:", passwordRegex.test("Password123"));
console.log("Farrel@123:", passwordRegex.test("Farrel@123"));
