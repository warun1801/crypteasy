import { Header, Grid, Text, Title, Anchor, Code, ScrollArea } from "@mantine/core"
import BurgerBar from "./drawerTemplate"
import { AiTwotoneHome } from "react-icons/ai"


export default function HeaderTemplate({title, code, children, description, codeTitle}) {
    return (
        
        <Header>
            <Grid columns={20}>
                <Grid.Col span={18}>
                    <Title>{title}</Title>
                </Grid.Col>
                <Grid.Col span={1}  style={{display: "flex", alignItems: "center", justifyContent: "right"}}>
                    <Anchor href="/" style={{color: "#c1c2c5", textDecoration: "none"}}><div style={{display: "flex", alignItems: "center"}}><AiTwotoneHome size="32px"/></div></Anchor>
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
    );
} 