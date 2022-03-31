'''
Author - Warun Panpaliya (BT18CSE146)
Program 3: Fundamental Theorem of Arithmetic (Prime factorisation)
'''

import sys
import math

# def superscript(x):
#     normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-=()"
#     super_s = "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖ۹ʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾"
#     res = x.maketrans(''.join(normal), ''.join(super_s))
#     return x.translate(res)

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

def print_prime_factors(factors):
    ans = []
    for (p,e) in factors:
        ans+=([p]*e)
    print(*ans, end="")


def main():
    n = int(sys.argv[1])
    factors = get_prime_factors(n)
    print_prime_factors(factors)

# if __name__ == "__main__":
#     main()