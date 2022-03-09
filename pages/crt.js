import { useState } from 'react';
import { AppShell, Anchor, Card, Space, Container, Header, Loader, Input, InputWrapper, Text, Title, SimpleGrid, Button, Paper, Box, Center, Burger, Code, Grid } from '@mantine/core';
import { BsCheckLg } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import HeaderTemplate from '../components/headerTemplate';

const code = `def chinese_remainder_theorem(congruences):
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
return ('Y',*solns)`;

export default function Crt() {
    const [numEqs, setNumEqs] = useState(1);
    const [inputs, setInputs] = useState([1]);
    const [values, setValues] = useState({"1": [0, 0, 0]});
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("");
    const [loader, setLoader] = useState(false);

    const onNumEqsChange = (e) => {
        setNumEqs(e.target.value);
        let newArray = [];
        for (let i = 0; i < e.target.value; i++) {
            newArray.push(i+1);
        }
        setInputs(newArray);
        let valArray = {};
        for (let i = 0; i < e.target.value; i++) {
            valArray[i+1] = [0, 0, 0];
        }
        setValues(valArray);
        setResult("");
    }

    const changeState = (e, i, idx) => {
        if (idx == 0)
            setValues({...values, [i]: [parseInt(e.target.value), values[i][1], values[i][2]]});
        else if (idx == 1)
            setValues({...values, [i]: [values[i][0], parseInt(e.target.value), values[i][2]]});
        else
            setValues({...values, [i]: [values[i][0], values[i][1], parseInt(e.target.value)]});
    }

    const handleResult = async() => {
        for(const key in values) {
            if (values[key][0] == 0 || values[key][1] == 0 || values[key][2] == 0 || !values[key][0] || !values[key][1] || !values[key][2]) {
                alert("Please enter all non zero values");
                return;
            }
        }


        // console.log(`https://crypto-helper-mocha.vercel.app/crt?congruences=${JSON.stringify(values)}`);
        setLoader(true);
        setShowResult(false);
        const ans = await fetch(`https://crypto-helper-mocha.vercel.app/crt?congruences=${JSON.stringify(values)}`);
        const res = await ans.json();
        setLoader(false);
        setResult(JSON.parse(res));
        setShowResult(true);
    }
    return (
        <Container>
        <AppShell
            padding="xl"
            header={<HeaderTemplate title="Multiple Congruence Solver" code={code} description="Uses Chinese Remainder Theorem" codeTitle="Chinese Remainder Theorem"/>}
        >
            
            

            <InputWrapper key={10000}
                label={<Title order={4}>Num of Equations:</Title>}
            >
                <Input type="number" value={numEqs} onChange={onNumEqsChange} />
            </InputWrapper>
            <Space h="xl" />
            <SimpleGrid cols={3}>
            {inputs.map((i) => 
                <Card key={i}>
                    <InputWrapper
                        required
                        key={i}
                        label={`Equation ${i}`}
                    >
                        <Space/>
                        a: <Input type="number" required placeholder="a" onChange={(e) => changeState(e, i, 0)}/>
                        b: <Input type="number" required placeholder="b" onChange={(e) => changeState(e, i, 1)}/>
                        p: <Input type="number" required placeholder="p" onChange={(e) => changeState(e, i, 2)}/>
                    </InputWrapper>
                </Card>  
            )}
            </SimpleGrid>
            <Space h="xl" />
            {numEqs > 0 &&
            <Button onClick={handleResult}>Solve</Button>
            }
            {loader && 
                <>
                <Space h="xl"/>
                <Center>
                    <Loader size="xl" variant="dots" />
                </Center></>}
            {showResult &&
            <>
                <Title order={3}>Results:</Title>
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
                    {
                        result.length > 1 &&
                        <>
                            <BsCheckLg/>&emsp;{result.slice(1).map((i) => <Text key={i}>{i}</Text>)}
                        </>
                    }
                    {result.length == 1 &&
                        <>
                            <ImCross />&emsp;<Text>No Solution found for the given congruences!</Text>
                        </>
                    }
                </Box>
            </>}
        </AppShell>
        </Container>
    );
}