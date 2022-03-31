'''
Author - Warun Panpaliya (BT18CSE146)
Program 8: Chinese Remainder Theorem
'''
import sys
import itertools

def gcd(a, b):
    if b == 0:
        return a
    else:
        return gcd(b, a % b)

def lcm(a, b):
    return (a * b) // gcd(a, b)

def pairwise_coprime_check(arr):
    p = 1
    l = 1
    for i in arr:
        p*=i
        l = lcm(i, l)
    return p == l

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

def congruence_solution_exists(a, b, m):
    g = gcd(a, m)
    if b % g == 0:
        return g
    else:
        return 0

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


def chinese_remainder_theorem(congruences):
    #* STEP 1 - Check if a solution exists
    if not pairwise_coprime_check([m for a, b, m in congruences]):
        return ('N')

    #* STEP 2 - Get the equations in correct form
    M = 1
    a_prime = []
    for a, b, m in congruences:
        M*=m
        num_solns = congruence_solution_exists(a, b, m)
        if num_solns == 0:
            return ('N')
        else:
            a_prime.append(congruence_solution(a, b, m)[2])
    # For all possible permutations of solutions of congruences
    a_prime = [s for s in itertools.product(*a_prime)] 

    #* STEP 3 - Calculate the solution
    b_prime = []
    for a, b, m in congruences:
        b_prime.append(multiplicative_inverse(M//m, m)[1])

    x0 = 0
    solns = []
    for a_dash in a_prime:
        for i in range(len(congruences)):
            x0 = (x0 % M + (M//congruences[i][2] * a_dash[i] * b_prime[i]) % M) % M
        solns.append(x0)
        x0 = 0
    solns = list(set(solns))
    solns.sort()
    return ('Y',*solns)

def main():
    n = int(sys.argv[1])
    congruences = []
    for i in range(2,2+3*n,3):
        congruences.append(tuple(map(int, sys.argv[i:i+3])))
    ans = chinese_remainder_theorem(congruences)
    print(*ans, end = "")

if __name__ == "__main__":
    main()


