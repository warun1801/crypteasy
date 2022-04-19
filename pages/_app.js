import Head from 'next/head';
import { Center, MantineProvider, ScrollArea, Text } from '@mantine/core';
import { SiNextdotjs, SiFastapi } from 'react-icons/si';
import { FaRegCopyright } from 'react-icons/fa';
import { MarginIcon } from '@modulz/radix-icons';
export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>CryptEasy</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
        }}
      >
        <ScrollArea type="scroll" style={{ height: '100vh', width: '100vw' }}>
          <ScrollArea type="scroll" style={{height: "100vh", width: "100vw"}}>
            <Component {...pageProps} style={{height: "100vh", width: "100vw"}}/>
          </ScrollArea>
          <footer style={{ textAlign: "center", width: "100%", background: "#161616", minHeight: "20px", padding: "2px", marginTop: "auto"}}>
            <Center><Text weight={500} size="sm">Made by Warun Panpaliya and Samruddhi Pande with </Text>&nbsp;<SiNextdotjs size="20px"/>&nbsp;<Text weight={500} size="sm">NextJs and </Text>&nbsp;<SiFastapi size="20px" />&nbsp;<Text weight={500} size="sm">FastApi.</Text></Center>
            <Center><FaRegCopyright size="10px" style={{color: "#707172"}}/>&nbsp;<Text size="xs" weight={500} color="#707172">Copyright 2022. All rights reserved by Warun Panpaliya.</Text></Center>
          </footer> 
        </ScrollArea>
      </MantineProvider>
    </>
  );
}
