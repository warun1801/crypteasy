import { useState } from 'react';
import { AppShell, Anchor, Switch, Card, Space, Container, Header, Input, InputWrapper, Text, Title, SimpleGrid, Button, Paper, Box, Center, Burger, Code, Grid, SegmentedControl, Chips, Chip, createStyles, Tabs, Loader } from '@mantine/core';
import HeaderTemplate from '../components/headerTemplate';


const code = `def primitive_roots(m):
phi = euler_totient(m)
num_primitive_roots = euler_totient(phi)
rset = rrsm(m)
ans = []
smallest_pr = -1
for i in rset:
    if order_of_mod(i, m) == phi:
        smallest_pr = i
        break
if smallest_pr == -1:
    return ('0')
else:
    for i in range(1, phi):
        if gcd(i, phi) == 1:
            ans.append(fast_exponentiation(smallest_pr, i, m))
ans.sort()
return (num_primitive_roots, ans)

def order_of_mod(a, m):
    if gcd(a, m) != 1:
        return -1
    # Smallest positive number 'h' such that a^(h) = 1 (mod m)
    phi = euler_totient(m)
    divisors_to_check = get_divisors(phi)
    for h in divisors_to_check:
        if fast_exponentiation(a, h, m) == 1:
            return h

    #guaranteed to return
`;

export default function PrimitiveRoots() {
    const [p, setP] = useState(-1);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResult = async() => {
        if (p === -1 || !p) {
            alert("Please enter a number");
            return;
        }

        if (p < 0) {
            alert("Please enter a positive number");
            return;
        }

        setLoading(true);
        setShowResult(false);
        const url = `https://crypto-helper-mocha.vercel.app/primitiveroots?p=${p}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(JSON.parse(data));
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
                header={<HeaderTemplate title="Primitive Roots" code={code} codeTitle="Primitive Roots and Order of mod" description="Find all the primitive roots of p" />}
            >
            <Container alignItems="center">
            <SimpleGrid cols={2}>
                <InputWrapper
                    label={<Title order={4}>p:</Title>}
                    description={<Text>p must be a +ve integer</Text>}
                >
                    <Input type="number" required placeholder='p' onChange={(e) => setP(e.target.value)} />
                </InputWrapper>
            </SimpleGrid>
            <Space h="xl"/>
            <Button onClick={handleResult}>Find</Button>
            <Space h="md"/>
            
            {loading && <Loader size="xl" variant='dots'/>}
            {showResult &&
                <>
                <Title order={3}>Number of primitive roots: {result[0]}</Title>
                <Space h="md"/>
                {result.length > 1 && 
                    <SimpleGrid cols={5}>
                        {result.slice(1)[0].map((item, index) => (
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
                }
                </>
            }
            </Container>
            </AppShell>
        </Container>
    );

}