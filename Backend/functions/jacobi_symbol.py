from functions.miller_rabin import isPrime
from functions.legendre_symbol import legendre, factorize
from math import sqrt, floor, ceil

def isSquare(n):
    return floor(sqrt(n)) == ceil(sqrt(n))

def jacobi(a, p):
    if a > 0 and (a%p!=0) and isSquare(a) or isSquare(p):
        # print("JAC: a or p is a square number")
        return 1

    if a >= p or a < 0:
        # print("JAC: a is not in the range of p")
        # print("a%p = ", a%p)
        return jacobi(a % p, p)

    if a <= 1:
        # print(f"JAC: Legendre({a}, {p}) = {a}")
        return a

    if not isPrime(p):
        prod = 1
        factors = factorize(p)
        for pi in factors:
            prod *= jacobi(a, pi)
        return prod

    return legendre(a, p)

# print(jacobi(-42, 61))