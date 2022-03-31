from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware

from functions.chinese_remainder_theorem import chinese_remainder_theorem
from functions.miller_rabin import isPrime, nextPrime
from functions.elliptic_curve import get_elliptic_curve_points, elliptic_add, fast_elliptic_multiply
from functions.extended_euclid import extended_euclidean_algo
from functions.jacobi_symbol import jacobi
from functions.legendre_symbol import legendre
from functions.multiplicative_inverse import multiplicative_inverse
from functions.order_a_m import order_of_mod
from functions.prime_factors import get_prime_factors
from functions.primitive_roots import primitive_roots
from functions.rrsm import rrsm, euler_totient

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/crt")
async def crt(congruences: str):
    print(congruences)
    c = json.loads(congruences)
    print(c)
    congruences = []
    for i in c.keys():
        congruences.append(c[i])

    ans = chinese_remainder_theorem(congruences)
    return json.dumps(ans)

@app.get("/getellipticpoints")
async def getellipticpoints(a: int, b: int, p: int):
    # print(a, b, p)
    ans = get_elliptic_curve_points(a, b, p)
    # print("asns = ", ans)
    return json.dumps(ans)

@app.get("/ellipticadd")
async def ellipticadd(x1:int, y1: int, x2: int, y2: int, a: int, b: int, p: int):
    ans = elliptic_add((x1, y1), (x2, y2), a, b, p)
    return json.dumps(ans)

@app.get("/ellipticmultiply")
async def ellipticmultiply(n:int, x: int, y: int, a: int, b: int, p: int):
    ans = fast_elliptic_multiply(n, (x, y), a, b, p)
    return json.dumps(ans)

@app.get("/isprime")
async def isprime(n: int):
    ans = isPrime(n)
    return json.dumps(ans)

@app.get("/extendedeuclid")
async def extendedeuclid(a: int, b: int):
    ans = extended_euclidean_algo(a, b)
    return json.dumps(ans)

@app.get("/jacobi")
async def jacobisym(a: int, n: int):
    ans = jacobi(a, n)
    return json.dumps(ans)

@app.get("/legendre")
async def legendre_symbol(a: int, p: int):
    ans = legendre(a, p)
    return json.dumps(ans)

@app.get("/modinv")
async def modinv(a: int, m: int):
    ans = multiplicative_inverse(a, m)
    return json.dumps(ans)

@app.get("/order")
async def order(a: int, m: int):
    ans = order_of_mod(a, m)
    return json.dumps(ans)

@app.get("/primefactors")
async def primefactors(n: int):
    ans = get_prime_factors(n)
    return json.dumps(ans)

@app.get("/primitiveroots")
async def primitiveroots(p: int):
    ans = primitive_roots(p)
    return json.dumps(ans)

@app.get("/rrsm")
async def rrsm_func(n: int):
    ans = rrsm(n)
    return json.dumps(ans)

@app.get("/eulertotient")
async def euler(n: int):
    ans = euler_totient(n)
    return json.dumps(ans)

@app.get("/nextprime")
async def nextprime(n: int):
    ans = nextPrime(n)
    return json.dumps(ans)