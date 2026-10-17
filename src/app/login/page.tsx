
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Divider } from '@astryxdesign/core/Divider';
import { Link } from '@astryxdesign/core/Link';
import { Section } from '@astryxdesign/core/Section';
import { Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/Layout';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setSuccess('');

    if (!email.trim() || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);

    try {
      // Read registered user details if available.
      // Password verification will be handled by the login API.
      let registeredUser: Record<string, any> = {};

      const storedUser = localStorage.getItem('registeredUser');

      if (storedUser) {
        try {
          registeredUser = JSON.parse(storedUser);
        } catch {
          registeredUser = {};
        }
      }

      // LOGIN API
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          fullName: registeredUser.fullName || '',
          company: registeredUser.company || '',
          jobTitle: registeredUser.jobTitle || '',
        }),
      });

      // HANDLE NON-JSON RESPONSES
      const contentType = response.headers.get('content-type');

      if (!contentType?.includes('application/json')) {
        const responseText = await response.text();

        console.error('Non-JSON login response:', responseText);

        setError(
          `Login API returned a non-JSON response (${response.status})`
        );

        return;
      }

      const data = await response.json();

      // HANDLE LOGIN FAILURE
      if (!response.ok || !data.success) {
        setError(data.message || 'Invalid email or password');
        return;
      }

      // SAVE LOGGED-IN USER
      const apiUser = data.user || {};

      const loggedInUser = {
        userId: apiUser.userId || registeredUser.userId || '',
        fullName: apiUser.fullName || registeredUser.fullName || '',
        email: apiUser.email || email.trim(),
        company: apiUser.company || registeredUser.company || '',
        jobTitle: apiUser.jobTitle || registeredUser.jobTitle || '',
        phone: apiUser.phone || registeredUser.phone || '',
        city: apiUser.city || registeredUser.city || '',
        budget: apiUser.budget || registeredUser.budget || '',
        details: apiUser.details || registeredUser.details || '',
      };

      localStorage.setItem(
        'loggedInUser',
        JSON.stringify(loggedInUser)
      );

      setSuccess('Login successful');

      // REDIRECT TO PROFILE
      router.push('/profile');
    } catch (err) {
      console.error('Login error:', err);

      setError(
        'Technical error: Unable to connect to API. Please check that Mockoon is running on port 3001.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Section width="100%" padding={70}>
        <div className="w-full bg-sky-100">
          <VStack gap={8} align="center" padding={10}>
            <Card padding={8} width="520px">
              <VStack gap={6} align="stretch" width="100%">
                <VStack gap={3} align="center" width="100%">
                  <Text type="display-2" as="h1">
                    Welcome Back
                  </Text>

                  <Text type="body" color="secondary">
                    Login to access your profile
                  </Text>
                </VStack>

                <Divider />

                <TextInput
                  label="Email"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={setEmail}
                  width="100%"
                />

                <TextInput
                  label="Password"
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={setPassword}
                  width="100%"
                />

                {error && (
                  <Card padding={4} width="100%">
                    <Text type="body" color="error">
                      {error}
                    </Text>
                  </Card>
                )}

                {success && (
                  <Card padding={4} width="100%">
                    <Text type="body" color="success">
                      {success}
                    </Text>
                  </Card>
                )}

                <VStack align="center">
                  <Button
                    label={loading ? 'Logging in...' : 'Login'}
                    variant="primary"
                    onClick={handleLogin}
                    disabled={loading}
                  />
                </VStack>

                <Divider />

                <VStack align="center" width="100%">
                  <Text type="body">
                    {"Don't have an account? "}
                    <Link href="/form-two-column">
                      Register
                    </Link>
                  </Text>
                </VStack>
              </VStack>
            </Card>
          </VStack>
        </div>
      </Section>
    </>
  );
}
