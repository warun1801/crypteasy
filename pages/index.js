import { Accordion, Button, List, Center, Container, Title, Header, Text, Navbar, AppShell, Grid, Group, Anchor, Image, Space, Card, Pagination, Paper, Dialog, TextInput, Textarea, Notification, Alert } from '@mantine/core'
import BurgerBar from '../components/drawerTemplate'
import { FcAbout } from 'react-icons/fc';
import { SiAboutdotme } from 'react-icons/si';
import { FaGithub, FaInstagram, FaLinkedin, FaStar } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { RiProfileFill, RiFeedbackFill } from 'react-icons/ri';
import { useState } from 'react';
import '@fontsource/dancing-script';
import '@fontsource/raleway';
import '@fontsource/satisfy';
import '@fontsource/jost';
import { CheckIcon } from '@modulz/radix-icons';

export default function Home() {
  const [activePage, setPage] = useState(1);
  const [opened, setOpened] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("")
  const [showAlert, setShowAlert] = useState(false);

  const handleFeedback = () => {
    let toSendName = name;
    let toSendComment = comment;
    console.log(toSendName);
    console.log(toSendComment);
    // Some logic to add the comment to the database
    setShowAlert(true);
    setOpened(false);
    setComment("");
    setName("");
  }

  return (
    <>
    <div style={{padding: "10px"}}>
    <AppShell
        padding="xl"
        header={
        <Group direction='row' align="left" position="apart">
          <div style={{display: "flex", alignItems: "center"}}>
            <BurgerBar size="xl" profile title={<Title style={{fontFamily: "raleway"}}>About Me</Title>}>
              <Grid cols={12} align="center">
                <Grid.Col span={6}>
                <Image
                  radius={20}
                  width={200}
                  height={190}
                  alt="Warun Panpaliya"
                  withPlaceholder
                  src="https://drive.google.com/uc?id=1DF59llG0FXFKFrcYL3ZN2P2mF8X6hflr"
                />
                </Grid.Col>
                <Grid.Col span={6}>
                <Text size="xl" style={{fontFamily: "satisfy", fontWeight: "500", fontSize: "23px"}}> I am Warun Panpaliya. <br/>A passionate and enthusiastic developer. I play the guitar and watch a lot of Anime!</Text>
                </Grid.Col>
              </Grid>
              <Container padding="15%">
              <Space h="xl" />
              <Container>
                <Title style={{fontFamily: "satisfy", fontSize: "50px"}}>Check me out!</Title>
              </Container>
              <Space h="lg" />
              <Group direction='column'>
                <Anchor href="https://github.com/warun1801" target="_blank"  style={{textDecoration: "none", color: "#c1c2c5"}}>
                  <Group>
                    <FaGithub size="28px" />
                    <Text size="xl" weight={500} style={{fontFamily: "raleway", fontWeight: "bold"}}> warun1801</Text>
                  </Group>
                </Anchor>
                <Anchor href="https://warunpanpaliya.vercel.app" target="_blank"  style={{textDecoration: "none", color: "#ef5f67"}}>
                  <Group>
                    <RiProfileFill size="28px" />
                    <Text size="xl" weight={500} style={{fontFamily: "raleway", fontWeight: "bold"}}> Portfolio</Text>
                  </Group>
                </Anchor>
                <Anchor href="https://instagram.com/warun_panpaliya" target="_blank"  style={{textDecoration: "none"}} variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }}>
                  <Group>
                    <FaInstagram size="28px" color="#c44bce"/>
                    <Text size="xl" weight={500} style={{fontFamily: "raleway", fontWeight: "bold"}}> warun_panpaliya</Text>
                  </Group>
                </Anchor>  
              </Group>
              <Space h="xl" />
              <Container>
                <Title style={{fontFamily: "satisfy", fontSize: "50px"}}>Hit me up!</Title>
              </Container>
              <Space h="lg" />
              <Group direction='column'>
                <Anchor href="mailto:warun1801@gmail.com" target="_blank"  style={{textDecoration: "none", color: "#cd3c30"}}>
                  <Group>
                    <SiGmail size="28px" />
                    <Text size="xl" weight={500} style={{fontFamily: "raleway", fontWeight: "bold"}}> @warun1801</Text>
                  </Group>
                </Anchor>
                <Anchor href="https://www.linkedin.com/in/warun-panpaliya-568b77187" target="_blank"  style={{textDecoration: "none", color: "#1c7ed6"}}>
                  <Group>
                    <FaLinkedin size="28px" />
                    <Text size="xl" weight={500} style={{fontFamily: "raleway", fontWeight: "bold"}}> Warun Panpaliya</Text>
                  </Group>
                </Anchor>
              </Group>
            </Container>
            </BurgerBar>

            <FcAbout size="28px"/>
            <SiAboutdotme size="28px"/>
          </div>
          <div style={{display: "flex", alignItems: "center"}}>
            <Group position="center" style={{paddingRight: "5px"}}>
              <Button variant='outline' onClick={() => setOpened((o) => !o)} compact radius={10}><RiFeedbackFill />&nbsp;Feedback!</Button>
            </Group>

            <Dialog
              opened={opened}
              withCloseButton
              onClose={() => setOpened(false)}
              size="lg"
              radius="md"
            >
              <Title order={3}>Feedback</Title>
              <TextInput label="Name" placeholder='John Doe' onChange={(e) => setName(e.target.value)} />
              <Textarea
                autosize
                placeholder="Hey! Thanks for making this website!"
                label="Your comment"
                minRows={2}
                onChange={(e) => setComment(e.target.value)}
              />
              <Space h='md'/>
              <Group align="flex-end">
                <Button onClick={handleFeedback}>Submit</Button>
              </Group>
            </Dialog>
            <Button compact variant='outline' radius={10}><FaStar/>&nbsp;this project!</Button>
            { showAlert &&
              <Alert style={{position: "fixed", zIndex: 10, right: 10, top: 60, padding: "10px" }} radius="md" icon={<CheckIcon size={16} />} title="Thank you!" withCloseButton onClose={() => setShowAlert(false)}>
                Your feedback has been recorded
              </Alert>
            }
          </div>
        </Group>
        }
    >
      <Container >
      <Center>
        <Title style={{fontSize: "100px"}}>Crypt</Title>
        <Title order={2} style={{fontSize: "100px", color:"#1c7ed6"}}>Easy</Title>
      </Center>
      <Center>
        <Text align="center" weight={600} style={{fontSize: "20px"}}>
          For those who want to be free from messy calculations in Cryptography.  
        </Text>
      </Center>
      <Space h="xl" />
      <Space h="xl"/>
      {activePage == 1 &&
        <Grid cols={12} justify="center" align="stretch">
          <Grid.Col span={4}>
            <Card padding="xl">          
                <Title order={4}>Multi Congruence Solver</Title>  
                <Text>Solving multiple congruence equations using Chinese remainder theorem</Text>
                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} component="a" href="/crt">
                  Multi Congruence Solver
                </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card padding="xl">          
                <Title order={4}>Ellipse Point Calculator</Title>  
                <Text>Calculate all the points of a non singular elliptic curve using a,b and p(p == 4k - 1)</Text>
                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} component="a" href="/ellipsepts" >
                  Ellipse Point Calculator
                </Button>
            </Card>
          </Grid.Col>  
          <Grid.Col span={4}>
            <Card padding="xl">          
                <Title order={4}>Ellipse Math</Title>  
                <Text>Elliptic curve points addition. Also elliptic curve point scalar multiplication</Text>
                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} component="a" href="/ellipsemath" >
                  Ellipse Math
                </Button>
            </Card>
          </Grid.Col> 
        </Grid>
      }
      {activePage == 2 &&
        <Grid cols={12} justify="center" align="stretch">
          <Grid.Col span={4}>
            <Card padding="xl">          
                <Title order={4}>Prime and Next Prime</Title>  
                <Text>Find if the given number is prime using Miller Rabin test. Also find the next prime after n</Text>
                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} component="a" href="/prime" >
                  Prime and Next Prime
                </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card padding="xl">          
                <Title order={4}>Extended Euclidean</Title>  
                <Text>Find x, y using Extended Euclidean algorithm using a, b such that ax + by = gcd(a, b)</Text>
                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} component="a" href="/extended" >
                  Extended Euclidean
                </Button>
            </Card>
          </Grid.Col>  
          <Grid.Col span={4}>
            <Card padding="xl">          
                <Title order={4}>Jacobi / Legendre Symbol </Title>  
                <Text>Find Jacobi Symbol for a, n such that n is an odd number. Also find legendre if n is odd prime</Text>
                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} component="a" href="/jacobi" >
                  Jacobi / Legendre Symbol
                </Button>
            </Card>
          </Grid.Col> 
        </Grid>
      }
      <Space h="xl" />
      <Space h="md" />
      <Center>
        <Pagination page={activePage} onChange={setPage} total={2} />
      </Center>
      </Container>
    </AppShell>
    </div>
    </>
  )
}
