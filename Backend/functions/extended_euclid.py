'''
Author - Warun Panpaliya (BT18CSE146)
Program 2: Extended Euclidean Algorithm
'''

import sys

def extended_euclidean_algo(a, b):
    if b == 0:
        return (1, 0) #base case
    else:
        x, y = extended_euclidean_algo(b, a % b)
        g = a // b
        newx = y
        newy = x - g * y
        return newx, newy

def main():
    a = int(sys.argv[1])
    b = int(sys.argv[2])
    x, y = extended_euclidean_algo(a, b)
    print(x, y, end="")

if __name__ == "__main__":
    main()