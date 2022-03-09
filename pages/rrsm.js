import { useState } from 'react';
import { AppShell, Anchor, Switch, Card, Space, Container, Header, Input, InputWrapper, Text, Title, SimpleGrid, Button, Paper, Box, Center, Burger, Code, Grid, SegmentedControl, Chips, Chip, createStyles, Tabs, Loader } from '@mantine/core';
import HeaderTemplate from '../components/headerTemplate';

const codeRrsm = `def rrsm(n):
ans = []
for i in range(1, n):
    if gcd(n, i) == 1:
        ans.append(i)
return ans
`;

const codeET = `def euler_totient(n):
prime_factors = get_prime_factors(n) # get you range of primes and their powers
ans = 1
for p,k in prime_factors:
    ans *= fast_exponentiation(p, k) - fast_exponentiation(p, k-1)
return ans
`;

export default function Rrsm() {
    const [n, setN] = useState(-1);
    const [func, setFunc] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeTab = (active, tabVal) => {
        setN(-1);
        setShowResult(false);
        setResult("");
        setLoading(false);
        setFunc(tabVal);
    }

    const onHandleRrsm = async() => {
        if (n === -1 || !n) {
            alert("Please enter a number");
            return;
        }

        setLoading(true);
        setShowResult(false);
        const url = `https://crypto-helper-mocha.vercel.app/rrsm?n=${n}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setResult(JSON.parse(data));
            setLoading(false);
            setShowResult(true);
        } catch (error) {
            setLoading(false);
            alert("An error occured. Please check the number.");
            return;
        }
    }

    const onHandleEt = async() => {
        if (n === -1 || !n) {
            alert("Please enter a number");
            return;
        }

        setLoading(true);
        setShowResult(false);
        const url = `https://crypto-helper-mocha.vercel.app/eulertotient?n=${n}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setResult(JSON.parse(data));
            setLoading(false);
            setShowResult(true);
        } catch (error) {
            setLoading(false);
            alert("An error occured. Please check the number.");
            return;
        }
    }

    return (
        <Container style={{maxWidth: "100vw"}}>
            <AppShell
                padding="xl"
                header={<HeaderTemplate
                            title={<Title>{func? "Reduced Residue System Modulo n": "Euler's Totient"}</Title>}
                            code={func? codeRrsm: codeET}
                            codeTitle={func? "RRSM": "Euler's Totient"}
                            description={func? "Find the RRSM of n (All a in CRSM, a%n=1)": "Euler's Totient of RRSMn gets you the size of RRSM"}
                        />}
            >
                <Container alignItems="center">
                    <Tabs active={func} onTabChange={onChangeTab}>
                        <Tabs.Tab label="RRSM" tabKey={true}>
                            <Title order={3}>RRSM:</Title>
                            <Text size="lg" weight={600}>Enter n:</Text>
                            <SimpleGrid cols={2}>
                                <InputWrapper
                                    label="n"
                                    description="Enter +ve integer n"
                                    required
                                >
                                    <Input label="n" placeholder="n" onChange={(e) => setN(e.target.value)}/>
                                </InputWrapper>
                            </SimpleGrid>
                            <Space h="xl"/>                            
                            <Button onClick={onHandleRrsm}>Solve</Button>
                            <Space h="md"/>
                            {loading && <Loader size="xl" variant='dots'/>}
                            {showResult && func &&
                                <>
                                <Title order={3}>Result:</Title>
                                <SimpleGrid cols={5}>
                                    {result.map((item, index) => (
                                        <Box
                                        key={index}
                                        sx={(theme) => ({
                                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                            textAlign: 'center',
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
                                            <Text size="lg" weight={600}>{item}</Text>
                                        </Box>
                                    ))}
                                </SimpleGrid>
                                </>
                            }
                        </Tabs.Tab>
                        <Tabs.Tab label="Euler's Totient" tabKey={false}>
                            <Title order={3}>Euler&apos;s Totient:</Title>
                            <Text size="lg" weight={600}>Enter n:</Text>
                            <SimpleGrid cols={2}>
                                <InputWrapper
                                    label="n"
                                    description="Enter +ve integer n"
                                    required
                                >
                                    <Input label="n" placeholder="n" onChange={(e) => setN(e.target.value)}/>
                                </InputWrapper>
                            </SimpleGrid>
                            <Space h="xl"/>                            
                            <Button onClick={onHandleEt}>Solve</Button>
                            <Space h="md"/>
                            {loading && <Loader size="xl" variant='dots'/>}
                            {showResult && !func &&
                                <>
                                <Title order={3}>Result:</Title>
                                <SimpleGrid cols={2}>
                                    <Box
                                    sx={(theme) => ({
                                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                        textAlign: 'center',
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
                        </Tabs.Tab>
                    </Tabs>
                </Container>
            </AppShell>
        </Container>
    );
}
