import { useState } from 'react';
import { AppShell, Anchor, Switch, Card, Space, Container, Header, Input, InputWrapper, Text, Title, SimpleGrid, Button, Paper, Box, Center, Burger, Code, Grid, SegmentedControl, Chips, Chip, createStyles, Tabs, Loader } from '@mantine/core';
import HeaderTemplate from '../components/headerTemplate';


const code = `def jacobi(a, p):
if a > 0 and (a%p!=0) and isSquare(a) or isSquare(p):
    # print("JAC: a or p is a square number")
    return 1

if a >= p or a < 0:
    # print("JAC: a is not in the range of p")
    # print("a%p = ", a%p)
    return jacobi(a % p, p)

if a <= 1:
    # print(f"JAC: Legendre({a}, {p}) = {a}")
    return a

if not isPrime(p):
    prod = 1
    factors = factorize(p)
    for pi in factors:
        prod *= jacobi(a, pi)
    return prod

return legendre(a, p)

def legendre(a, p):
    # if a is a perfect square then legendre(a, p) = 1
    if a > 0 and (a%p!=0) and math.ceil(math.sqrt(a)) == math.floor(math.sqrt(a)):
        # print(f"a is a square number, so legendre({a}, {p}) = 1")
        return 1
    
    # a is reducible to a%p
    if a >= p or a < 0:
        # print("a is not in the range of p")
        # print("a%p = ", a%p)
        return legendre(a % p, p)
    
    # legendre(1, p) = 1, legendre(0, p) = 0
    if a <= 1:
        # print(f"Legendre({a}, {p}) = {a}")
        return a

    # legendre(2, p) is (-1)^((p^2 - 1)/8)
    elif a == 2:
        # print(f"(p^2 - 1)/8 = {(p**2 - 1)//8}")
        if p % 8 == 1 or p % 8 == 7:
            # print(f"Legendre({a}, {p}) = {1}")
            return 1
        else:
            # print(f"Legendre({a}, {p}) = {-1}")
            return -1

    # if p%4 = 1 and a == p-1 then a = 4k and p%k = 1 since p = 4k+1
    elif a == p-1:
        # print(f"a = {a} and p = {p}, a == p-1")
        if p % 4 == 1:
            # print(f"p%4 = 1")
            # print(f"Legendre({a}, {p}) = {1}")
            return 1
        else:
            # print(f"Legendre({a}, {p}) = {-1}")
            return -1
    
    # if a is not a prime then we can extract the factors and multiply the legendre symbol
    elif not isPrime(a):
        factors = factorize(a)
        prod = 1
        # print("Factors: ", *factors)
        for pi in factors:
            val = legendre(pi, p)
            # print("Val = ", val)
            prod *= val
            if prod == 0:
                return prod
        # print('Finish')
        return prod

    # if a is lesser than p and is an odd prime then we can use the gaussian quadratic reciprocity law
    # legendre(a, p) = (-1)^((a-1)(p-1)/4) * legendre(p, a)
    else:
        # print("Using Quadratic Reciprocity Law")
        # print(f"Calculating legendre({p}, {a}) ==> legendre({p%a}, {a})")
        if ((p-1)/2) % 2 == 0 or ((a-1)/2) % 2 == 0:
            # print(f"((p-1)(a-1)/4) % 2 == 0 so positive")
            return legendre(p, a)
        else:
            # print(f"((p-1)(a-1)/4) % 2 == 1 so negative")
            return -legendre(p, a)
`;

export default function Jacobi() {
    const [a, setA] = useState(-1);
    const [n, setN] = useState(-1);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleResult = async() => {
        if (a === -1 || n === -1 || !a || !n) {
            alert('Please enter a and n');
            return;
        }
        if (n%2 == 0){
            alert('n must be an odd number');
            return;
        }

        setLoading(true);
        setShowResult(false);
        const url = `https://crypto-helper-mocha.vercel.app/jacobi?a=${a}&n=${n}`;
        const res = await fetch(url);
        const data = await res.json();
        setResult(JSON.parse(data));
        setLoading(false);
        setShowResult(true);
    }

    return (
        <Container>
            <AppShell
                padding="xl"
                header={<HeaderTemplate title="Jacobi / Legendre Symbol" code={code} codeTitle="Jacobi and Legendre" description="Find Jacobi/ Legendre symbol for the input (a|n)" />}
            >
            <SimpleGrid cols={2}>
                <InputWrapper
                    label={<Title order={4}>a:</Title>}
                    description={<Text>a must an integer</Text>}
                >
                    <Input type="number" required placeholder='a' onChange={(e) => setA(e.target.value)} />
                </InputWrapper>
                <InputWrapper
                    label={<Title order={4}>n:</Title>}
                    description={<Text>n must an odd integer</Text>}
                >
                    <Input type="number" required placeholder='b' onChange={(e) => setN(e.target.value)} />
                </InputWrapper>
            </SimpleGrid>
            <Space h="xl"/>
            <Button onClick={handleResult}>Solve</Button>
            <Space h="md"/>
            
            {loading && <Loader size="xl" variant='dots'/>}
            {showResult &&
                <>
                <Title order={3}>Result:</Title>
                <SimpleGrid cols={5}>
                    <Box
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        textAlign: 'left',
                        padding: theme.spacing.xl,
                        borderRadius: theme.radius.md,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
    
                        '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                        },
                    })}
                    >
                        <Text size="lg" weight={600}>{result}</Text>
                    </Box>
                </SimpleGrid>
                </>
            }
            </AppShell>
        </Container>
    );
}