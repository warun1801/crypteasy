import { useState } from 'react';
import { AppShell, Anchor, Switch, Card, Space, Container, Header, Input, InputWrapper, Text, Title, SimpleGrid, Button, Paper, Box, Center, Burger, Code, Grid, SegmentedControl, Chips, Chip, createStyles, Tabs, Loader } from '@mantine/core';
import HeaderTemplate from '../components/headerTemplate';

const code = `def miller_test(n, a):
"""
Miller-Rabin primality test
"""
if n == 2:
    return True
if n % 2 == 0:
    return False
s = 0
d = n - 1
while d % 2 == 0:
    d //= 2
    s += 1
for _ in range(a):
    x = random.randrange(2, n - 1)
    y = pow(x, d, n)
    if y != 1 and y != n - 1:
        j = 1
        while j < s and y != n - 1:
            y = pow(y, 2, n)
            if y == 1:
                return False
            j += 1
        if y != n - 1:
            return False
return True

def isPrime(n):
if n == 2:
    return True
if n < 2 or n % 2 == 0:
    return False
if n == 3:
    return True

return miller_test(n, 5)

def nextPrime(n):
i = n+1
while not isPrime(i):
    i+=1
return i`;

export default function Prime() {
    const [n, setN] = useState(-1);
    const [showResultPrime, setShowResultPrime] = useState(false);
    const [showResultNextPrime, setShowResultNextPrime] = useState(false);
    const [resultPrime, setResultPrime] = useState("");
    const [resultNextPrime, setResultNextPrime] = useState("");
    const [loadingPrime, setLoadingPrime] = useState(false);
    const [loadingNextPrime, setLoadingNextPrime] = useState(false);

    const onChangeN = (e) => {
        setShowResultPrime(false);
        setShowResultNextPrime(false);
        setResultNextPrime("");
        setResultPrime("");
        setN(e.target.value);
    }

    const onHandlePrime = async() => {
        if(n===-1 || n=="" || !n){
            alert("Please enter a number");
            return;
        }
        setLoadingPrime(true);
        setShowResultPrime(false);
        const url = `https://crypto-helper-mocha.vercel.app/isprime?n=${n}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setResultPrime(JSON.stringify(data));
            setLoadingPrime(false);
            setShowResultPrime(true);
        } catch (err) {
            setLoadingPrime(false);
            alert("An error occured. Please check the number.");
        }
    }

    const onHandleNextPrime = async() => {
        if(n===-1){
            alert("Please enter a number");
            return;
        }
        setLoadingNextPrime(true);
        setShowResultNextPrime(false);
        const url = `https://crypto-helper-mocha.vercel.app/nextprime?n=${n}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setResultNextPrime(data);
            setLoadingNextPrime(false);
            setShowResultNextPrime(true);
        } catch (err) {
            setLoadingNextPrime(false);
            alert("An error occured. Please check the number.");
        }
    }

    return (
        <Container style={{maxWidth: "100vw"}}>
            <AppShell
                padding="xl"
                header={<HeaderTemplate title="Prime Check and Next Prime" code={code} codeTitle="Miller Rabin Test and NextPrime" description="Tells you if n is prime and gives you the next prime number after n" />}
            >
            <Container alignItems="center">
            <Space h="xl"/>
            <Grid columns={3}>
                <Grid.Col span={1}>
                <InputWrapper
                    label={<Title order={4}>Enter a number n:</Title>}
                >
                    <Input type="number" required placeholder='n' onChange={(e) => onChangeN(e)} />
                </InputWrapper>
                </Grid.Col>
            </Grid>

            <Space h="xl" />
            <Grid justify="center" columns={4}>
                <Grid.Col span={2}>
                    <Button onClick={onHandlePrime}>Check Prime</Button>    
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button onClick={onHandleNextPrime}>Next Prime</Button>
                </Grid.Col>
                <Grid.Col span={2}>
                    {loadingPrime && <Loader variant='dots'/>}
                    {showResultPrime && <Title order={4}>{resultPrime}</Title>}
                </Grid.Col>
                <Grid.Col span={2}>
                    {loadingNextPrime && <Loader variant="dots" />}
                    {showResultNextPrime && <Title order={4}>{resultNextPrime}</Title>} 
                </Grid.Col>
            </Grid>
            </Container>
            </AppShell>
        </Container>
    );
}