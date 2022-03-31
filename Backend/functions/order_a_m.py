'''
Author - Warun Panpaliya (BT18CSE146)
Program 9: Order of a mod m
'''
import sys
import math

def gcd(a, b):
    if b == 0:
        return a
    else:
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

def get_divisors(n):
    divisors = []
    i = 1
    for i in range(1, int(math.sqrt(n))+1):
        if n%i==0:
            divisors.append(i)
        
    for i in range(int(math.sqrt(n)), 0, -1):
        if n%i==0:
            divisors.append(n//i)
    
    return divisors

def order_of_mod(a, m):
    if gcd(a, m) != 1:
        return -1
    # Smallest positive number 'h' such that a^(h) = 1 (mod m)
    phi = euler_totient(m)
    divisors_to_check = get_divisors(phi)
    for h in divisors_to_check:
        if fast_exponentiation(a, h, m) == 1:
            return h

    return -1
    #guaranteed to return

def main():
    a = int(sys.argv[1])
    m = int(sys.argv[2])
    print(order_of_mod(a, m), end="")

# if __name__ == '__main__':
#     main()