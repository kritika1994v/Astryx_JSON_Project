'use client';



import { Button } from '@astryxdesign/core/Button';
import { Heading } from '@astryxdesign/core/Heading';
import { Section } from '@astryxdesign/core/Section';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/Layout';

export default function SearchPage() {
  return (
    <Section width="100%" padding={8}>
      <VStack gap={5} align="center">
        <Heading level={1}>
          Search
        </Heading>
        <Text type="body" color="secondary">
          Search is not configured yet. Please use the navigation links to
          explore the site.
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
