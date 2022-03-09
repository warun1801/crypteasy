import { useState } from 'react';
import { Drawer, Button, Group, Burger} from '@mantine/core';
import { FcAbout } from 'react-icons/fc';
import { BsFileEarmarkCodeFill } from 'react-icons/bs';
export default function BurgerBar({children, title, size, profile}) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={title || 'Mantine'}
        padding="xl"
        size={size  || "50%"}
      >
      {children}
      </Drawer>

      <Group position="center">
        {!profile && 
          <BsFileEarmarkCodeFill onClick={()=> setOpened((o) => !o)} size="28px"/>
        }
        {profile && <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          style={{paddingRight: "1px", borderRight: "1px"}}
        /> }
      </Group>
    </>
  );
}