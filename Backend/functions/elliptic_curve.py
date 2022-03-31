from functions.miller_rabin import isPrime
from functions.legendre_symbol import legendre

def eulers_criterion_square_root(z, p):
    assert isPrime(p) and p%4 == 3, "p must be odd prime and p%4 = 3"
    return pow(z, (p+1)//4, p)

def get_elliptic_curve_points(a, b, p):
    print(a, b, p)
    # singlular elliptic curve condition check
    assert (4*pow(a, 3) + 27*pow(b, 2)) % p != 0, "singular elliptic curve"
    
    points = [("INF", "INF")]
    for x in range(p):
        z = (pow(x, 3, p) + a*x + b) % p
        l = legendre(z, p)
        if l == 1:
            y = eulers_criterion_square_root(z, p)
            points.append((x, y))
            if p-y!=y:
                points.append((x, p-y))

    return points

def isEllipticNegative(x1, y1, x2, y2):
    if x1 == x2 and y1 == -y2:
        return True
    return False

def isSamePoint(x1, y1, x2, y2):
    if x1 == x2 and y1 == y2:
        return True
    return False

def isInfinity(P):
    if P == ("INF", "INF"):
        return True
    return False

def elliptic_add(P, Q, a, b, p):
    x1, y1 = P
    x2, y2 = Q

    if isInfinity(P):
        return Q
    if isInfinity(Q):
        return P

    # CASE 2
    if isEllipticNegative(x1, y1, x2, y2):
        return ("INF", "INF")
    
    # CASE 1
    elif x1 != x2:
        # print("m =", pow(x2-x1, -1, p))
        slope = ((y2 - y1) % p * pow(x2 - x1, -1, p)) % p
    # CASE 3
    elif isSamePoint(x1, y1, x2, y2):
        slope = ((3*x1**2 + a)%p * pow(2*y1, -1, p)) % p

    else:
        assert False, "Value Error"

    # print(slope)
    x3 = (slope**2 - x1 - x2) % p
    y3 = (slope*(x1 - x3) - y1) % p

    return (x3, y3)

    
# print(get_elliptic_curve_points(1, 6, 11))

def fast_elliptic_multiply(k, P, a, b, p):
    if k == 0:
        return ("INF", "INF")
    elif k == 1:
        return P
    elif k % 2 == 0:
        return fast_elliptic_multiply(k//2, elliptic_add(P, P, a, b, p), a, b, p)
    else:
        return elliptic_add(fast_elliptic_multiply(k-1, P, a, b, p), P, a, b, p)

def multiply_elliptic(k, P, a, b, p):
    Q = ("INF", "INF")
    for i in range(k):
        Q = elliptic_add(Q, P, a, b, p)
        # print(Q, P)
    return Q


# ans = [multiply_elliptic(i, (2, 7), 1, 6, 11) for i in range(1,13)]

# print(ans)

# print(elliptic_add((5, 2), (2, 7), 1, 6, 11))