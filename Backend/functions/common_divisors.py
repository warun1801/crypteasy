'''
Author - Warun Panpaliya (BT18CSE146)
Program 1: Common Divisors
'''

import sys
import math

# For getting GCD of two numbers
def gcd(a, b):
    if b==0:
        return a
    else:
        return gcd(b, a%b)

# For getting GCD of an array of numbers
def gcd_array(arr):
    if len(arr)==1:
        return arr[0]
    else:
        return gcd(arr[0], gcd_array(arr[1:]))

# For getting divisors of a number
def get_divisors(n):
    divisors = []
    i = 1
    for i in range(1, int(math.sqrt(n))+1):
        if n%i==0:
            divisors.append(i)
        
    for i in range(math.ceil(math.sqrt(n))-1, 0, -1):
        if n%i==0:
            divisors.append(n//i)
    
    return divisors


def main():
    n = int(sys.argv[1])
    arr = [int(sys.argv[i]) for i in range(2,n+2)]
    common_divisors = get_divisors(gcd_array(arr))
    print(*common_divisors, end="")
    
# if __name__ == "__main__":
#     main()

