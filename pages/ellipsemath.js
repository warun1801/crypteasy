import { useState } from 'react';
import { AppShell, Anchor, Switch, Card, Space, Container, Header, Input, InputWrapper, Text, Title, SimpleGrid, Button, Paper, Box, Center, Burger, Code, Grid, SegmentedControl, Chips, Chip, createStyles, Tabs, Loader } from '@mantine/core';
import BurgerBar from '../components/drawerTemplate';
import { AiTwotoneHome } from 'react-icons/ai';
import { FaPlus, FaAsterisk } from 'react-icons/fa';

const addCode = `def elliptic_add(P, Q, a, b, p):
x1, y1 = P
x2, y2 = Q

if isInfinity(P):
    return Q
if isInfinity(Q):
    return P

# CASE 2
if isEllipticNegative(x1, y1, x2, y2):
    return ("INF", "INF")

# CASE 1
elif x1 != x2:
    # print("m =", pow(x2-x1, -1, p))
    slope = ((y2 - y1) % p * pow(x2 - x1, -1, p)) % p
# CASE 3
elif isSamePoint(x1, y1, x2, y2):
    slope = ((3*x1**2 + a)%p * pow(2*y1, -1, p)) % p

else:
    assert False, "Value Error"

# print(slope)
x3 = (slope**2 - x1 - x2) % p
y3 = (slope*(x1 - x3) - y1) % p

return (x3, y3)`;

const mulCode = `def fast_elliptic_multiply(k, P, a, b, p):
if k == 0:
    return ("INF", "INF")
elif k == 1:
    return P
elif k % 2 == 0:
    return fast_elliptic_multiply(k//2, elliptic_add(P, P, a, b, p), a, b, p)
else:
    return elliptic_add(fast_elliptic_multiply(k-1, P, a, b, p), P, a, b, p)`;

