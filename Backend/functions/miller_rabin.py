import random

def miller_test(n, a):
    """
    Miller-Rabin primality test
    """
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    s = 0
    d = n - 1
    while d % 2 == 0:
        d //= 2
        s += 1
    for _ in range(a):
        x = random.randrange(2, n - 1)
        y = pow(x, d, n)
        if y != 1 and y != n - 1:
            j = 1
            while j < s and y != n - 1:
                y = pow(y, 2, n)
                if y == 1:
                    return False
                j += 1
            if y != n - 1:
                return False
    return True

def isPrime(n):
    if n == 2:
        return True
    if n < 2 or n % 2 == 0:
        return False
    if n == 3:
        return True

    return miller_test(n, 5)

def nextPrime(n):
    i = n+1
    while not isPrime(i):
        i+=1
    return i