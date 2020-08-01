const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");
describe('absolute', () => {
    it('absolute -should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);

    });

    it("absolute -should return a positive number if input is negative", () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });


    it("absolute -should return a zero number if input is zero", () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it("should return the greeting message", () => {
        const result = lib.greet("Mosh");
        expect(result).toMatch(/Mosh/);
    })
});

//Testing currencies

describe('currencies', () => {
    it("should return a currency array", () => {
        const result = lib.getCurrencies();
        //To general
        expect(result).toBeDefined();
        // expect(result).toBeNull();

        //Too specific
        expect(result[0]).toBe("USD");
        expect(result[1]).toBe("AUD");
        expect(result[2]).toBe("EUR");

        //Proper way
        expect(result).toContain("USD");
        expect(result).toContain("AUD");
        expect(result).toContain("EUR");

        //Ideal way
        expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
    });
});

//Testing object

describe('getProduct', () => {
    it("Should return a product", () => {
        const result = lib.getProduct(1);
        expect(result).toMatchObject({ id: 1, price: 10 });
        expect(result).toHaveProperty('id');
    })
})

describe('registerUser', () => {
    it('should throw an error if username is falsy', () => {
        const args = [null, NaN, false, 0, '', undefined];
        args.forEach(args => {
            expect(() => {
                lib.registerUser(a).toThrow();
            });
        });
    });

    it('should return a user object if valid usernamed ', () => {
        const result = lib.registerUser('mosh');
        expect(result).toMatchObject({ username: /mosh/ });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it("should apply 10% discount if customer has more than 10 points.", () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a', points: 20 });

        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    })
})

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
    //     db.getCustomerSync = function (customerId) {
    //         return { email: 'a' };
    //     }

    //     let mailSent = true;
    //     mail.send = function (email, message) {
    //         mailSent = true;
    //     }

    //     lib.notifyCustomer({ customerId: 1 });
    //     expect(mailSent).toBe(true);
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });

        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');

        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
        
});