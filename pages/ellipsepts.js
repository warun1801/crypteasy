import { useState } from 'react';
import { AppShell, Anchor, Card, Space, Container, Header, Input, InputWrapper, Text, Title, SimpleGrid, Button, Paper, Box, Center, Burger, Code, Grid, Loader } from '@mantine/core';
import BurgerBar from '../components/drawerTemplate';
import { AiTwotoneHome } from 'react-icons/ai';
import HeaderTemplate from '../components/headerTemplate';

const code = `def get_elliptic_curve_points(a, b, p):
print(a, b, p)
# singlular elliptic curve condition check
assert (4*pow(a, 3) + 27*pow(b, 2)) % p != 0, "singular elliptic curve"

points = [("INF", "INF")]
for x in range(p):
    z = (pow(x, 3, p) + a*x + b) % p
    l = legendre(z, p)
    if l == 1:
        y = eulers_criterion_square_root(z, p)
        points.append((x, y))
        if p-y!=y:
            points.append((x, p-y))

return points`;

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

export default function EllipsePts() {
    const [p, setP] = useState(-1);
    const [a, setA] = useState(-1);
    const [b, setB] = useState(-1);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("");
    const [loader, setLoader] = useState(false);

    const handleResult = async() => {
        if (p===-1 || a===-1 || b===-1 || !p || !a || !b) {
            alert("Please enter all the values");
            return;
        }
        if (!isPrime(p) || p%4!=3) {
            alert("p must be prime and congruent to 3 mod 4");
            return;
        }
        if (4*Math.pow(a, 3) + 27*Math.pow(b, 2) % p == 0) {
            alert("singular elliptic curve");
            return;
        }
        setLoader(true);
        setShowResult(false);
        const url = `https://crypto-helper-mocha.vercel.app/getellipticpoints?a=${a}&b=${b}&p=${p}`;
        
        try {
            const response = await fetch(url);
            const res = await response.json();
            setLoader(false);
            setResult(JSON.parse(res));
            setShowResult(true);
        } catch (err) {
            setLoader(false);
            alert("An error occurred. Please check your inputs and try again.");
        }  
    }

    return (
        <Container style={{maxWidth: "100vw"}}>
            <AppShell
                padding="xl"
                header={<HeaderTemplate title="Ellipse Point Calculator" code={code} codeTitle="Ellipse Points" description="Gets you all points on ellipse for p congruent to 3mod4" />}
            >
                <Container alignItems="center">
                <SimpleGrid cols={3}>
                <InputWrapper
                    required
                    label={<><Title order={4}>p:</Title></>}
                    description={<Text size="sm">(p should be of the form 3mod4)</Text>}
                >
                    <Input type="number" required placeholder='p' onChange={(e) => setP(e.target.value)} />
                </InputWrapper>
                <InputWrapper
                    required
                    label={<><Title order={4}>a:</Title></>}
                    description={<Text size="sm">(a should be of the form 4a^3 + 3b^2 != 0)</Text>}
                >
                    <Input type="number" required placeholder='a' onChange={(e) => setA(e.target.value)} />
                </InputWrapper>
                <InputWrapper
                    required
                    label={<><Title order={4}>b:</Title></>}
                    description={<Text size="sm">(b should be of the form 4a^3 + 3b^2 != 0)</Text>}
                >
                    <Input type="number" required placeholder='p' onChange={(e) => setB(e.target.value)} />
                </InputWrapper>
                </SimpleGrid>
                <Space h="xl"/>
                <Button onClick={handleResult}>Get Points</Button>
                {loader && 
                    <>
                    <Space h="xl"/>
                    <Center>
                        <Loader size="xl" variant="dots" />
                    </Center></>}
                {showResult &&
                <>
                    <Space h="xl"/>
                    <Title order={3}>Results: {result.length} points</Title>
                    <Space h="xl"/>
                    <SimpleGrid cols={5}>
                        {result.map((point, index) => 
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
                                <Text size="lg" weight={600}>{point[0]}, {point[1]}</Text>
                            </Box>
                        )}
                    </SimpleGrid>
                </>
                }

            </Container>
            </AppShell>
        </Container>
    );
}