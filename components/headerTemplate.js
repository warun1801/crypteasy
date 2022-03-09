import { Header, Grid, Text, Title, Anchor, Code, ScrollArea, MediaQuery, Container } from "@mantine/core"
import BurgerBar from "./drawerTemplate"
import { AiTwotoneHome } from "react-icons/ai"


export default function HeaderTemplate({title, code, children, description, codeTitle}) {
    return (
        
        <Container>
            <Header>
                <Grid columns={20}>
                    <Grid.Col span={18}>
                        <MediaQuery smallerThan="xs" styles={{fontSize: "30px !important"}}>
                            <Title >{title}</Title>
                        </MediaQuery>
                    </Grid.Col>
                    <Grid.Col span={1}  style={{display: "flex", alignItems: "center", justifyContent: "right", paddingRight: "5px"}}>
                        <Anchor href="/" style={{color: "#c1c2c5", textDecoration: "none"}}>
                                <MediaQuery smallerThan="xs" styles={{paddingRight: "15px"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                            <AiTwotoneHome style={{fontSize: "32px"}}/>
                                    </div>
                                </MediaQuery>
                        </Anchor>
                    </Grid.Col>
                    <Grid.Col span={1}  style={{display: "flex", alignItems: "center", justifyContent: "right"}}>
                        <BurgerBar title={codeTitle}>
                            <ScrollArea style={{ height: "85vh" }} type="scroll">
                            <Code block>{code}</Code>
                            </ScrollArea>
                        </BurgerBar>
                    </Grid.Col>
                </Grid>
                {description && <Text size="xl" weight={500} color="gray">{description}</Text>}
                {children}
            </Header>
        </Container>
    );
} 