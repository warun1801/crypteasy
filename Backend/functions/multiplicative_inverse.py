'''
Author - Warun Panpaliya (BT18CSE146)
Program 6: Multiplicative Inverse
'''

import sys

def gcd(a, b):
    if b == 0:
        return a
    else:
        return gcd(b, a % b)

def extended_euclidean_algo(a, b):
    if b == 0:
        return (1, 0) #base case
    else:
        x, y = extended_euclidean_algo(b, a % b)
        g = a // b
        newx = y
        newy = x - g * y
        return newx, newy

def multiplicative_inverse(a, m):
    if gcd(a, m) != 1: # checking if multiplicative inverse exists
        return ('N')
    else:
        x, y = extended_euclidean_algo(a, m)
        ans = (x % m + m)%m # handling negatives
        return ('Y', ans)
        
def main():
    a = int(sys.argv[1])
    m = int(sys.argv[2])
    ans = multiplicative_inverse(a, m)
    print(*ans,  end="")

# if __name__ == "__main__":
#     main()