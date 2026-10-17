'use client';



import { Divider } from '@astryxdesign/core/Divider';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Section } from '@astryxdesign/core/Section';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/Layout';
import { Center } from '@astryxdesign/core';

export default function Footer() {
  return (
    <Section width="100%" padding={0} variant="transparent">
      <div className="footer">
        <Grid columns={3} gap="32px">
          <VStack gap="16px">
            <Center>
            <Heading level={3}>Astryx NextJs Project</Heading></Center>
        <Text type="body" color="disabled">
              Building modern digital experiences with accessible components.
              digital experiences with accessible components.
              digital experiences with accessible components.
              digital experiences with accessible components.
            </Text>
          </VStack>
<Center>
          <VStack gap="16px">
            <Heading level={4}>Explore</Heading>
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About Us</Link>
          </VStack>
</Center>
<Center>
          <VStack gap="16px">
            <Heading level={4}>Support</Heading>
            <Link href="/contact">Contact Us</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/login">Login</Link>
          </VStack></Center>
        </Grid>

        <Divider />
<Center>
        <Text type="body" color="disabled">
          © {new Date().getFullYear()} Astryx Project. All rights reserved.
        </Text></Center>
      </div>
    </Section>
  );
}