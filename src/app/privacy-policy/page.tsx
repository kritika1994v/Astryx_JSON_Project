'use client';


import { Button } from '@astryxdesign/core/Button';
import { Heading } from '@astryxdesign/core/Heading';
import { Section } from '@astryxdesign/core/Section';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/Layout';

export default function PrivacyPolicyPage() {
  return (
    <Section width="100%" padding={8}>
      <VStack gap={5} align="center">
        <Heading level={1}>
          Privacy Policy
        </Heading>
        <Text type="body" color="secondary">
          This demo application stores registration and login information
          locally for demonstration purposes. Do not enter sensitive personal
          information.
        </Text>
        <Button
          label="Back to Home"
          variant="primary"
          onClick={() => {
            window.location.href = '/';
          }}
        />
      </VStack>
    </Section>
  );
}
