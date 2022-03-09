import Head from 'next/head';
import { Center, MantineProvider, Text } from '@mantine/core';
import { SiNextdotjs, SiFastapi } from 'react-icons/si';
import { FaRegCopyright } from 'react-icons/fa';
export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>EasyCrypt</title>
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
        <Component {...pageProps} />
        <footer style={{ position: "fixed", bottom: "0px", textAlign: "center", width: "100%", background: "#161616", minHeight: "24px", left: "0px", padding: "8px"}}>
          <Center><Text weight={500} size="md">Made by Warun Panpaliya with </Text>&nbsp;<SiNextdotjs size="22px"/>&nbsp;<Text weight={500} size="md">NextJs and </Text>&nbsp;<SiFastapi size="22px" />&nbsp;<Text weight={500} size="md">FastApi.</Text></Center>
          <Center><FaRegCopyright size="12px" style={{color: "#707172"}}/>&nbsp;<Text size="sm" weight={500} color="#707172">Copyright 2022. All rights reserved by Warun Panpaliya.</Text></Center>
        </footer> 
      </MantineProvider>
    </>
  );
}
