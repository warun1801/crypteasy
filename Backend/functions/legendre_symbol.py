from functions.miller_rabin import isPrime
import math
def factorize(n):
    factors = []
    p = 2
    while True:
        while n % p == 0 and n > 0:
            factors.append(p)
            n //= p
        p += 1
        if p > n/p:
            break
    if n > 1:
        factors.append(n)
    return factors 


def legendre(a, p):
    # if a is a perfect square then legendre(a, p) = 1
    if a > 0 and (a%p!=0) and math.ceil(math.sqrt(a)) == math.floor(math.sqrt(a)):
        # print(f"a is a square number, so legendre({a}, {p}) = 1")
        return 1
    
    # a is reducible to a%p
    if a >= p or a < 0:
        # print("a is not in the range of p")
        # print("a%p = ", a%p)
        return legendre(a % p, p)
    
    # legendre(1, p) = 1, legendre(0, p) = 0
    if a <= 1:
        # print(f"Legendre({a}, {p}) = {a}")
        return a

    # legendre(2, p) is (-1)^((p^2 - 1)/8)
    elif a == 2:
        # print(f"(p^2 - 1)/8 = {(p**2 - 1)//8}")
        if p % 8 == 1 or p % 8 == 7:
            # print(f"Legendre({a}, {p}) = {1}")
            return 1
        else:
            # print(f"Legendre({a}, {p}) = {-1}")
            return -1

    # if p%4 = 1 and a == p-1 then a = 4k and p%k = 1 since p = 4k+1
    elif a == p-1:
        # print(f"a = {a} and p = {p}, a == p-1")
        if p % 4 == 1:
            # print(f"p%4 = 1")
            # print(f"Legendre({a}, {p}) = {1}")
            return 1
        else:
            # print(f"Legendre({a}, {p}) = {-1}")
            return -1
    
    # if a is not a prime then we can extract the factors and multiply the legendre symbol
    elif not isPrime(a):
        factors = factorize(a)
        prod = 1
        # print("Factors: ", *factors)
        for pi in factors:
            val = legendre(pi, p)
            # print("Val = ", val)
            prod *= val
            if prod == 0:
                return prod
        # print('Finish')
        return prod

    # if a is lesser than p and is an odd prime then we can use the gaussian quadratic reciprocity law
    # legendre(a, p) = (-1)^((a-1)(p-1)/4) * legendre(p, a)
    else:
        # print("Using Quadratic Reciprocity Law")
        # print(f"Calculating legendre({p}, {a}) ==> legendre({p%a}, {a})")
        if ((p-1)/2) % 2 == 0 or ((a-1)/2) % 2 == 0:
            # print(f"((p-1)(a-1)/4) % 2 == 0 so positive")
            return legendre(p, a)
        else:
            # print(f"((p-1)(a-1)/4) % 2 == 1 so negative")
            return -legendre(p, a)


# if __name__ == "__main__":
#     print(legendre(18, 19))
