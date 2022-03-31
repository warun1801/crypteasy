'''
Author - Warun Panpaliya (BT18CSE146)
Program 7: Solution for a congruence
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

def congruence_solution(a, b, m):
    g = gcd(a, m)
    #* STEP 1
    if b % g != 0: # check for congruence solution existence
        return ('N')
    else:
        num_solns = g
    
    #* STEP 2
    alpha, beta, gamma = a//g, b//g, m//g
    # Solution is x = (beta*(alpha inv)) mod gamma
    # To get alpha inverse (guaranteed to have one)
    alphainv = multiplicative_inverse(alpha, gamma)[1]

    #* STEP 3
    x = (beta*alphainv) % gamma
    
    solutions = []
    for i in range(0,num_solns):
        solutions.append(x + i*(m//g))

    return ('Y', num_solns, solutions)


def main():
    a = int(sys.argv[1])
    b = int(sys.argv[2])
    m = int(sys.argv[3])

    ans = congruence_solution(a, b, m)
    if len(ans) == 1:
        print(ans[0], end="")
    else:
        print(ans[0], ans[1], *ans[2], end="")

# if __name__ == "__main__":
#     main()