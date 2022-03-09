import { useState } from 'react';
import { AppShell, Anchor, Switch, Card, Space, Container, Header, Input, InputWrapper, Text, Title, SimpleGrid, Button, Paper, Box, Center, Burger, Code, Grid, SegmentedControl, Chips, Chip, createStyles, Tabs, Loader } from '@mantine/core';
import HeaderTemplate from '../components/headerTemplate';

const code = `def extended_euclidean_algo(a, b):
if b == 0:
    return (1, 0) #base case
else:
    x, y = extended_euclidean_algo(b, a % b)
    g = a // b
    newx = y
    newy = x - g * y
    return newx, newy`;

export default function ExtendedEuclidean() {
    const [a, setA] = useState(-1);
    const [b, setB] = useState(-1);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeA = (e) => {
        setShowResult(false);
        setA(e.target.value);
    }

    const onChangeB = (e) => {
        setShowResult(false);
        setB(e.target.value);
    }

    const handleResult = async() => {
        if (a == -1 || b == -1 || !a || !b) {
            alert("Please enter a and b");
            return;
        }

        setLoading(true);
        setShowResult(false);
        const url = `https://crypto-helper-mocha.vercel.app/extendedeuclid?a=${a}&b=${b}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setResult(JSON.parse(data));
            setLoading(false);
            setShowResult(true);
        } catch (err) {
            setLoading(false);
            alert("An error occurred. Please check your inputs and try again.");
        }  
    }

    return (
        <Container style={{maxWidth: "100vw"}}>
            <AppShell
                padding="xl"
                header={<HeaderTemplate title="Extended Euclidean Algorithm" code={code} codeTitle="Extended Euclidean Algorithm" description="Find x and y for given a and b such that ax + by = GCD(a, b)" />}
            >
            <Container alignItems="center">
            <SimpleGrid cols={2}>
                <InputWrapper
                    label={<Title order={4}>a:</Title>}
                    description={<Text>a must an integer</Text>}
                >
                    <Input type="number" required placeholder='a' onChange={(e) => onChangeA(e)} />
                </InputWrapper>
                <InputWrapper
                    label={<Title order={4}>b:</Title>}
                    description={<Text>b must an integer</Text>}
                >
                    <Input type="number" required placeholder='b' onChange={(e) => onChangeB(e)} />
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
                        <Text size="lg" weight={600}>x = {result[0]}, y = {result[1]}</Text>
                    </Box>
                </SimpleGrid>
                </>
            }
            </Container>
            </AppShell>
        </Container>
    );
}