export default function EllipseMath() {
    const [x1, setX1] = useState(-1);
    const [y1, setY1] = useState(-1);
    const [x2, setX2] = useState(-1);
    const [y2, setY2] = useState(-1);
    const [n, setN] = useState(-1);
    const [result, setResult] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [funcAdd, setFuncAdd] = useState(true);
    const [a, setA] = useState(-1);
    const [b, setB] = useState(-1);
    const [p, setP] = useState(-1);
    const [loader, setLoader] = useState(false);

    const onChangeTab = (active, tabVal) => {
        setX1(-1);
        setY1(-1);
        setX2(-1);
        setY2(-1);
        setN(-1);
        setA(-1);
        setB(-1);
        setP(-1);
        setShowResult(false);
        setResult("");
        setFuncAdd(tabVal);
        // console.log('tabKey', tabKey);
      };

    const isPrime = (n) => {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0)
                return false;
        }
        return true;
    }

    const onHandleAdd = async() => {
        
        if (x1 === -1 || y1 === -1 || x2 === -1 || y2 === -1 || !x1 || !y1 || !x2 || !y2) {
            alert("Please input x1, y1, x2, y2");
            return;
        }
        if (a === -1 || b === -1 || p === -1 || !a || !b || !p) {
            alert("Please input a, b, p");
            return;
        }
        if (4*(a*a*a) + 27*(b*b) === 0) {
            alert("4a^3 + 27b^2 must not be 0. Singular elliptic curve!");
            return;
        }
        if (!isPrime(p)) {
            alert("p must be prime number");
            return;
        }

        setLoader(true);
        setShowResult(false);
        const url = `https://crypto-helper-mocha.vercel.app/ellipticadd?x1=${x1}&y1=${y1}&x2=${x2}&y2=${y2}&a=${a}&b=${b}&p=${p}`;
        const response = await fetch(url);
        const res = await response.json();
        setLoader(false);
        console.log(JSON.parse(res));
        setResult(JSON.parse(res));
        setShowResult(true);
    }

    const onHandleMul = async() => {
        if (x1 === -1 || y1 === -1 || n === -1 || !x1 || !y1 || !n) {
            alert("Please input P and n");
            return;
        }
        if (a === -1 || b === -1 || p === -1 || !a || !b || !p) {
            alert("Please input a, b, p");
            return;
        }
        if (4*(a*a*a) + 27*(b*b) === 0) {
            alert("4a^3 + 27b^2 must not be 0. Singular elliptic curve!");
            return;
        }
        if (!isPrime(p)) {
            alert("p must be prime number");
            return;
        }
        setLoader(true);
        setShowResult(false);
        const url = `https://crypto-helper-mocha.vercel.app/ellipticmultiply?n=${n}&x=${x1}&y=${y1}&a=${a}&b=${b}&p=${p}`;
        const response = await fetch(url);
        const res = await response.json();
        setLoader(false);
        console.log(JSON.parse(res));
        setResult(JSON.parse(res));
        setShowResult(true);
    }

    return (
        <Container>
            <AppShell
                padding="xl"
                header={<Header>
                            <Grid cols={12}>
                                <Grid.Col span={10}>
                                    <Title>Ellipse Math: {funcAdd? "Addition": "Multiplication"}</Title>
                                </Grid.Col>
                                <Grid.Col span={1}  style={{display: "flex", alignItems: "center", justifyContent: "right"}}>
                                    <Anchor href="/" style={{color: "#c1c2c5", textDecoration: "none"}}><div style={{display: "flex", alignItems: "center"}}><AiTwotoneHome size="20px"/>&nbsp;<Text weight={650}>HOME</Text></div></Anchor>
                                </Grid.Col>
                                <Grid.Col span={1}  style={{display: "flex", alignItems: "center", justifyContent: "right"}}>
                                    <BurgerBar title={"Ellipse Math"}>
                                        <Code block>{funcAdd? addCode: mulCode}</Code>
                                    </BurgerBar>
                                </Grid.Col>
                            </Grid>
                            {funcAdd &&
                            <Text size="xl" weight={600}>Addition of two points that exist on the same elliptic curve</Text>}
                            {!funcAdd &&
                            <Text size="xl" weight={600}>Multiplication of a point by a scalar</Text>}
                        </Header>}
            >
                <Container alignItems="center">
                <Tabs active={funcAdd} onTabChange={onChangeTab}>
                    <Tabs.Tab label={<FaPlus/>} tabKey={true}>
                        <Title order={3}>Ellipse Addition:</Title>
                        <Text size="lg" weight={600}>Enter P and Q:</Text>
                        <SimpleGrid cols={2}>
                            <InputWrapper
                                label="P"
                                description="Enter x and y coordinates of P (x1, y1)"
                                required
                            >
                                <Input label="x1" placeholder="x1" onChange={(e) => setX1(e.target.value)}/>
                            </InputWrapper>
                            <InputWrapper
                                label="&nbsp;"
                                description="&nbsp;"
                            >
                                <Input label="y1" placeholder="y1" onChange={(e) => setY1(e.target.value)}/>
                            </InputWrapper>
                            <InputWrapper
                                label="Q"
                                description="Enter x and y coordinates of Q (x2, y2)"
                                required
                            >
                                <Input label="x2" placeholder="x2" onChange={(e) => setX2(e.target.value)}/>
                            </InputWrapper>
                            <InputWrapper
                                label="&nbsp;"
                                description="&nbsp;"
                            >
                                <Input label="y2" placeholder="y2" onChange={(e) => setY2(e.target.value)}/>
                            </InputWrapper>
                        </SimpleGrid>
                        <Space h="xl"/>
                        <Text size="lg" weight={600}>Enter a, b and p (Non singular Elliptic Curve Parameters):</Text>
                        <SimpleGrid cols={3}>
                            <InputWrapper
                                label="a"
                                description="4a^3 + 27b^2!=0"
                                required
                            >
                                <Input label="a" placeholder="a" onChange={(e) => setA(e.target.value)}/>
                            </InputWrapper>
                            <InputWrapper
                                label="b"
                                description="4a^3 + 27b^2!=0"
                                required
                            >
                                <Input label="b" placeholder="b" onChange={(e) => setB(e.target.value)}/>
                            </InputWrapper>
                            <InputWrapper
                                label="p"
                                description="p is an odd prime number"
                                required
                            >
                                <Input label="p" placeholder="p" onChange={(e) => setP(e.target.value)}/>
                            </InputWrapper>
                        </SimpleGrid>
                        <Space h="xl"/>
                        <Button onClick={onHandleAdd}>Add</Button>
                        <Space h="md"/>
                        
                        {loader && <Loader size="xl" variant='dots'/>}
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
                                    <Text size="lg" weight={600}>{result[0]}, {result[1]}</Text>
                                </Box>
                            </SimpleGrid>
                            </>
                        }
                    </Tabs.Tab>
                    <Tabs.Tab label={<FaAsterisk/>} tabKey={false}>
                    <Title order={3}>Ellipse Multiplication:</Title>
                        <Text size="lg" weight={600}>Enter point P and scalar n:</Text>
                        <SimpleGrid cols={2}>
                            <InputWrapper
                                label="P"
                                description="Enter x and y coordinates of P (x1, y1)"
                                required
                            >
                                <Input label="x1" placeholder="x1" onChange={(e) => setX1(e.target.value)}/>
                            </InputWrapper>
                            <InputWrapper
                                label="&nbsp;"
                                description="&nbsp;"
                            >
                                <Input label="y1" placeholder="y1" onChange={(e) => setY1(e.target.value)}/>
                            </InputWrapper>
                            <InputWrapper
                                label="n"
                                description="Enter scalar n to multiply P by"
                                required
                            >
                                <Input label="n" placeholder="n" onChange={(e) => setN(e.target.value)}/>
                            </InputWrapper>
                        </SimpleGrid>
                        <Space h="xl"/>
                        <Text size="lg" weight={600}>Enter a, b and p (Non singular Elliptic Curve Parameters):</Text>
                        <SimpleGrid cols={3}>
                            <InputWrapper
                                label="a"
                                description="4a^3 + 27b^2!=0"
                                required
                            >
                                <Input label="a" placeholder="a" onChange={(e) => setA(e.target.value)}/>
                            </InputWrapper>
                            <InputWrapper
                                label="b"
                                description="4a^3 + 27b^2!=0"
                                required
                            >
                                <Input label="b" placeholder="b" onChange={(e) => setB(e.target.value)}/>
                            </InputWrapper>
                            <InputWrapper
                                label="p"
                                description="p is an odd prime number"
                                required
                            >
                                <Input label="p" placeholder="p" onChange={(e) => setP(e.target.value)}/>
                            </InputWrapper>
                        </SimpleGrid>
                        <Space h="xl"/>
                        <Button onClick={onHandleMul}>Multiply</Button>
                        <Space h="md"/>
                        
                        {loader && <Loader size="xl" variant='dots'/>}
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
                                    <Text size="lg" weight={600}>{result[0]}, {result[1]}</Text>
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

 