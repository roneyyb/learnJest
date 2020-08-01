const exercise = require("../exercise1");
describe("FizzBuzz", () => {
	it("Should throw an error if type is not number", () => {
		const args = ["tree", undefined, false, "",{sd:"sdf"}];
		args.forEach((item) => {
			expect(() => {
				exercise.fizzBuzz(item);
			}).toThrow();
		});
	});
	it("Should return FizzBuzz when number is divisible by 5", () => {
		const result = exercise.fizzBuzz(15);
		expect(result).toBe("FizzBuzz");
	});
	it("Should return FizzBuzz when number is divisible by 3", () => {
		const result = exercise.fizzBuzz(9);
		expect(result).toBe("Fizz");
	});
	it("Should return FizzBuzz when number is divisible by 3", () => {
		const result = exercise.fizzBuzz(10);
		expect(result).toBe("Buzz");
	});
	it("Should return number itself", () => {
		const result = exercise.fizzBuzz(11);
		expect(result).toBe(11);
	});
});