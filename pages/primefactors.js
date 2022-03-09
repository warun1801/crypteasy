import { useState } from 'react';
import { AppShell, Anchor, Switch, Card, Space, Container, Header, Input, InputWrapper, Text, Title, SimpleGrid, Button, Paper, Box, Center, Burger, Code, Grid, SegmentedControl, Chips, Chip, createStyles, Tabs, Loader } from '@mantine/core';
import HeaderTemplate from '../components/headerTemplate';

const code = `def get_prime_factors(n):
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
`;

export default function PrimeFactors() {
    const [n, setN] = useState(-1);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResult = async() => {
        if (n == -1 || !n) {
            alert("Please enter a number");
            return;
        }
        if (n < 0) {
            alert("Please enter a positive number");
            return;
        }

        setLoading(true);
        setShowResult(false);
        const url = `https://crypto-helper-mocha.vercel.app/primefactors?n=${n}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setResult(JSON.parse(data));
            setLoading(false);
            setShowResult(true);
        } catch (err) {
            setLoading(false);
            alert("An error occurred. Probably the number is too huge!");
            return;
        }
        
    }

    return (
        <Container style={{maxWidth: "100vw"}}>
            <AppShell
                padding="xl"
                header={<HeaderTemplate title="Prime Factors" code={code} codeTitle="Prime Factorization" description="Find all the prime factors (and their powers) of n" />}
            >
            <Container alignItems="center">
            <SimpleGrid cols={2}>
                <InputWrapper
                    label={<Title order={4}>n:</Title>}
                    description={<Text>n must be a +ve integer</Text>}
                >
                    <Input type="number" required placeholder='n' onChange={(e) => setN(e.target.value)} />
                </InputWrapper>
            </SimpleGrid>
            <Space h="xl"/>
            <Button onClick={handleResult}>Find</Button>
            <Space h="md"/>
            
            {loading && <Loader size="xl" variant='dots'/>}
            {showResult &&
                <>
                <Title order={3}>Result:</Title>
                <Text size="sm" weight={400} color="#909296">(of the form p^k, where p is prime and k is power)</Text>
                <Space h="md"/>
                <SimpleGrid cols={5}>
                    {result.map((item, index) => (
                        <Box
                            key={index}
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
                            <Text size="lg" weight={600}>p = {item[0]}, k = {item[1]}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
                </>
            }
            </Container>
            </AppShell>
        </Container>
    );

}