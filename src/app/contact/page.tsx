'use client';



import { Button } from '@astryxdesign/core/Button';
import { Heading } from '@astryxdesign/core/Heading';
import { Section } from '@astryxdesign/core/Section';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/Layout';

export default function ContactPage() {
  return (
    <Section width="100%" padding={8}>
      <VStack gap={5} align="center">
        <Heading level={1}>
          Contact Us
        </Heading>
        <Text type="body" color="secondary">
          For questions about this project, please use the available
          registration and profile pages.
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
