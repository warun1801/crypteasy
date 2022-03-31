'''
Author - Warun Panpaliya (BT18CSE146)
Program 5: Generalized Fermat's Theorem
'''

import sys
import math

def gcd(a, b):
    if b==0:
        return a
    return gcd(b, a%b)

def fast_exponentiation(a, b, m=None):
    ans = 1
    if m != None:
        a%=m
    if a == 0:
        return 0
    while b > 0:
        if b & 1:
            if m != None:
                ans = (ans*a)%m
            else:
                ans*=a
        b>>=1
        if m != None:
            a = (a*a)%m
        else:
            a*=a
    return ans

def get_prime_factors(n):
    factors = []
    cnt = 0
    while n%2==0:
        cnt+=1
        n//=2
    if cnt>0:
        factors.append((2,cnt))
    cnt = 0
    while n%3==0:
        cnt+=1
        n//=3
    if cnt>0:
        factors.append((3,cnt))
    cnt = 0
    i = 1
    while 6*i - 1 < math.ceil(math.sqrt(n)) + 1:
        while n%(6*i-1)==0:
            cnt+=1
            n//=(6*i-1)
        if cnt>0:
            factors.append((6*i-1,cnt))
        cnt=0
        while n%(6*i+1)==0:
            cnt+=1
            n//=(6*i+1)
        if cnt>0:
            factors.append((6*i+1,cnt))
        cnt=0
        i+=1
    if n>1:
        factors.append((n,1))

    return factors

def euler_totient(n):
    prime_factors = get_prime_factors(n)
    ans = 1
    for p,k in prime_factors:
        ans *= fast_exponentiation(p, k) - fast_exponentiation(p, k-1)
    return ans
    
def generalized_fermat_theorem(a, x, n):
    # a^(x) mod n
    if gcd(a,n)!=1:
        return fast_exponentiation(a, x, n)
    # print(f"=> {a}^{x} mod {n}")
    phi = euler_totient(n)
    # print(f"=> phi({n}) = {phi}")
    r,q = x%phi, x//phi
    # print(f"=> {x} = {q} * {phi} + {r}")
    # print(f"=> {a}^{phi} = 1 mod {n}")
    # print(f"=> 1 * {fast_exponentiation(a, r)} mod {n}")
    return fast_exponentiation(a, r, n)

def main():
    a = int(sys.argv[1])
    x = int(sys.argv[2])
    n = int(sys.argv[3])
    generalized_fermat_theorem(a, x, n)

# if __name__ == "__main__":
#     main()